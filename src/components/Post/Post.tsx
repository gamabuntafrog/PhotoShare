import {
    Avatar,
    Box,
    Button,
    Container,
    IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField,
    Typography,
    useTheme
} from "@mui/material";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, {useEffect, useState} from "react";
import extendedPostsApi from "../../redux/api/extendedPostsApi";
import PostSavesInfo from "../PostSavesInfo";
import CreateCollectionModal from "../CreateCollectionModal";
import usePostActions from "../../hooks/usePostActions";
import {ICurrentUser} from "../../types/user";
import useToggleSubscribe from "../../hooks/useToggleSubscribe";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useSx from "../../hooks/useSx";
import postStyles, {StyledPostImage} from "./postStyles";
import DeleteIcon from '@mui/icons-material/Delete';
import useShortTranslation from "../../hooks/useShortTranslation";
import StandardHelmet from "../StandardHelmet";
import MiniLoader from "../Loaders/MiniLoader";
import MasonryPostsDrawer from "../MasonryPostsDrawer";
import usePostsActions from "../../hooks/usePostsActions";
import {IUserSliceAuthorized} from "../../types/userSlice";
import SendIcon from '@mui/icons-material/Send';
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {
    commentValidationSchema,
    createPostValidationSchema,
    replyValidationSchema
} from "../../utils/validationSchemas";
import convertImageToString from "../../utils/convertImageToString";
import {IComment} from "../../types/post";
import CloseIcon from '@mui/icons-material/Close';


interface IAuthorOfPostInfoProps {
    authorId: string,
    avatarURL: string | null,
    username: string,
    subscribersCount: number,
    isUserAuthorOfPost: boolean,
}

function AuthorOfPostInfo(
    {
        authorId,
        avatarURL,
        username,
        subscribersCount: initSubscribersCount,
        isUserAuthorOfPost,
    }: IAuthorOfPostInfoProps) {

    const {toggleSubscribe, isSubscribed, subscribersCount} = useToggleSubscribe(authorId, initSubscribersCount)
    const onToggleSubscribe = () => toggleSubscribe(authorId, isSubscribed)

    const t = useShortTranslation({componentNameKey: 'Post'})

    const userActionsButton = isSubscribed ? t('unsubscribeButton') : t('subscribeButton')

    const {authorInfo: styles} = useSx(postStyles)


    return (
        <Box
            sx={styles.container}
        >
            <NavLink
                style={styles.wrapper}
                to={`/users/${authorId}`}>
                <Avatar sx={styles.avatar} src={avatarURL as string}/>
                <Box
                    sx={styles.userInfoWrapper}
                >
                    <Typography variant='h6'>{username}</Typography>
                    <Typography variant='caption'>{t('subscribersCount', {subscribersCount})}</Typography>
                </Box>
            </NavLink>
            {!isUserAuthorOfPost && <Button
                sx={styles.subscribeButton}
                variant='contained'
                onClick={onToggleSubscribe}
            >
                {userActionsButton}
            </Button>}
        </Box>
    )
}

function SimilarPostsByTags({tags, postId}: { tags: string[], postId: string }) {

    const {data = [], isLoading, isError} = extendedPostsApi.useGetByTagsQuery({tags, arrayOfId: [], id: postId})
    const [pots, postActions] = usePostsActions({initPosts: data})
    const {similarPosts: styles} = useSx(postStyles)


    if (isLoading) return (
        <Box sx={styles.loaderContainer}>
            <MiniLoader/>
        </Box>
    )

    if (data.length === 0 || isError) return null

    return (
        <Box sx={{px: 1}}>
            <MasonryPostsDrawer posts={pots} postsActions={postActions}/>
        </Box>
    )
}


export default function Post() {
    const {id = ''} = useParams<{ id: string }>()!

    const currentUserId = useAppSelector((state) => (state.userReducer as IUserSliceAuthorized).user._id)

    const {data, isLoading: isPostLoading} = extendedPostsApi.useGetOneByIdQuery({id})

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const [post, {toggleLike, toggleSave, updateSavesInfo, deletePost}] = usePostActions({initPost: data})

    const t = useShortTranslation({componentNameKey: 'Post'})

    const styles = useSx(postStyles)

    if (!post && isPostLoading) return <FullScreenLoader withMeta/>

    if (!post || !post.author) {
        return (
            <>
                <StandardHelmet keyOfOther='error'/>
                <Container sx={{height: '92vh', ...styles.postContainer}}>
                    <Typography variant='h1' textAlign='center'>{t('doesNotExists')}</Typography>
                </Container>
            </>
        )
    }

    const {
        _id: postId,
        author,
        title,
        body,
        tags,
        likesCount,
        image: postImageURL,
        isLiked,
        isSomewhereSaved: isSaved,
        savesInfo,
        comments
    } = post
    const {username, _id: authorId, avatar: avatarURL = '', subscribersCount} = author

    const formattedTags = tags.join(' ')
    const isUserAuthorOfPost = authorId === currentUserId

    const onToggleLike = () => toggleLike(postId, isLiked)
    const onDeletePost = () => deletePost(postId)

    return (
        <>
            <StandardHelmet keyOfTitle='post' options={{username}}/>
            <Container
                sx={{...styles.postContainer}}
            >
                <CreateCollectionModal
                    postId={postId}
                    onCreate={updateSavesInfo}
                    closeModal={closeModal}
                    isModalOpen={isModalOpen}
                />
                <Box
                    key={postId}
                    sx={styles.postWrapper}
                >
                    <StyledPostImage
                        src={postImageURL}
                    />
                    <Box
                        sx={styles.postInfo}
                    >
                        <Box sx={styles.postButtons}>
                            <IconButton onClick={onToggleLike}>
                                {isLiked ? <FavoriteIcon color='secondary'/> : <FavoriteBorderIcon/>}
                            </IconButton>
                            <Typography sx={{ml: 0.5}}>
                                {likesCount}
                            </Typography>
                            <PostSavesInfo
                                collections={savesInfo}
                                toggleSave={toggleSave}
                                postId={postId}
                                isSaved={isSaved}
                                openModal={openModal}
                            />
                            {isUserAuthorOfPost &&
                                <IconButton color='error' onClick={onDeletePost}>
                                    <DeleteIcon/>
                                </IconButton>
                            }
                        </Box>
                        <Typography variant='h3'>{title}</Typography>
                        <AuthorOfPostInfo
                            authorId={authorId}
                            avatarURL={avatarURL}
                            username={username}
                            subscribersCount={subscribersCount}
                            isUserAuthorOfPost={isUserAuthorOfPost}
                        />
                        <Box sx={{my: 1}}>
                            <Typography variant='body1'>{body}</Typography>
                            <Typography variant='body2'>{formattedTags}</Typography>
                        </Box>
                        <Comments comments={comments} postId={id}/>
                    </Box>
                </Box>
            </Container>
            <SimilarPostsByTags tags={tags} postId={id}/>
        </>
    )
}

enum commentsType {
    comment = 'comment',
    reply = 'reply'
}

interface ICommentFormData {
    text: string
}

interface IReplyFormData {
    text: string,
    commentId: string,
    receiverId: string
}

interface ICommentsProps {
    postId: string,
    comments: IComment[]
}


function Comments({postId, comments}: ICommentsProps) {
    console.log(comments)
    const currentUserAvatarURL = useAppSelector(state => (state.userReducer as IUserSliceAuthorized).user.avatar.url) as string

    const [createComment] = extendedPostsApi.useCreateCommentMutation()
    const [createReply] = extendedPostsApi.useCreateReplyMutation()

    const [commentType, setCommentType] = useState<commentsType>(commentsType.comment);

    const {
        register,
        watch,
        handleSubmit,
        setValue,
        reset,
        formState: {},
    } = useForm<ICommentFormData | IReplyFormData>({
        resolver: commentType === commentsType.comment ? yupResolver(commentValidationSchema) : yupResolver(replyValidationSchema),
        mode: 'all',
        defaultValues: commentType === commentsType.comment ? {text: ''} : {
            text: '',
            commentId: '',
            receiverId: ''
        }
    });

    const chooseComment = () => {
        setCommentType(commentsType.comment)
        setValue('receiverId', '')
        setValue('commentId', '')
    }
    const chooseReply = ({receiverId, commentId}: { receiverId: string, commentId: string }) => {
        setCommentType(commentsType.reply)
        setValue('receiverId', receiverId)
        setValue('commentId', commentId)
    }

    const onSubmit = handleSubmit(async (props) => {
        const {text} = props
        // author 63b55b1ea5e2554ebb11c625
        // text test nested comment
        // postRef 63e6a891c6027f5f3a6de635
        // commentRef 63f7a20bd2c7f5b96af5de14
        if (commentType === commentsType.reply) {
            const {commentId, receiverId} = props as IReplyFormData
            console.log('reply', text, commentId, receiverId)

            await createReply({text, postId, commentId, receiverId})
        } else {
            console.log('comment', text)
            await createComment({text, postId})
        }

        reset()
        setCommentType(commentsType.comment)
    });

    const navigate = useNavigate()

    const receiver = comments.find((comment) => {
        return comment.author._id === watch('receiverId')
    }) || comments.find((comment) => comment.replies.find((reply) => reply.author._id === watch('receiverId')))

    const {comments: styles} = useSx(postStyles)

    return (
        <Box sx={styles.container}>
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
                                        _id,
                                        author: {username, _id: authorId, avatar},
                                        text,
                                        receiver: {_id: receiverId, username: receiverUsername}
                                    } = reply

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