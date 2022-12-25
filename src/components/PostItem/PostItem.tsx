import {Avatar, Box, IconButton, ListItem, Typography, Link} from "@mui/material";
import styles from "../Posts/Posts.module.css";
import {NavLink} from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/Comment';
import {IPost} from "../../types/post";


interface IPostItem {
    post: IPost
}

export default function PostItem({post}: IPostItem) {
    const {author, _id, title, body, likesCount, savesCount} = post
    const {username, _id: authorId} = author
    const avatarURL = author.avatar.url || ''

    return (
        <ListItem
            sx={{display: 'flex', flexDirection: 'column', justifyContent: ''}}
            className={styles.posts__item}
        >

            <Box sx={{
                py: 1,
                ml: 1,
                alignSelf: 'start'
            }}>
                <NavLink style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                }} to={`users/${authorId}`}>
                    <Avatar src={avatarURL}/>
                    <Typography sx={{ml: 1}}>{username}</Typography>
                </NavLink>
            </Box>
            <Box sx={{width: '100%', height: '300px', backgroundColor: 'darkcyan', borderRadius: 1}}/>
            <Box sx={{display: 'flex', alignItems: 'center', padding: 1, alignSelf: 'flex-start', width: '95%'}}>
                <IconButton>
                    <FavoriteBorderIcon/>
                </IconButton>
                <Typography sx={{ml: 0.5}}>
                    {likesCount}
                </Typography>
                <IconButton sx={{ml: 1}}>
                    <CommentIcon/>
                </IconButton>
                <IconButton sx={{ml: 'auto'}}>
                    <BookmarkBorderIcon/>
                </IconButton>
            </Box>
            <Typography>{title}</Typography>

            {/*<Typography>{body}</Typography>*/}
        </ListItem>
    )
}