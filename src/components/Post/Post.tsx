import {
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Typography,
    useTheme
} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
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
import extendedUsersApi from "../../redux/api/extendedUsersApi";


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

export default function Post() {
    const {id = ''} = useParams<{ id: string }>()!

    const {_id: currentUserId} = useAppSelector((state) => state.userReducer.user) as ICurrentUser

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
        savesInfo
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
                sx={styles.postContainer}
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
                    </Box>
                </Box>
            </Container>
        </>
    )
}