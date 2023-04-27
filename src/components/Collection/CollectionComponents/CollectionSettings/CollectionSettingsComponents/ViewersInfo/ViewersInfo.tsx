import { IViewerOfCollection } from '../../../../../../types/types'
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import CustomOpenMenuButton from '../../../../../../library/CustomMenu/CustomOpenMenuButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import StyledCustomMenu from '../../../../../../library/CustomMenu/StyledCustomMenu'
import StyledCustomMenuItem from '../../../../../../library/CustomMenu/StyledCustomMenuItem'
import React, { ChangeEvent, useState } from 'react'
import useSx from '../../../../../../hooks/useSx'
import collectionStyles from '../../../../collectionStyles'
import useAnchorEl from '../../../../../../hooks/useAnchorEl'
import CallMadeIcon from '@mui/icons-material/CallMade'
import useShortTranslation from '../../../../../../hooks/useShortTranslation'
import extendedCollectionsApi from '../../../../../../redux/api/extendedCollectionsApi'

interface IViewerInfoProps {
  viewer: IViewerOfCollection
  collectionId: string
  isCurrentUserAdmin: boolean
}

function ViewerInfo({ viewer, collectionId, isCurrentUserAdmin }: IViewerInfoProps) {
  const { _id, avatar, username } = viewer

  const [addAuthor] = extendedCollectionsApi.useAddAuthorToCollectionMutation()
  const [deleteViewerFromCollection] =
    extendedCollectionsApi.useDeleteViewerFromCollectionMutation()

  const styles = useSx(collectionStyles)
  const { anchorEl, isAnchorEl, handleClick, handleClose } = useAnchorEl()

  const t = useShortTranslation({ componentNameKey: 'Collection.CollectionSettings.ViewersInfo' })

  if (!isCurrentUserAdmin) {
    return (
      <ListItem key={_id}>
        <ListItemAvatar>
          <NavLink to={`/users/${_id}`}>
            <Avatar sx={styles.avatar} src={avatar || ''} />
          </NavLink>
        </ListItemAvatar>
        <ListItemText sx={styles.authorUsernameWrapper}>
          <NavLink to={`/users/${_id}`}>{username}</NavLink>
        </ListItemText>
      </ListItem>
    )
  }

  return (
    <ListItem key={_id}>
      <ListItemAvatar>
        <NavLink to={`/users/${_id}`}>
          <Avatar sx={styles.avatar} src={avatar || ''} />
        </NavLink>
      </ListItemAvatar>
      <ListItemText sx={styles.authorUsernameWrapper}>
        <NavLink to={`/users/${_id}`}>{username}</NavLink>
      </ListItemText>
      <CustomOpenMenuButton isAnchorEl={isAnchorEl} iconButton handleClick={handleClick}>
        <MoreVertIcon />
      </CustomOpenMenuButton>
      <StyledCustomMenu anchorEl={anchorEl} open={isAnchorEl} onClose={handleClose}>
        <StyledCustomMenuItem
          onClick={() => {
            handleClose()
            addAuthor({ collectionId, authorId: _id, role: 'AUTHOR' })
          }}
        >
          <ListItemText>{t('makeAnAuthor')}</ListItemText>
        </StyledCustomMenuItem>
        <StyledCustomMenuItem
          onClick={() => {
            handleClose()
            addAuthor({ collectionId, authorId: _id, role: 'ADMIN' })
          }}
        >
          <ListItemText>{t('makeAnAdmin')}</ListItemText>
        </StyledCustomMenuItem>
        <StyledCustomMenuItem
          onClick={() => {
            handleClose()
            deleteViewerFromCollection({ collectionId, viewerId: _id })
          }}
        >
          <Typography color="error">{t('deleteFromCollection')}</Typography>
        </StyledCustomMenuItem>
      </StyledCustomMenu>
    </ListItem>
  )
}

interface IViewersInfoProps {
  viewers: IViewerOfCollection[]
  collectionId: string
  openAddUserAccordion: () => void
  isAdmin: boolean
}

export default function ViewersInfo({
  viewers,
  collectionId,
  openAddUserAccordion,
  isAdmin
}: IViewersInfoProps) {
  const [query, setQuery] = useState('')

  const handleQuery = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setQuery(e.target.value)

  const filteredViewers = viewers.filter(({ username }) => username.includes(query))

  const t = useShortTranslation({ componentNameKey: 'Collection.CollectionSettings.ViewersInfo' })

  if (filteredViewers.length === 0 && viewers.length !== 0) {
    return (
      <>
        <TextField
          sx={{ mb: 2 }}
          onChange={handleQuery}
          fullWidth
          placeholder={t('inputPlaceholder')}
        />
        <Typography variant="h4" textAlign="center">
          {t('wrongUsernameMessage')}
        </Typography>
        {isAdmin && (
          <ListItem onClick={openAddUserAccordion}>
            <Button endIcon={<CallMadeIcon />} fullWidth variant="contained">
              {t('addNewButton')}
            </Button>
          </ListItem>
        )}
      </>
    )
  }

  return (
    <>
      <TextField
        sx={{ mb: 2 }}
        onChange={handleQuery}
        fullWidth
        placeholder={t('inputPlaceholder')}
      />
      {filteredViewers.map((viewer) => (
        <ViewerInfo
          key={viewer._id}
          isCurrentUserAdmin={isAdmin}
          viewer={viewer}
          collectionId={collectionId}
        />
      ))}
      {isAdmin && (
        <ListItem onClick={openAddUserAccordion}>
          <Button endIcon={<CallMadeIcon />} fullWidth variant="contained">
            {t('addNewButton')}
          </Button>
        </ListItem>
      )}
    </>
  )
}
