import { IAuthorOfCollection } from '../../../types/types'
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import React from 'react'
import useSx from '../../../hooks/useSx'
import collectionStyles from '../collectionStyles'
import useShortTranslation from '../../../hooks/useShortTranslation'
import SettingsIcon from '@mui/icons-material/Settings'
interface ICollectionInfoProps {
  title: string
  formattedTags: string
  authors: IAuthorOfCollection[]
  isCurrentUserAuthorOfCollection: boolean
  isCurrentUserAdminOfCollection: boolean
  collectionId: string
  openSettingsModal: () => void
}

export default function CollectionInfo({
  title,
  formattedTags,
  authors,
  isCurrentUserAuthorOfCollection,
  collectionId,
  isCurrentUserAdminOfCollection,
  openSettingsModal
}: ICollectionInfoProps) {
  const { collectionInfo: styles } = useSx(collectionStyles)

  const navigate = useNavigate()

  const t = useShortTranslation({ componentNameKey: 'Collection.CollectionInfo' })

  return (
    <>
      <Box sx={styles.wrapper}>
        <Typography variant="h1" sx={styles.title}>
          {title}
        </Typography>
        <Typography variant="body2" sx={styles.tags}>
          {formattedTags}
        </Typography>
      </Box>
      <Box sx={styles.secondWrapper}>
        <Typography variant="body2">{t('by')}</Typography>
        {authors.map(({ _id: authorId, username, avatar, isAdmin }) => {
          return (
            <Box
              sx={styles.authorLinkWrapper}
              key={authorId}
              onClick={() => navigate(`/users/${authorId}`)}
            >
              <Avatar sx={styles.avatar} src={avatar || ''} alt={username} />
              <Box sx={styles.authorContainerWrapper}>
                {isAdmin ? (
                  <Typography sx={styles.userRole} variant="caption">
                    {t('admin')}
                  </Typography>
                ) : (
                  <Typography sx={styles.userRole} variant="caption">
                    {t('author')}
                  </Typography>
                )}
                <Typography sx={{ ml: 1 }} variant="h5">
                  {username}
                </Typography>
              </Box>
            </Box>
          )
        })}
        <Box sx={{ display: 'flex' }}>
          {isCurrentUserAuthorOfCollection && (
            <Button variant="contained" sx={styles.addNewPostButton}>
              <NavLink to={`/post/create/${collectionId}`}>{t('addNewPostButton')}</NavLink>
            </Button>
          )}
          {(isCurrentUserAuthorOfCollection || isCurrentUserAdminOfCollection) && (
            <IconButton
              sx={{ mx: 1, ...styles.addNewPostButton, '&:hover': { color: 'primary.main' } }}
              onClick={openSettingsModal}
            >
              <SettingsIcon color='inherit'/>
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  )
}
