import { useParams } from 'react-router-dom'
import MiniLoader from '../../Loaders/MiniLoader'
import { Box, Typography } from '@mui/material'
import React from 'react'
import useShortTranslation from '../../../hooks/useShortTranslation'
import Collections from '../../Collections/Collections'
import extendedCollectionsApi from '../../../redux/api/extendedCollectionsApi'
import FullScreenLoader from '../../Loaders/FullScreenLoader'

export default function UserAllowedToViewCollections() {
  const { id = '' } = useParams<{ id: string }>()!

  const {
    data: collections,
    isLoading,
    isError
  } = extendedCollectionsApi.useGetAllowedToViewCollectionsQuery({ id })

  const t = useShortTranslation({ componentNameKey: 'UserProfile.AllowedToViewCollections' })

  if (isLoading) {
    return <FullScreenLoader smaller />
  }

  if (isError || !collections) {
    return <Typography variant="h1">{t('error')}</Typography>
  }

  if (!collections) {
    return <Typography variant="h1">{t('noCollectionsMessage')}</Typography>
  }

  return (
    <Box>
      <Collections collections={collections} />
    </Box>
  )
}
