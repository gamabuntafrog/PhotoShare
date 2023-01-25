import {Avatar, Box, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import React from "react";
import useSx from "../../../hooks/useSx";
import postItemStyles from "../postItemStyles";


interface IPostItemTitleProps {
    postId: string,
    title: string,
    formattedTags: string,
    authorId: string,
    avatarURL: string | null,
    username: string
}

export default function PostItemTitle({postId, title, formattedTags, authorId, avatarURL, username}: IPostItemTitleProps) {

    const styles = useSx(postItemStyles)

    return (
        <>
            <Box
                sx={styles.postItemTitleWrapper}
            >
                <NavLink to={`/posts/${postId}`}>
                    <Typography sx={{mb: '-4px'}}  variant='h6'>{title}</Typography>
                    <Typography variant='caption'>{formattedTags}</Typography>
                </NavLink>
            </Box>
            <NavLink style={styles.postItemTitleUsernameWrapper} to={`/users/${authorId}`}>
                <Avatar sx={styles.authorAvatar} src={avatarURL || ''}/>
                <Typography sx={{ml: 1}}>{username}</Typography>
            </NavLink>
        </>
    )
}