import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import CustomOpenMenuButton from '../../../../../../library/CustomMenu/CustomOpenMenuButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import StyledCustomMenu from '../../../../../../library/CustomMenu/StyledCustomMenu'
import StyledCustomMenuItem from '../../../../../../library/CustomMenu/StyledCustomMenuItem'
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { IAuthorOfCollection } from '../../../../../../types/types'
import useAnchorEl from '../../../../../../hooks/useAnchorEl'
import useSx from '../../../../../../hooks/useSx'
import collectionStyles from '../../../../collectionStyles'

import CallMadeIcon from '@mui/icons-material/CallMade'
import useShortTranslation from '../../../../../../hooks/useShortTranslation'
import extendedCollectionsApi from '../../../../../../redux/api/extendedCollectionsApi'

interface IAuthorInfo {
  author: IAuthorOfCollection
  collectionId: string
  isCurrentUserAdmin: boolean
}

function AuthorInfo({ author, collectionId, isCurrentUserAdmin }: IAuthorInfo) {
  const { _id, avatar, username, isAdmin, isAuthor } = author
  const { authorInfo: styles } = useSx(collectionStyles)
  const { anchorEl, isAnchorEl, handleClick, handleClose } = useAnchorEl()

  const [deleteAuthorFromCollection] =
    extendedCollectionsApi.useDeleteAuthorFromCollectionMutation()
  const [changeAuthorRole] = extendedCollectionsApi.useChangeAuthorRoleInCollectionMutation()
  const [makeViewer] = extendedCollectionsApi.useAddViewerToCollectionMutation()

  const navigate = useNavigate()

  const t = useShortTranslation({ componentNameKey: 'Collection.CollectionSettings.AuthorsInfo' })

  if (!isCurrentUserAdmin) {
    return (
      <ListItem sx={styles.listItem} key={_id}>
        <ListItemAvatar>
          <NavLink to={`/users/${_id}`}>
            <Avatar sx={styles.avatar} src={avatar || ''} />
          </NavLink>
        </ListItemAvatar>
        <ListItemText sx={styles.authorUsernameWrapper} onClick={() => navigate(`/users/${_id}`)}>
          <Typography variant="caption" color="primary">
            {isAdmin && t('admin')}
            {isAuthor && t('author')}
          </Typography>
          <Typography>{username}</Typography>
        </ListItemText>
      </ListItem>
    )
  }

  return (
    <ListItem sx={styles.listItem} key={_id}>
      <ListItemAvatar>
        <NavLink to={`/users/${_id}`}>
          <Avatar sx={styles.avatar} src={avatar || ''} />
        </NavLink>
      </ListItemAvatar>
      <ListItemText sx={styles.authorUsernameWrapper} onClick={() => navigate(`/users/${_id}`)}>
        <Typography variant="caption" color="primary">
          {isAdmin && t('admin')}
          {isAuthor && t('author')}
        </Typography>
        <Typography>{username}</Typography>
      </ListItemText>
      <CustomOpenMenuButton handleClick={handleClick} isAnchorEl={isAnchorEl} iconButton={true}>
        <MoreVertIcon />
      </CustomOpenMenuButton>
      <StyledCustomMenu anchorEl={anchorEl} open={isAnchorEl} onClose={handleClose}>
        {isAuthor && (
          <StyledCustomMenuItem
            onClick={() => {
              handleClose()
              changeAuthorRole({ collectionId, authorId: _id, role: 'ADMIN' })
            }}
          >
            <Typography>{t('makeAnAdmin')}</Typography>
          </StyledCustomMenuItem>
        )}
        {isAdmin && (
          <StyledCustomMenuItem
            onClick={() => {
              handleClose()
              changeAuthorRole({ collectionId, authorId: _id, role: 'AUTHOR' })
            }}
          >
            <Typography>{t('makeAnAuthor')}</Typography>
          </StyledCustomMenuItem>
        )}
        <StyledCustomMenuItem>
          <Typography
            onClick={() => {
              makeViewer({ collectionId, viewerId: _id })
            }}
          >
            {t('makeAViewer')}
          </Typography>
        </StyledCustomMenuItem>
        <StyledCustomMenuItem>
          <Typography
            color="error"
            onClick={() => {
              deleteAuthorFromCollection({ collectionId, authorId: _id })
            }}
          >
            {t('deleteFromCollection')}
          </Typography>
        </StyledCustomMenuItem>
      </StyledCustomMenu>
    </ListItem>
  )
}

interface IAuthorsInfoProps {
  authors: IAuthorOfCollection[]
  collectionId: string
  openAddUserAccordion: () => void
  isAdmin: boolean
}

export default function AuthorsInfo({
  authors,
  collectionId,
  openAddUserAccordion,
  isAdmin
}: IAuthorsInfoProps) {
  const [query, setQuery] = useState('')

  const handleQuery = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setQuery(e.target.value)

  const filteredAuthors = authors.filter(({ username }) => username.includes(query))

  const t = useShortTranslation({ componentNameKey: 'Collection.CollectionSettings.AuthorsInfo' })

  if (filteredAuthors.length === 0) {
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
      {filteredAuthors.map((author) => (
        <AuthorInfo
          isCurrentUserAdmin={isAdmin}
          key={author._id}
          author={author}
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
