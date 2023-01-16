import {
    Avatar,
    Box,
    IconButton,
    ListItem,
    Typography,
    Link,
    ImageListItem,
    ImageListItemBar,
    MenuItem, Button, Menu
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import styles from "../Posts/Posts.module.css";
import {NavLink} from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CommentIcon from '@mui/icons-material/Comment';
import {IPost} from "../../types/post";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useAppSelector} from "../../redux/hooks";
import {IUserSliceAuthorized} from "../../types/userSlice";
import React, {Dispatch, useState} from "react";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {collectionsApi} from "../../redux/api/collectionsApi";
import {IToggleLikeProps, useToggleLikeType, useToggleSaveType} from "../../types/types";
import useAnchorEl from "../../hooks/useAnchorEl";
import {extendedCollectionsApi, extendedPostsApi} from "../../redux/api/rootApi";

interface IPostItem {
    post: IPost,
    openModal: () => void,
    collectionId?: string
}


export default function PostItem({post, openModal, collectionId = ''}: IPostItem) {

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

    const [unlikePost] = extendedPostsApi.useUnlikeOneByIdMutation()
    const [likePost] = extendedPostsApi.useLikeOneByIdMutation()
    const [unsavePost] = extendedCollectionsApi.useDeletePostFromCollectionMutation()
    const [savePost] = extendedCollectionsApi.useSavePostInCollectionMutation()

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

    const formattedTags = tags.join(' ')
    const theme = useTheme()
    const {main} = theme.palette.primary


    const PostItemTitle = <>
        <Box
            sx={{
                px: 0.5,
                pb: 1,
                whiteSpace: 'break-spaces',
                wordBreak: 'break-all'
            }}
        >
            <NavLink to={`/posts/${postId}`}>
                <Typography variant='h6'>{title}</Typography>
                <Typography sx={{mt: -1}} variant='caption'>{formattedTags}</Typography>
            </NavLink>
        </Box>
        <NavLink style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
        }} to={`/users/${authorId}`}>
            <Avatar sx={{width: '40px', height: '40px'}} src={avatarURL as string}/>
            <Typography sx={{ml: 1}}>{username}</Typography>
        </NavLink>
    </>

    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()

    return (
        <ImageListItem
            key={postId}
            sx={{
                display: 'inline-block',
                '&:hover .buttonsBar': {
                    opacity: 1
                }
            }}

        >
            <Box
                sx={{
                    position: 'relative',

                    '&:hover .postImage': {
                        filter: 'brightness(80%)',
                    },
                }}
            >
                <NavLink style={{position: 'relative'}} to={`/posts/${postId}`}>
                    <img
                        src={postImageURL}
                        style={{
                            width: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            backgroundColor: main,
                        }}
                        className='postImage'
                    />
                </NavLink>
                <Box
                    sx={{
                        display: 'flex', alignItems: 'center', padding: 0.5, alignSelf: 'flex-start', width: '95%',
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        zIndex: 100,
                        opacity: 0
                    }}
                    className='buttonsBar'
                >
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
                                        // toggleSave({collectionId, isSavedInCollection: isSaved})
                                    }}>
                                        {isSaved ? 'saved in' : 'not saved in'} {title}
                                    </MenuItem>
                                )
                            })}
                            <Button
                                variant='contained'
                                onClick={() => {
                                    handleClose()
                                    openModal()

                                }}
                                sx={{mx: 1, my: 1}}
                            >
                                Create new collection
                            </Button>
                        </Menu>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex', alignItems: 'center', padding: 0.5, alignSelf: 'flex-start', width: '95%',
                        position: 'absolute',
                        top: '100%',
                        transform: 'translateY(-110%)',
                        zIndex: 100,
                        opacity: 0
                    }}
                    className='buttonsBar'
                >
                    <IconButton onClick={toggleLike}>
                        {isLiked ? <FavoriteIcon color='secondary'/> : <FavoriteBorderIcon/>}
                    </IconButton>
                    <Typography sx={{ml: 0.5}}>
                        {likesCount}
                    </Typography>
                </Box>
            </Box>
            <ImageListItemBar sx={{display: 'inline-flex'}} position="below" title={PostItemTitle}/>
        </ImageListItem>

    )
}

