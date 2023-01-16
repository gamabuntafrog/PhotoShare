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
import useToggleLikeOfPostCreator from "../../hooks/useToggleLikeOfPostCreator";
import useToggleSaveOfPostCreator from "../../hooks/useToggleSaveOfPostCreator";
import React, {useState} from "react";
import CreateCollectionModal from "../CreateCollectionModal";
import {usersApi} from "../../redux/api/usersApi";
import {extendedCollectionsApi} from "../../redux/api/rootApi";


export default function Collection() {
    const {id = ''} = useParams<{ id: string }>()!

    const {user, token} = useAppSelector((state) => state.userReducer) as IUserSliceAuthorized
    const {savedPosts, likedPosts, _id: currentUserId} = user

    const {
        data: collection,
        isLoading: isCollectionLoading,
        error: collectionError,
    } = extendedCollectionsApi.useGetOneWithPostsAndAuthorQuery({id}) // collectionId

    console.log(collection)
    const theme = useTheme()
    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));


    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const [subscribe] = usersApi.useSubscribeMutation()
    const [unsubscribe] = usersApi.useUnsubscribeMutation()

    const [deleteColl] = collectionsApi.useDeleteMutation()

    const deleteCollection = async () => {
        await deleteColl({id: collectionId, token})
    }

    const toggleSubscribe = async (userId: string, token: string, isSubscribed: boolean) => {
        isSubscribed ? unsubscribe({userId, token}) : subscribe({userId, token})
    }

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
    const {_id: authorId, avatar: avatarUrl, username} = author!
    console.log(posts)
    const formattedTags = tags.join(' ')
    const subscribersAmount = 0
        // subscribers.length
    const isCurrentUserAuthorOfThisCollection = user._id === authorId
    const isProfileOfCurrentUser = currentUserId === collection.author._id
    const isSubscribed = false
// !!subscribers.find((id) => id === currentUserId)

    return (
        <Box sx={{overflowY: 'auto', height: '91vh'}}>
            <Box sx={{
                py: 2,
            }}>
                <Box sx={{mb: 2}}>
                    <Typography
                        variant='h1'
                        sx={{
                            textAlign: 'center',
                        }}>
                        {title}
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{
                            textAlign: 'center',
                        }}>
                        {formattedTags}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant='body2'>by</Typography>
                    <NavLink
                        to={`/users/${authorId}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar sx={{width: '80px', height: '80px'}} src={avatarUrl || ''} alt={username}/>
                        <Typography sx={{ml: 1}} variant='h5'>{username}</Typography>
                    </NavLink>
                    <Typography sx={{my: 1}}>{subscribersAmount} subscribers</Typography>
                    {isCurrentUserAuthorOfThisCollection &&
                        <>
                            <Button onClick={deleteCollection} sx={{mb: 1}} color='error'>Delete Collection</Button>
                            <Button>
                                <NavLink to={`/post/create/${collectionId}`}>
                                    Add new post
                                </NavLink>
                            </Button>
                        </>
                    }
                    {!isProfileOfCurrentUser && <Button
                        sx={{
                            borderRadius: 4,
                        }}
                        variant='contained'
                        onClick={() => toggleSubscribe(authorId, token, isSubscribed)}
                    >
                        {!isSubscribed ? 'Subscribe' : 'Unsubscribe'}
                    </Button>}
                </Box>
            </Box>
            {/*refetch()*/}
            <CreateCollectionModal closeModal={closeModal} isModalOpen={isModalOpen}/>
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
                {posts.map((post) => <PostItem
                    openModal={openModal}
                    post={post}
                    collectionId={collectionId}
                    key={post._id}
                />)}
            </ImageList>

        </Box>
    )
}