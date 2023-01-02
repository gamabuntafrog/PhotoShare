import {Avatar, Box, IconButton, ListItem, Typography, Link, ImageListItem, ImageListItemBar} from "@mui/material";
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
import {useState} from "react";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {collectionsApi} from "../../redux/api/collectionsApi";
import {IToggleLikeProps, useToggleLike} from "../../types/types";

interface IPostItem {
    post: IPost,
    useToggleLike: useToggleLike
}


export default function PostItem({post, useToggleLike}: IPostItem) {
    const {user, token} = useAppSelector((state) => state.userReducer) as IUserSliceAuthorized
    const {
        _id: postId,
        author,
        title,
        body,
        tags,
        likesCount,
        image: {url: postImageURL},
        usersLiked,
        usersSaved
    } = post
    const {username, _id: authorId, avatar: {url: avatarURL = ''}} = author

    const isSaved = !!usersSaved.find((id) => id === user._id)
    const findIsPostLiked = !!usersLiked.find((id) => id === user._id)

    const [{isLiked, likes}, toggleLike] = useToggleLike({postId, isPostLiked: findIsPostLiked, likesCount})

    const formattedTags = tags.join(' ')
    const theme = useTheme()
    const {main} = theme.palette.primary

    const PostItemTitle = <>
        <Box
            sx={{
                px: 0.5,
            }}
        ><NavLink to={`/posts/${postId}`}>
            <Typography variant='h6'>{title}</Typography>
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
                        display: 'flex', alignItems: 'center', padding: 0.5, alignSelf: 'flex-start', width: '95%',
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        zIndex: 100,
                        opacity: 0
                    }}
                    className='buttonsBar'
                >
                    {/*<IconButton onClick={() => toggleSaveOfPost({id: postId, token, isSaved})} sx={{ml: 'auto'}}>*/}
                    {/*    {isSaved ? <BookmarkAddedIcon/> : <BookmarkBorderIcon />}*/}
                    {/*</IconButton>*/}
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
                        {likes}
                    </Typography>
                </Box>
            </Box>
            <ImageListItemBar sx={{display: 'inline-flex'}} position="below" title={PostItemTitle}/>
        </ImageListItem>

    )
}

