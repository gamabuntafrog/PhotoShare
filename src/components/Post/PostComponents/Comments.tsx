import {useAppSelector} from "../../../redux/hooks";
import {IUserSliceAuthorized} from "../../../types/userSlice";
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
import {IComment} from "../../../types/post";

interface ICommentsProps {
    postId: string,
    comments: IComment[]
}

export default function Comments({postId, comments: initComments}: ICommentsProps) {
    const currentUserAvatarURL = useAppSelector(state => (state.userReducer as IUserSliceAuthorized).user.avatar.url) as string

    const {
        receiver,
        onSubmit,
        chooseComment,
        chooseReply,
        register,
        commentType,
        comments
    } = useCommentsActions({initComments, postId})

    const {comments: styles} = useSx(postStyles)

    const navigate = useNavigate()

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
                                                Reply
                                            </Typography>
                                            <ListItemText sx={styles.avoid}>|</ListItemText>
                                            <ListItemText>{text}</ListItemText>
                                        </Box>
                                    </Box>
                                </Box>

                                <List sx={{alignSelf: 'start', pl: 2, pt: 0}}>
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
                                                                Reply
                                                            </Typography>
                                                            <ListItemText sx={styles.avoid}>|</ListItemText>
                                                            <ListItemText>{text}</ListItemText>
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
            <Box sx={{
                pt: commentType === commentsType.reply ? 3.5 : 1,
                ...styles.writeCommentContainer
            }}>
                <Avatar src={currentUserAvatarURL} sx={{mr: 1}}/>
                <Box sx={{position: 'relative', width: '100%'}}>
                    {commentType === commentsType.reply && (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '105%',
                                left: '6px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={chooseComment}
                        >
                            <Typography component='p' variant='caption'>
                                Reply to {receiver?.author.username || 'unknown'}
                            </Typography>
                            <IconButton sx={{ml: 0.5}} color='error' size='small'>
                                <CloseIcon sx={{fontSize: 'small'}}/>
                            </IconButton>
                        </Box>
                    )}
                    <TextField {...register('text')} fullWidth placeholder='Write comment'/>
                </Box>
                <IconButton sx={{ml: 1}} onClick={onSubmit}>
                    <SendIcon/>
                </IconButton>
            </Box>
        </Box>
    )
}