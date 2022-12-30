import {Avatar, Box, Button, Container, ImageList, Typography} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import Posts from "../Posts";
import {collectionsApi} from "../../redux/api/collectionsApi";
import {useAppSelector} from "../../redux/hooks";
import {IUserSliceAuthorized} from "../../types/userSlice";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "../Posts/Posts.module.css";
import PostItem from "../PostItem";

const useSavedAndLikedPostsInfo = ({savedPosts, likedPosts}: {savedPosts: string[], likedPosts: string[]}) => {
    const existingPosts: {[key: string]: {isSaved?: boolean, isLiked?: boolean}} = {} ;

    savedPosts.forEach((key) => {
        !!existingPosts[key] ? existingPosts[key].isSaved = true : existingPosts[key] = {
            isSaved: true
        }
    });

    likedPosts.forEach((key) => {
        !!existingPosts[key] ? existingPosts[key].isLiked = true : existingPosts[key] = {
            isLiked: true
        }
    });

    return existingPosts
}

export default function Collection() {
    const {id = ''} = useParams<{ id: string }>()!

    const {user, token} = useAppSelector((state) => state.userReducer) as IUserSliceAuthorized
    const {savedPosts, likedPosts} = user

    const savedAndLikedPostsInfo = useSavedAndLikedPostsInfo({savedPosts, likedPosts})

    console.log(savedAndLikedPostsInfo)
    const {
        data: collection,
        isLoading: isCollectionLoading,
        error: collectionError,
        refetch: collectionRefetch
    } = collectionsApi.useGetCollectionWithPostsQuery({id, token})
    console.log(collection)
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
        collectionRefetch()
    }

    const toggleSaveOfPost = async ({id, token, isSaved}: {id: string, token: string, isSaved: boolean}) => {
        if (isSaved) {
            console.log('saved')
            await unsavePostInCollection({id, token})
        } else {
            await savePostInCollection({id, token})
        }
        collectionRefetch()
    }

    const theme = useTheme()
    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));

    if (isCollectionLoading) {
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


    if (collectionError || !collection) {
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

    const {_id: collectionId, posts, title, tags, author} = collection
    const {_id: authorId, avatar: {url: avatarUrl}, username, subscribers} = author
    const subscribersAmount = subscribers.length
    const isCurrentUserAuthorOfThisCollection = user._id === authorId


    return (
        <Box sx={{overflowY: 'auto', height: '91vh'}}>
            <Box sx={{
                py: 2,
            }}>
                <Typography variant='h1'
                            sx={{
                                textAlign: 'center',

                            }}>
                    {title}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant='body2'>by</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Avatar sx={{width: '80px', height: '80px'}} src={avatarUrl || ''} alt={username}/>
                        <Typography sx={{ml: 1}} variant='h5'>{username}</Typography>
                    </Box>
                    <Typography>{subscribersAmount} subscribers</Typography>
                    {isCurrentUserAuthorOfThisCollection &&
                        <Button sx={{mt: 2}}>
                            <NavLink to={`/post/create/${collectionId}`}>
                                Add new post
                            </NavLink>
                        </Button>
                    }
                </Box>
            </Box>
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
                {posts.map((post) => <PostItem toggleSaveOfPost={toggleSaveOfPost} toggleLikeOfPost={toggleLikeOfPost} post={post} key={post._id}/>)}
            </ImageList>

        </Box>
    )
}