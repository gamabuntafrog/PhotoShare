import {Box, IconButton, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import useSx from "../../../hooks/useSx";
import postItemStyles from "../postItemStyles";

interface IPostItemLikesContainerProps {
    onToggleLike: () => void,
    isLiked: boolean,
    likesCount: number
}

export default function PostItemBottomButtonsWrapper({onToggleLike, isLiked, likesCount}: IPostItemLikesContainerProps) {

    const styles = useSx(postItemStyles)

    return (
        <Box
            sx={styles.postBottomButtonsWrapper}
            className='buttonsBar'
        >
            <IconButton sx={styles.likeButton} onClick={onToggleLike}>
                {isLiked ? <FavoriteIcon color='secondary'/> : <FavoriteBorderIcon/>}
            </IconButton>
            <Typography sx={{ml: 0.5, color: 'currentColor'}}>
                {likesCount}
            </Typography>
        </Box>
    )
}