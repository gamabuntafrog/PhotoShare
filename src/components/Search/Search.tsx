import { Box, Container, TextField, Typography, useTheme } from '@mui/material'
import { Outlet, useSearchParams } from 'react-router-dom'
import React, { useState } from 'react'
import { StyledHeaderNavLink } from '../Header/headerStyles'
import useSx from '../../hooks/useSx'
import searchStyles from './searchStyles'
import useShortTranslation from '../../hooks/useShortTranslation'
import StandardHelmet from '../StandardHelmet'
import FullScreenLoader from '../Loaders/FullScreenLoader'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('query') || ''

  const styles = useSx(searchStyles)

  const t = useShortTranslation({ componentNameKey: 'Search' })

  return (
    <>
      <StandardHelmet keyOfTitle="search" />
      <Container sx={styles.container}>
        <TextField
          onChange={(e) => setSearchParams(`query=${e.target.value}`, { replace: true })}
          sx={styles.input}
          value={query}
          placeholder="Enter query"
          variant="standard"
        />
        <Typography sx={styles.caption} variant="body1" textAlign="center">
          {t('caption')}
        </Typography>
        <Box sx={styles.linksWrapper}>
          <StyledHeaderNavLink className="first" to={`users?query=${query}`} end>
            {t('usersLink')}
          </StyledHeaderNavLink>
          <StyledHeaderNavLink to={`posts?query=${query}`}>{t('postsLink')}</StyledHeaderNavLink>
          <StyledHeaderNavLink to={`collections?query=${query}`}>
            {t('collectionsLink')}
          </StyledHeaderNavLink>
        </Box>
        <Box sx={styles.outletWrapper}>
          <React.Suspense fallback={<FullScreenLoader smaller />}>
            <Outlet />
          </React.Suspense>
        </Box>
      </Container>
    </>
  )
}
