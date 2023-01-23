import {Avatar, Box, Button, Container, IconButton, Menu, MenuItem, OutlinedInput, Typography} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, {useEffect, useState} from "react";
import {extendedCollectionsApi, extendedPostsApi, extendedUsersApi} from "../../redux/api/rootApi";
import PostSavesInfo from "../PostSavesInfo";
import CreateCollectionModal from "../CreateCollectionModal";
import usePostActions from "../../hooks/usePostActions";
import {ICurrentUser} from "../../types/user";
import useToggleSubscribe from "../../hooks/useToggleSubscribe";
import FullScreenLoader from "../Loaders/FullScreenLoader";


export default function Post() {
    const {id = ''} = useParams<{ id: string }>()!

    const {_id: currentUserId} = useAppSelector((state) => state.userReducer.user) as ICurrentUser



    const {data, isLoading: isPostLoading} = extendedPostsApi.useGetOneByIdQuery({id})

    const theme = useTheme()
    const {main} = theme.palette.primary

    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));


    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const [post, {toggleLike, toggleSave, updateSavesInfo, deletePost}] = usePostActions({initPost: data})
    const {toggleSubscribe, isSubscribed} = useToggleSubscribe(post?.author._id || '')

    if (!post && isPostLoading) return <FullScreenLoader/>

    if (!post || !post.author) {
        return (
            <Box>
                <Typography variant='h1'>404 Not Found</Typography>
            </Box>
        )
    }

    const {
        _id: postId,
        author,
        title,
        body,
        tags,
        likesCount,
        image: postImageURL,
        isLiked,
        isSomewhereSaved: isSaved,
        savesInfo
    } = post
    const {username, _id: authorId, avatar: avatarURL = '', subscribersCount} = author

    const formattedTags = tags.join(' ')
    const isUserAuthorOfPost = authorId === currentUserId

    const onToggleLike = () => toggleLike(postId, isLiked)
    const onToggleSubscribe = () => toggleSubscribe(authorId, isSubscribed)
    const onDeletePost = () => deletePost(postId)

    return (
        <Box
            sx={{overflowY: 'auto', height: '92vh'}}
        >
            <CreateCollectionModal postId={postId} onCreate={updateSavesInfo} closeModal={closeModal} isModalOpen={isModalOpen}/>
            <Container
                maxWidth={isSmallerLaptop ? 'tablet' : 'laptop'}
                sx={{
                    py: 2,
                    px: isSmallerLaptop ? 2 : 0
                }}
            >
                <Box
                    key={postId}
                    sx={{
                        display: 'flex',
                        flexDirection: isSmallerLaptop ? 'column' : 'row',
                        mx: 'auto',
                        mb: 2,
                        borderRadius: '8px',

                    }}
                >

                    <img
                        src={postImageURL}
                        style={{
                            width: isSmallerLaptop ? '100%' : '50%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            backgroundColor: main
                        }}
                    />

                    <Box
                        sx={{
                            px: isSmallerLaptop ? 0 : 3,
                            mt: 1,
                            width: isSmallerLaptop ? '100%' : '50%'
                        }}
                    >
                        <Box sx={{
                            display: 'flex', alignItems: 'center', alignSelf: 'flex-start', width: '100%',
                        }}>
                            <IconButton onClick={onToggleLike}>
                                {isLiked ? <FavoriteIcon color='secondary'/> : <FavoriteBorderIcon/>}
                            </IconButton>
                            <Typography sx={{ml: 0.5}}>
                                {likesCount}
                            </Typography>
                            <PostSavesInfo collections={savesInfo} toggleSave={toggleSave} postId={postId} isSaved={isSaved} openModal={openModal}/>
                            {isUserAuthorOfPost &&
                                <Button color='error' onClick={onDeletePost}>
                                    Delete
                                </Button>
                            }
                        </Box>
                        <Box sx={{
                            mt: 'auto',
                            display: 'flex', alignItems: 'center', alignSelf: 'flex-start',
                        }}>
                        </Box>
                        <Typography variant='h3'>{title}</Typography>
                        <Box
                            sx={{display: 'flex'}}
                        >
                            <NavLink
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                }}
                                to={`/users/${authorId}`}>
                                <Avatar sx={{width: '40px', height: '40px'}} src={avatarURL as string}/>
                                <Box
                                    sx={{
                                        ml: 1,
                                        lineHeight: '0px'
                                    }}
                                >
                                    <Typography variant='h6'>{username}</Typography>
                                    <Typography variant='caption'>{subscribersCount} subscribers</Typography>
                                </Box>
                            </NavLink>
                            {!isUserAuthorOfPost && <Button
                                sx={{
                                    ml: 2,
                                    borderRadius: 4,
                                }}
                                variant='contained'
                                onClick={onToggleSubscribe}
                            >
                                {!isSubscribed ? 'Subscribe' : 'Unsubscribe'}
                            </Button>}
                        </Box>
                        <Box sx={{my: 1}}>
                            <Typography variant='body1'>{body}</Typography>
                            <Typography variant='body2'>{formattedTags}</Typography>
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    )
}