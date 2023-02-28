import {useAppSelector} from "../../../redux/hooks";
import {IUserSliceAuthorized} from "../../../types/types";
import useCommentsActions, {commentsType} from "../../../hooks/useCommentsActions";
import useSx from "../../../hooks/useSx";
import postStyles from "../postStyles";
import {useNavigate} from "react-router-dom";
import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import {IComment} from "../../../types/types";
import useShortTranslation from "../../../hooks/useShortTranslation";

interface ICommentsProps {
    postId: string,
    comments: IComment[]
}

export default function Comments({postId, comments: initComments}: ICommentsProps) {
    const currentUserAvatarURL = useAppSelector(state => (state.userReducer as IUserSliceAuthorized).user.avatar.url) as string
    const currentUserId = useAppSelector(state => (state.userReducer as IUserSliceAuthorized).user._id) as string

    const {
        receiver,
        onSubmit,
        chooseComment,
        chooseReply,
        deleteComment,
        deleteReply,
        register,
        commentType,
        comments
    } = useCommentsActions({initComments, postId})

    const {comments: styles} = useSx(postStyles)

    const navigate = useNavigate()

    const t = useShortTranslation({componentNameKey: 'Post.Comments'})

    return (
        <Box sx={styles.container}>
            {comments.length > 0 && (
                <List sx={{px: 0}}>
                    {comments.map((comment) => {
                        const {_id: commentId, author: {username, _id: authorId, avatar}, text, replies} = comment

                        return (
                            <ListItem key={commentId} sx={styles.commentItem}>
                                <Box sx={styles.commentContainer}>
                                    <ListItemAvatar
                                        onClick={() => navigate(`/users/${authorId}`)}
                                        sx={styles.avatarWrapper}
                                    >
                                        <Avatar src={avatar}/>
                                    </ListItemAvatar>
                                    <Box sx={styles.commentWrapper}>
                                        <ListItemText
                                            onClick={() => navigate(`/users/${authorId}`)}
                                            sx={styles.username}
                                        >
                                            {username}
                                        </ListItemText>
                                        <Box sx={styles.commentSecondWrapper}>
                                            <Typography
                                                sx={styles.replyButton}
                                                variant='caption'
                                                onClick={() => chooseReply({receiverId: authorId, commentId})}
                                            >
                                                {t('reply')}
                                            </Typography>
                                            <ListItemText sx={styles.avoid}>|</ListItemText>
                                            <ListItemText>{text}</ListItemText>
                                        </Box>
                                    </Box>
                                    {(authorId === currentUserId) && (
                                        <IconButton onClick={() => deleteComment(commentId)} sx={styles.deleteButton} color='error'>
                                            <CloseIcon />
                                        </IconButton>
                                    )}
                                </Box>

                                <List sx={styles.repliesList}>
                                    {replies.map((reply) => {
                                        const {
                                            _id: replyId,
                                            author: {username, _id: authorId, avatar},
                                            text,
                                            receiver: {_id: receiverId, username: receiverUsername}
                                        } = reply

                                        return (
                                            <ListItem key={replyId} sx={styles.commentItem}>
                                                <Box sx={styles.commentContainer}>
                                                    <ListItemAvatar
                                                        onClick={() => navigate(`/users/${authorId}`)}
                                                        sx={styles.avatarWrapper}
                                                    >
                                                        <Avatar src={avatar}/>
                                                    </ListItemAvatar>
                                                    <Box sx={styles.commentWrapper}>
                                                        <ListItemText
                                                            sx={{cursor: 'pointer'}}
                                                        >
                                                            <Typography
                                                                onClick={() => navigate(`/users/${authorId}`)}
                                                                component='span'
                                                                sx={styles.username}
                                                            >
                                                                {username}
                                                            </Typography>
                                                            <Typography
                                                                component='span'
                                                                variant='caption'
                                                                onClick={() => navigate(`/users/${receiverId}`)}
                                                                sx={{color: 'text.secondary', ml: 0.5}}
                                                            >
                                                                to {receiverUsername}
                                                            </Typography>
                                                        </ListItemText>
                                                        <Box sx={styles.commentSecondWrapper}>
                                                            <Typography
                                                                sx={styles.replyButton}
                                                                variant='caption'
                                                                component='p'
                                                                onClick={() => chooseReply({
                                                                    receiverId: authorId,
                                                                    commentId
                                                                })}
                                                            >
                                                                {t('reply')}
                                                            </Typography>
                                                            <ListItemText sx={styles.avoid}>|</ListItemText>
                                                            <ListItemText>{text}</ListItemText>
                                                            {(authorId === currentUserId) && (
                                                                <IconButton onClick={() => deleteReply(replyId)} sx={styles.deleteButton} color='error'>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <Box sx={
                styles.writeCommentContainer(commentType === commentsType.reply)
            }>
                <Avatar src={currentUserAvatarURL} sx={{mr: 1}}/>
                <Box sx={styles.inputWrapper}>
                    {commentType === commentsType.reply && (
                        <Box
                            sx={styles.replyContainer}
                            onClick={chooseComment}
                        >
                            <Typography component='p' variant='caption'>
                                {t('replyTo', {username: receiver?.author.username || 'unknown'})}
                            </Typography>
                            <IconButton sx={{ml: 0.5}} color='error' size='small'>
                                <CloseIcon sx={{fontSize: 'small'}}/>
                            </IconButton>
                        </Box>
                    )}
                    <TextField {...register('text')} fullWidth placeholder={t('writeComment')}/>
                </Box>
                <IconButton sx={{ml: 1}} onClick={onSubmit}>
                    <SendIcon/>
                </IconButton>
            </Box>
        </Box>
    )
}