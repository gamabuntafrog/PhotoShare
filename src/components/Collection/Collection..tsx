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
import React, {useState} from "react";
import CreateCollectionModal from "../CreateCollectionModal";
import {usersApi} from "../../redux/api/usersApi";
import {extendedCollectionsApi} from "../../redux/api/rootApi";
import usePostsActions from "../../hooks/usePostsActions";
import {useToggleSubscribe} from "../Post/Post";


export default function Collection() {
    const {id = ''} = useParams<{ id: string }>()!

    const {user, token} = useAppSelector((state) => state.userReducer) as IUserSliceAuthorized
    const {_id: currentUserId} = user

    const {
        data: collection,
        isLoading: isCollectionLoading,
        error: collectionError,
    } = extendedCollectionsApi.useGetOneWithPostsAndAuthorQuery({id})

    const [posts, postsActions] = usePostsActions({initPosts: collection?.posts})

    console.log(collection)
    const theme = useTheme()
    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));


    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const [deleteColl] = extendedCollectionsApi.useDeleteCollectionMutation()

    const deleteCollection = async () => {
        await deleteColl({id})
    }

    const {toggleSubscribe, isSubscribed} = useToggleSubscribe(collection?.author._id || '')

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

    const {_id: collectionId, title, tags, author} = collection
    const {_id: authorId, avatar: avatarUrl, username, subscribersCount} = author
    const formattedTags = tags.join(' ')
    const isCurrentUserAuthorOfCollection = currentUserId === authorId

    const onToggleSubscribe = () => toggleSubscribe(authorId, isSubscribed)

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
                    <Typography sx={{my: 1}}>{subscribersCount} subscribers</Typography>
                    {isCurrentUserAuthorOfCollection &&
                        <>
                            <Button onClick={deleteCollection} sx={{mb: 1}} color='error'>Delete Collection</Button>
                            <Button>
                                <NavLink to={`/post/create/${collectionId}`}>
                                    Add new post
                                </NavLink>
                            </Button>
                        </>
                    }
                    {!isCurrentUserAuthorOfCollection && <Button
                        sx={{
                            borderRadius: 4,
                        }}
                        variant='contained'
                        onClick={onToggleSubscribe}
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
                    postsActions={postsActions}
                    openModal={openModal}
                    post={post}
                    key={post._id}
                />)}
            </ImageList>

        </Box>
    )
}