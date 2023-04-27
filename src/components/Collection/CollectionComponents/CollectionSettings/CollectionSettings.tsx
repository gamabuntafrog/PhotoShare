import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Modal,
  Switch,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React, { useCallback, useRef } from 'react'
import { IFullCollection } from '../../../../types/types'
import useSx from '../../../../hooks/useSx'
import collectionStyles from '../../collectionStyles'
import { useNavigate } from 'react-router-dom'
import useShortTranslation from '../../../../hooks/useShortTranslation'
import extendedCollectionsApi from '../../../../redux/api/extendedCollectionsApi'
import RequestsInfo from './CollectionSettingsComponents/RequestsInfo/RequestsInfo'

const CollectionInfo = React.lazy(() => import('./CollectionSettingsComponents/CollectionInfo'))
const AddUserToCollection = React.lazy(
  () => import('./CollectionSettingsComponents/AddUserToCollection')
)
const AuthorsInfo = React.lazy(() => import('./CollectionSettingsComponents/AuthorsInfo'))
const ViewersInfo = React.lazy(() => import('./CollectionSettingsComponents/ViewersInfo'))

interface ICollectionSettingsProps {
  data: IFullCollection
  closeSettingsModal: () => void
  isSettingsOpen: boolean
}

function useHookWithRefCallback({
  ifNodeFunction
}: {
  ifNodeFunction: (node: HTMLElement) => void
}) {
  const ref = useRef<null | HTMLElement>(null)
  const setRef = useCallback((node: null | HTMLElement) => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }

    if (node) {
      ifNodeFunction(node)
    }

    // Save a reference to the node
    ref.current = node
  }, [])

  return [setRef]
}

const changeBorderRadiusOnResize = (node: HTMLElement) => {
  new ResizeObserver((entries) => {
    const [el] = entries

    if (Math.ceil(el.contentRect.height) !== Math.ceil(window.innerHeight)) {
      if (node.style.borderRadius === '0px') {
        node.style.borderRadius = '8px'
      }

      return
    } else {
      node.style.borderRadius = '0px'
    }
  }).observe(node)
}

export default function CollectionSettings({
  data,
  closeSettingsModal,
  isSettingsOpen
}: ICollectionSettingsProps) {
  const { collection, currentUserStatus } = data
  const { _id: collectionId, title, tags, authors, isPrivate, viewers, requests } = collection
  const styles = useSx(collectionStyles)

  const [modalRef] = useHookWithRefCallback({ ifNodeFunction: changeBorderRadiusOnResize })

  const navigate = useNavigate()

  const [changeIsPrivate] = extendedCollectionsApi.useChangeIsPrivateMutation()
  const [deleteCurrentUserFromCollection] =
    extendedCollectionsApi.useDeleteCurrentUserFromCollectionMutation()
  const [deleteCollection] = extendedCollectionsApi.useDeleteCollectionMutation()

  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  const openAddUserAccordion = () => setExpanded('panel1')

  const { isAuthor, isAdmin, isViewer, isInQueue } = currentUserStatus

  const formattedTags = tags.join(' ')

  const t = useShortTranslation({ componentNameKey: 'Collection.CollectionSettings' })

  const onLeaveCollection = async () => {
    if (window.confirm(t('isUserWantToLeave'))) {
      await deleteCurrentUserFromCollection({ collectionId }).then(() => navigate('/'))
    }
  }

  const onDeleteCollection = async () => {
    if (isAdmin && window.confirm(t('isUserWantToDeleteCollection'))) {
      await deleteCollection({ id: collectionId }).then(() => navigate('/'))
    }
  }

  return (
    <Modal open={isSettingsOpen} onClose={closeSettingsModal} sx={styles.backdrop}>
      <Box sx={styles.modalWrapper} ref={modalRef}>
        <Box sx={styles.closeIconWrapper}>
          <Typography variant="body1" sx={styles.title}>
            {t('title')}
          </Typography>

          <IconButton onClick={closeSettingsModal} sx={styles.closeIcon} color="error">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={styles.modalContainer}>
          <CollectionInfo
            collectionId={collectionId}
            isAdmin={isAdmin}
            title={title}
            tags={formattedTags}
          />
          {isAdmin && (
            <Accordion
              sx={styles.accordionWrapper}
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="primary" />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={styles.accordionTitle}>{t('addUsersTitle')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AddUserToCollection collectionId={collectionId} />
              </AccordionDetails>
            </Accordion>
          )}

          <Accordion
            sx={styles.accordionWrapper}
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={styles.accordionTitle}>{t('authorsListTitle')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AuthorsInfo
                isAdmin={isAdmin}
                authors={authors}
                collectionId={collectionId}
                openAddUserAccordion={openAddUserAccordion}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={styles.accordionWrapper}
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={styles.accordionTitle}>{t('viewersListTitle')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ViewersInfo
                isAdmin={isAdmin}
                openAddUserAccordion={openAddUserAccordion}
                viewers={viewers}
                collectionId={collectionId}
              />
            </AccordionDetails>
          </Accordion>
          {isAdmin && (
            <Accordion
              sx={styles.accordionWrapper}
              expanded={expanded === 'panel4'}
              onChange={handleChange('panel4')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="primary" />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={styles.accordionTitle}>{t('requestsToJoinTitle')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RequestsInfo collectionId={collectionId} users={requests} />
              </AccordionDetails>
            </Accordion>
          )}
          {isAdmin && (
            <Box sx={styles.togglePrivateContainer}>
              <Box>
                <Typography>{t('privateModeTitle')}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {t('privateModeDescription')}
                </Typography>
              </Box>
              <Switch checked={isPrivate} onClick={() => changeIsPrivate({ collectionId })} />
            </Box>
          )}
          <Box sx={styles.dangerButtonsWrapper}>
            {isAdmin && (
              <Button onClick={onDeleteCollection} color="error" variant="contained" sx={{ mr: 2 }}>
                {t('deleteCollectionButton')}
              </Button>
            )}
            <Button onClick={onLeaveCollection} color="error" variant="contained">
              {t('leaveCollectionButton')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
