import {
    Box,
    ImageListItem,
    ImageListItemBar,
} from "@mui/material";
import {NavLink} from "react-router-dom";
import {IPost, ISavesInfo} from "../../types/post";
import React, {Dispatch, useState} from "react";
import {IPostsActions} from "../../hooks/usePostsActions";
import PostSavesInfo from "../PostSavesInfo";
import CreateCollectionModal from "../CreateCollectionModal";
import useSx from "../../hooks/useSx";
import postItemStyles from "./postItemStyles";
import PostItemBottomButtonsWrapper from "./PostItemComponents/PostItemBottomButtonsWrapper";
import PostItemTitle from "./PostItemComponents/PostItemTitle";

interface IPostItemProps {
    post: IPost,
    postsActions: IPostsActions,
    showAuthor?: boolean
}


export default function PostItem({post, postsActions, showAuthor = true}: IPostItemProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {toggleLike, toggleSave, updateSavesInfo} = postsActions

    const {
        _id: postId,
        author,
        title,
        tags,
        likesCount,
        image: postImageURL,
        isLiked,
        isSomewhereSaved: isSaved,
        savesInfo
    } = post

    const {username, _id: authorId, avatar: avatarURL = ''} = author

    const formattedTags = tags.join(' ')

    const styles = useSx(postItemStyles)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)
    const onToggleLike = () => toggleLike(postId, isLiked)


    return (
        <>
            <CreateCollectionModal
                onCreate={updateSavesInfo}
                postId={post._id}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
            />
            <ImageListItem
                key={postId}
                sx={styles.postItem}
            >
                <Box
                    sx={styles.postItemWrapper}
                >
                    <NavLink to={`/posts/${postId}`}>
                        <img
                            src={postImageURL}
                            style={styles.image}
                            className='postImage'
                            alt={title}
                            loading='lazy'
                            role='presentation'
                            decoding='async'
                        />
                    </NavLink>
                    <Box
                        sx={styles.postTopButtonsWrapper}
                        className='buttonsBar'
                    >
                        <PostSavesInfo
                            collections={savesInfo}
                            toggleSave={toggleSave}
                            postId={postId}
                            isSaved={isSaved}
                            openModal={openModal}
                        />
                    </Box>
                    <PostItemBottomButtonsWrapper
                        onToggleLike={onToggleLike}
                        isLiked={isLiked}
                        likesCount={likesCount}
                    />
                </Box>
                <ImageListItemBar
                    position="below"
                    sx={{
                        '& .MuiImageListItemBar-titleWrap': {
                            padding: 0
                        }
                    }}
                    title={
                        <PostItemTitle
                            showAuthor={showAuthor}
                            postId={postId}
                            title={title}
                            formattedTags={formattedTags}
                            authorId={authorId}
                            avatarURL={avatarURL}
                            username={username}
                        />
                    }
                />
            </ImageListItem>
        </>
    )
}

