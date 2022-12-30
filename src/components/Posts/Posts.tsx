import styles from './Posts.module.css'
import {Avatar, Box, Container, IconButton, ImageList, List, ListItem, Typography} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import PostItem from "../PostItem/PostItem";
import {useAppSelector} from "../../redux/hooks";
import {postsApi} from "../../redux/api/postsApi";
import {IUserSliceAuthorized} from "../../types/userSlice";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {collectionsApi} from "../../redux/api/collectionsApi";

export default function Posts() {
    const {id = ''} = useParams<{ id: string }>()!

    const {user, token} = useAppSelector((state) => state.userReducer) as IUserSliceAuthorized
    const {savedPosts} = user

    const {data: allPosts, isLoading: isAllPostsLoading, error: allPostsError, refetch: postsRefetch} = postsApi.useFetchAllPostsQuery()
    const {
        data: collection,
        isLoading: isCollectionLoading,
        error: collectionError,
        refetch: collectionRefetch
    } = collectionsApi.useGetCollectionWithPostsQuery({id, token})
    const [likePostInCollection] = collectionsApi.useLikePostMutation()
    const [unlikePostInCollection] = collectionsApi.useUnlikePostMutation()
    const [savePostInCollection] = collectionsApi.useSavePostMutation()
    const [unsavePostInCollection] = collectionsApi.useUnsavePostMutation()

    // зробити toggleLikeOfPost який приймає isLiked і робить лайк або навпаки

    const toggleLikeOfPost = async ({id, token, isLiked}: {id: string, token: string, isLiked: boolean}) => {
        if (isLiked) {
            console.log('liked')
            await unlikePostInCollection({id, token})
        } else {
            await likePostInCollection({id, token})
        }
        postsRefetch()
    }

    const toggleSaveOfPost = async ({id, token, isSaved}: {id: string, token: string, isSaved: boolean}) => {
        if (isSaved) {
            console.log('saved')
            await unsavePostInCollection({id, token})
        } else {
            await savePostInCollection({id, token})
        }
        postsRefetch()
    }
    const theme = useTheme()
    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));

    if (isAllPostsLoading || isCollectionLoading) {
        return (
            <Container className={styles.posts} sx={{
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                maxHeight: '90vh'
            }}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>Loading...</Typography>
            </Container>
        )
    }


    if (allPostsError || !allPosts) {
        return (
            <Container className={styles.posts} sx={{
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                maxHeight: '90vh'
            }}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>Error</Typography>
            </Container>
        )
    }
    return (
        <Box sx={{overflowY: 'auto', height: '91vh'}}>
            <ImageList
                variant="masonry"
                sx={{
                        width: '95%',
                        py: 2,
                        mx: 'auto'
                }}
                gap={12}
                cols={isSmallerLaptop ? isSmallerTablet ? 2 : 3 : 5}
            >
                {allPosts.map((post) => <PostItem toggleLikeOfPost={toggleLikeOfPost} toggleSaveOfPost={toggleSaveOfPost} post={post} key={post._id}/>)}
            </ImageList>

        </Box>
    )
}

