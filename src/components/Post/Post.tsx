import {Avatar, Box, Button, Container, IconButton, Menu, MenuItem, OutlinedInput, Typography} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import {postsApi} from "../../redux/api/postsApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useToggleSaveOfPostCreator from "../../hooks/useToggleSaveOfPostCreator";
import {useAppSelector} from "../../redux/hooks";
import {IUserSliceAuthorized} from "../../types/userSlice";
import useToggleLikeOfPostCreator from "../../hooks/useToggleLikeOfPostCreator";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, {useEffect, useState} from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import {usersApi} from "../../redux/api/usersApi";
import useAnchorEl from "../../hooks/useAnchorEl";
import {extendedCollectionsApi, extendedPostsApi, extendedUsersApi} from "../../redux/api/rootApi";
import Loader from "../Loader";



export default function Post() {
    const {id = ''} = useParams<{ id: string }>()!

    const {user, token} = useAppSelector((state) => state.userReducer) as IUserSliceAuthorized
    const {_id: currentUserId} = user

    const [subscribe] = usersApi.useSubscribeMutation()
    const [unsubscribe] = usersApi.useUnsubscribeMutation()

    const [deletePostFn] = postsApi.useDeleteMutation()

    const deletePost = async () => {
        await deletePostFn({id: postId, token})
    }

    // const {data: post, isLoading: isPostLoading} = postsApi.useGetPostByIdQuery(id)
    // const {data: author, isLoading: isUserLoading} = usersApi.useGetByIdQuery({
    //     id: post?.author?._id || '',
    //     token,
    //     posts: false,
    //     collections: false
    // })
    const {data: post, isLoading: isPostLoading} = extendedPostsApi.useGetOneByIdQuery({id})
    console.log(post)

    const useToggleLike = useToggleLikeOfPostCreator({token, currentUserId})
    // const [{isLiked, likes}, toggleLike] = useToggleLike({
    //     skip: isPostLoading,
    //     postId: id,
    //     usersLiked: post?.usersLiked || [],
    //     likesCount: post?.likesCount || 0
    // })


    const [updateUser] = extendedUsersApi.useUpdateUserMutation()
    const [subscribeToUser] = extendedUsersApi.useSubscribeToUserByIdMutation()
    const [unsubscribeToUser] = extendedUsersApi.useUnsubscribeFromUserByIdMutation()


    // const [{isLoading, refetch}, useToggleSave] = useToggleSaveOfPostCreator({token})
    // const [{isSaved, saves, savesInfo}, toggleSave, addNewCollectionInSavesInfo] = useToggleSave({
    //     skip: isPostLoading,
    //     savesCount: post?.savesCount || 0,
    //     postId: id
    // })

    const theme = useTheme()
    const {main} = theme.palette.primary

    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));

    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()

    const toggleSubscribe = async () => {
        try {
            isSubscribed ? unsubscribeToUser({id: authorId}).unwrap() : subscribeToUser({id: authorId}).unwrap()
        } catch (e) {
            console.log(e)
        }
    }

    const [unlikePost] = extendedPostsApi.useUnlikeOneByIdMutation()
    const [likePost] = extendedPostsApi.useLikeOneByIdMutation()

    const [unsavePost] = extendedCollectionsApi.useDeletePostFromCollectionMutation()
    const [savePost] = extendedCollectionsApi.useSavePostInCollectionMutation()

    if (isPostLoading) return <Loader/>

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
        savesCount,
        image: postImageURL,
        isLiked,
        isSomewhereSaved: isSaved,
        savesInfo
    } = post
    const {username, _id: authorId, avatar: avatarURL = ''} = author

    const subscribersAmount = 0
        // subscribers.length
    const formattedTags = tags.join(' ')
    const isProfileOfCurrentUser = currentUserId === post.author._id
    const isSubscribed = false
        // !!subscribers.find((id) => id === currentUserId)
    const isUserAuthorOfPost = authorId === currentUserId

    const toggleLike = async () => {
        try {
            isLiked ? await unlikePost({id: postId}).unwrap() : await likePost({id: postId}).unwrap()
        } catch (e) {
            console.log(e)
        }
    }

    const toggleSave = async ({collectionId, isSaved}: {collectionId: string, isSaved: boolean}) => {
        try {
            isSaved ? await unsavePost({postId, collectionId}) : await savePost({postId, collectionId})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Box
            sx={{overflowY: 'auto', height: '92vh'}}

        >
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
                        // justifyContent: 'space-between',
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
                            <IconButton onClick={toggleLike}>
                                {isLiked ? <FavoriteIcon color='secondary'/> : <FavoriteBorderIcon/>}
                            </IconButton>
                            <Typography sx={{ml: 0.5}}>
                                {likesCount}
                            </Typography>
                            <IconButton
                                id="basic-button"
                                aria-controls={isAnchorEl ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={isAnchorEl ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{ml: 'auto'}}
                            >
                                {isSaved ? <BookmarkAddedIcon/> : <BookmarkBorderIcon/>}
                            </IconButton>
                            {isUserAuthorOfPost &&
                                <Button color='error' onClick={deletePost}>
                                    Delete
                                </Button>
                            }
                            <Box>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={isAnchorEl}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    sx={{
                                        maxHeight: '300px'
                                    }}
                                >
                                    {savesInfo.map(({title, isSaved, collectionId}, i) => {
                                        return (
                                            <MenuItem key={i} onClick={() => {
                                                handleClose()
                                                toggleSave({collectionId, isSaved})
                                            }}>
                                                {isSaved ? 'saved in' : 'not saved in'} {title}
                                            </MenuItem>
                                        )
                                    })}
                                    <Button
                                        variant='contained'
                                        onClick={() => {
                                            handleClose()
                                            // openModal()

                                        }}
                                        sx={{mx: 1, my: 1}}
                                    >
                                        Create new collection
                                    </Button>
                                </Menu>
                            </Box>
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
                                    <Typography variant='caption'>{subscribersAmount} subscribers</Typography>
                                </Box>
                            </NavLink>
                            {!isProfileOfCurrentUser && <Button
                                sx={{
                                    ml: 2,
                                    borderRadius: 4,
                                }}
                                variant='contained'
                                onClick={toggleSubscribe}
                            >
                                {!isSubscribed ? 'Subscribe' : 'Unsubscribe'}
                            </Button>}
                        </Box>
                        <Box sx={{my: 1}}>
                            <Typography variant='body1'>{body}</Typography>
                            <Typography variant='body2'>{formattedTags}</Typography>
                        </Box>
                        {/*<Box>*/}
                        {/*    <Typography variant='h6'>Comments</Typography>*/}
                        {/*    <OutlinedInput multiline fullWidth sx={{*/}
                        {/*        minHeight: '200px',*/}
                        {/*        alignItems: 'flex-start'*/}
                        {/*    }}/>*/}
                        {/*</Box>*/}
                    </Box>

                </Box>
            </Container>
        </Box>
    )
}