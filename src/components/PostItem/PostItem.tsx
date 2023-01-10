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

interface IPostItem {
    post: IPost,
    useToggleLike: useToggleLikeType,
    useToggleSave: useToggleSaveType,
    openModal: () => void
}


export default function PostItem({post, useToggleLike, useToggleSave, openModal}: IPostItem) {
    const {user, token} = useAppSelector((state) => state.userReducer) as IUserSliceAuthorized

    const {
        _id: postId,
        author,
        title,
        body,
        tags,
        likesCount,
        savesCount,
        image: {url: postImageURL},
        usersLiked,
    } = post
    const {username, _id: authorId, avatar: {url: avatarURL = ''}} = author



    const [{isLiked, likes}, toggleLike] = useToggleLike({postId, usersLiked, likesCount})

    const formattedTags = tags.join(' ')
    const theme = useTheme()
    const {main} = theme.palette.primary


    const [{isSaved, saves, savesInfo}, toggleSave, addNewCollectionInSavesInfo] = useToggleSave({postId, savesCount})

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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{ml: 'auto'}}
                    >
                        {isSaved ? <BookmarkAddedIcon/> : <BookmarkBorderIcon/>}
                    </IconButton>
                    <Box>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{
                                maxHeight: '300px'
                            }}
                        >
                            {savesInfo.map(({savedInCollectionTitle, postId, isSaved, collectionId}, i) => {
                                return (
                                    <MenuItem key={i} onClick={() => {
                                        handleClose()
                                        toggleSave({collectionId, isSavedInCollection: isSaved})
                                    }}>
                                        {isSaved ? 'saved in' : 'not saved in'} {savedInCollectionTitle}
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
                        {likes}
                    </Typography>
                </Box>
            </Box>
            <ImageListItemBar sx={{display: 'inline-flex'}} position="below" title={PostItemTitle}/>
        </ImageListItem>

    )
}

