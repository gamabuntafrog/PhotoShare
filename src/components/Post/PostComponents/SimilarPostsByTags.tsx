import extendedPostsApi from '../../../redux/api/extendedPostsApi'
import usePostsActions from '../../../hooks/usePostsActions'
import useSx from '../../../hooks/useSx'
import postStyles from '../postStyles'
import { Box } from '@mui/material'
import MasonryPostsDrawer from '../../MasonryPostsDrawer'

export default function SimilarPostsByTags({ tags, postId }: { tags: string[]; postId: string }) {
  const {
    data = [],
    isLoading,
    isError
  } = extendedPostsApi.useGetByTagsQuery({ tags, arrayOfId: [], id: postId })

  const [posts, postActions] = usePostsActions({ initPosts: data })
  const { similarPosts: styles } = useSx(postStyles)

  if (isLoading || data.length === 0 || isError) return null

  return (
    <Box sx={{ px: 1 }}>
      <MasonryPostsDrawer isNextPostsLoading={false} posts={posts} postsActions={postActions} />
    </Box>
  )
}
