import {Avatar, Box, IconButton, ListItem, Typography, Link, ImageListItem, ImageListItemBar} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import styles from "../Posts/Posts.module.css";
import {NavLink} from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CommentIcon from '@mui/icons-material/Comment';
import {IPost} from "../../types/post";
import {FC} from "react";


interface IPostItem {
    post: IPost,
}

// зробити появу кнопок на картинці при ховері на айтем
// зробити окрему сторінку з постом

export default function PostItem({post}: IPostItem) {
    const {_id: postId, author, title, body, tags, likesCount, image: {url: postImageURL}} = post
    const {username, _id: authorId, avatar: {url: avatarURL = ''}} = author

    const formattedTags = tags.join(' ')
    const theme = useTheme()
    const {main} = theme.palette.primary

    const PostItemTitle = <>
        <Box
            sx={{
                px: 0.5,
            }}
        ><NavLink to={`posts/${postId}`}>
            <Typography variant='h6'>{title}</Typography>
        </NavLink>
        </Box>
        <NavLink style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
        }} to={`users/${authorId}`}>
            <Avatar sx={{width: '40px', height: '40px'}} src={avatarURL as string}/>
            <Typography sx={{ml: 1}}>{username}</Typography>
        </NavLink>
    </>

    return (
        <ImageListItem
            key={postId}
            // sx={{
            //     display: 'inline-block',
            //     width: '100%',
            //     mb: 2,
            //     borderRadius: '8px',
            // }}

        >
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        position: 'relative'*/}
            {/*    }}*/}
            {/*>*/}
            <NavLink to={`posts/${postId}`}>
                <img
                    src={postImageURL}
                    style={{
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        backgroundColor: main
                    }}
                />
            </NavLink>
            {/*<Box sx={{*/}
            {/*    display: 'flex', alignItems: 'center', padding: 0.5, alignSelf: 'flex-start', width: '95%',*/}
            {/*    position: 'absolute',*/}
            {/*    top: '100%',*/}
            {/*    transform: 'translateY(-110%)'*/}
            {/*}}>*/}
            {/*    <IconButton>*/}
            {/*        <FavoriteBorderIcon/>*/}
            {/*    </IconButton>*/}
            {/*    <Typography sx={{ml: 0.5}}>*/}
            {/*        {likesCount}*/}
            {/*    </Typography>*/}
            {/*    <IconButton sx={{ml: 1}}>*/}
            {/*        <CommentIcon/>*/}
            {/*    </IconButton>*/}
            {/*    <IconButton sx={{ml: 'auto'}}>*/}
            {/*        <BookmarkBorderIcon/>*/}
            {/*    </IconButton>*/}
            {/*</Box>*/}
            {/*</Box>*/}
            <ImageListItemBar sx={{display: 'inline-flex'}} position="below" title={PostItemTitle}
            />


        </ImageListItem>

    )
}

