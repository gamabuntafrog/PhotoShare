import {Avatar, Box, Button, Container, IconButton, Menu, MenuItem, OutlinedInput, Typography} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, {useEffect, useState} from "react";
import {extendedCollectionsApi, extendedPostsApi, extendedUsersApi} from "../../redux/api/rootApi";
import PostSavesInfo from "../PostSavesInfo";
import CreateCollectionModal from "../CreateCollectionModal";
import usePostActions from "../../hooks/usePostActions";
import {ICurrentUser} from "../../types/user";
import useToggleSubscribe from "../../hooks/useToggleSubscribe";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useMediaQueries from "../../hooks/useMediaQueries";
import useSx from "../../hooks/useSx";
import postStyles, {StyledPostImage} from "./postStyles";

interface IAuthorOfPostInfoProps {
    authorId: string,
    avatarURL: string | null,
    username: string,
    subscribersCount: number,
    isUserAuthorOfPost: boolean,
    isSubscribed: boolean,
    onToggleSubscribe: () => void
}

function AuthorOfPostInfo(
    {
        authorId,
        avatarURL,
        username,
        subscribersCount,
        isUserAuthorOfPost,
        isSubscribed,
        onToggleSubscribe
    }: IAuthorOfPostInfoProps) {

    return (
        <Box
            sx={{display: 'flex'}}
        >
            <NavLink
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                }}
                to={`/users/${authorId}`}>
                <Avatar sx={{width: '40px', height: '40px'}} src={avatarURL as string}/>
                <Box
                    sx={{
                        ml: 1,
                        lineHeight: '0px'
                    }}
                >
                    <Typography variant='h6'>{username}</Typography>
                    <Typography variant='caption'>{subscribersCount} subscribers</Typography>
                </Box>
            </NavLink>
            {!isUserAuthorOfPost && <Button
                sx={{
                    ml: 2,
                    borderRadius: 4,
                }}
                variant='contained'
                onClick={onToggleSubscribe}
            >
                {!isSubscribed ? 'Subscribe' : 'Unsubscribe'}
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
    const {toggleSubscribe, isSubscribed} = useToggleSubscribe(post?.author._id || '')


    const styles = useSx(postStyles)

    if (!post && isPostLoading) return <FullScreenLoader/>

    if (!post || !post.author) {
        return (
            <Box>
                <Typography variant='h1'>404 Not Found</Typography>
            </Box>
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
    const onToggleSubscribe = () => toggleSubscribe(authorId, isSubscribed)
    const onDeletePost = () => deletePost(postId)

    return (
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
                        <PostSavesInfo collections={savesInfo} toggleSave={toggleSave} postId={postId} isSaved={isSaved}
                                       openModal={openModal}/>
                        {isUserAuthorOfPost &&
                            <Button color='error' onClick={onDeletePost}>
                                Delete
                            </Button>
                        }
                    </Box>
                    <Typography variant='h3'>{title}</Typography>
                    <AuthorOfPostInfo
                        authorId={authorId}
                        avatarURL={avatarURL}
                        username={username}
                        subscribersCount={subscribersCount}
                        isUserAuthorOfPost={isUserAuthorOfPost}
                        isSubscribed={isSubscribed}
                        onToggleSubscribe={onToggleSubscribe}
                    />
                    <Box sx={{my: 1}}>
                        <Typography variant='body1'>{body}</Typography>
                        <Typography variant='body2'>{formattedTags}</Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}