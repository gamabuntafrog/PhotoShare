import {Avatar, Box, Container, ImageList, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import Posts from "../Posts";
import {collectionsApi} from "../../redux/api/collectionsApi";
import {useAppSelector} from "../../redux/hooks";
import {IUserSliceAuthorized} from "../../types/userSlice";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "../Posts/Posts.module.css";
import PostItem from "../PostItem";


export default function Collection() {
    const {id = ''} = useParams<{ id: string }>()!

    const {user, token} = useAppSelector((state) => state.userReducer) as IUserSliceAuthorized

    const {data: collection, isLoading: isCollectionLoading, error: collectionError} = collectionsApi.useGetCollectionWithPostsQuery({id, token})

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

    return (
            <Box sx={{overflowY: 'auto', height: '91vh'}}>
                <Box sx={{
                    py: 2,
                }}>
                    <Typography variant='h1' sx={{textAlign: 'center'}}>{title} </Typography>
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
                    {posts.map((post) => <PostItem post={post} key={post._id}/>)}
                </ImageList>

            </Box>
    )
}