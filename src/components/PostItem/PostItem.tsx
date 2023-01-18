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
import {IPost, ISavesInfo} from "../../types/post";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {IUserSliceAuthorized} from "../../types/userSlice";
import React, {Dispatch, useState} from "react";
import useAnchorEl from "../../hooks/useAnchorEl";
import {IPostsActions} from "../../hooks/usePostsActions";
import PostSavesInfo from "../PostSavesInfo";

interface IPostItemProps {
    post: IPost,
    openModal: () => void,
    postsActions: IPostsActions
}


export default function PostItem({post, openModal, postsActions}: IPostItemProps) {

    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()
    const {toggleLike, toggleSave} = postsActions

    const {
        _id: postId,
        author,
        title,
        tags,
        likesCount,
        image: postImageURL,
        isLiked,
        isSomewhereSaved: isSaved,
        savesInfo
    } = post
    const {username, _id: authorId, avatar: avatarURL = ''} = author


    const theme = useTheme()
    const {main} = theme.palette.primary

    const onToggleLike = () => toggleLike(postId, isLiked)
    const onToggleSave = (postId: string, collectionId: string, isSaved: boolean) => {
        handleClose()
        toggleSave(postId, collectionId, isSaved)
    }

    const formattedTags = tags.join(' ')

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
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0.5,
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        zIndex: 100,
                        opacity: 0
                    }}
                    className='buttonsBar'
                >
                    <PostSavesInfo collections={savesInfo} toggleSave={toggleSave} postId={postId} isSaved={isSaved} openModal={openModal}/>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0.5,
                        position: 'absolute',
                        top: '100%',
                        transform: 'translateY(-110%)',
                        zIndex: 100,
                        opacity: 0
                    }}
                    className='buttonsBar'
                >
                    <IconButton onClick={onToggleLike}>
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

