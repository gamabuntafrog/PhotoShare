import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import usePostsActions from '../../hooks/usePostsActions'
import FullScreenLoader from '../Loaders/FullScreenLoader'
import useSx from '../../hooks/useSx'
import postsStyles from './postsStyles'
import useShortTranslation from '../../hooks/useShortTranslation'
import StandardHelmet from '../StandardHelmet'
import extendedPostsApi from '../../redux/api/extendedPostsApi'
import { useDataWithInfiniteScroll, lazyQueryType } from '../../hooks/useDataWithInfiniteScroll'

const MasonryPostsDrawer = React.lazy(() => import('../MasonryPostsDrawer'))

export default function Posts() {
  const [type, setType] = useState<'all' | 'subscribes'>('all')
  
  const {
    data,
    isLoading: isPostsLoading,
    error: postsError,
    ref,
    isEnd,
    isNextPostsLoading
  } = useDataWithInfiniteScroll({
    lazyQuery: extendedPostsApi.useLazyGetManyQuery as unknown as lazyQueryType,
    refetchDependencies: [type],
    queryData: { type }
  })

  const [posts, postsActions] = usePostsActions({ initPosts: data })

  const styles = useSx(postsStyles)

  const t = useShortTranslation({ componentNameKey: 'Posts' })

  console.log(postsError)

  if (isPostsLoading) return <FullScreenLoader withMeta />

  if (postsError) {
    return (
      <>
        <StandardHelmet keyOfOther="error" />
        <Container sx={styles.errorContainer}>
          <Typography variant="h1" sx={{ textAlign: 'center' }}>
            {t('error')}
          </Typography>
        </Container>
      </>
    )
  }

  return (
    <>
      <StandardHelmet keyOfTitle="posts" />
      <Box sx={{ display: 'flex', mt: 4, ml: 2 }}>
        <Button variant="contained" onClick={() => setType('all')}>
          {t('allPosts')}
        </Button>
        <Button variant="contained" onClick={() => setType('subscribes')} sx={{ ml: 2 }}>
          {t('subscribesPosts')}
        </Button>
      </Box>
      <Box sx={styles.container}>
        <MasonryPostsDrawer
          posts={posts}
          postsActions={postsActions}
          isNextPostsLoading={isNextPostsLoading}
        />
      </Box>
      <div ref={ref} />
      {isEnd && (
        <Typography variant="h4" textAlign="center" sx={{ my: 2 }}>
          {t('end')}
        </Typography>
      )}
    </>
  )
}
