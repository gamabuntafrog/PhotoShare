import styles from './Posts.module.css'
import {Avatar, Box, Container, IconButton, ImageList, List, ListItem, Typography} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import PostItem from "../PostItem/PostItem";
import {useAppSelector} from "../../redux/hooks";
import {postsApi} from "../../redux/api/postsApi";
import {IUserSliceAuthorized} from "../../types/userSlice";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {collectionsApi} from "../../redux/api/collectionsApi";
import React, {useEffect, useState} from "react";
import useToggleLikeOfPostCreator from "../../hooks/useToggleLikeOfPostCreator";
import useToggleSaveOfPostCreator from "../../hooks/useToggleSaveOfPostCreator";
import CreateCollectionModal from "../CreateCollectionModal";


export default function Posts() {
    const {id = ''} = useParams<{ id: string }>()!

    const {user, token} = useAppSelector((state) => state.userReducer) as IUserSliceAuthorized
    const {savedPosts, _id: currentUserId} = user

    const {
        data: allPosts,
        isLoading: isAllPostsLoading,
        error: allPostsError,
    } = postsApi.useFetchAllPostsQuery()


    const useToggleLike = useToggleLikeOfPostCreator({token, currentUserId})
    const [{isLoading, refetch}, useToggleSave] = useToggleSaveOfPostCreator({token})

    const theme = useTheme()
    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    console.log(allPosts, allPostsError)

    if (isAllPostsLoading || isLoading) {
        return (
            <Container className={styles.posts} sx={{
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                maxHeight: '90vh'
            }}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>Loading...</Typography>
            </Container>
        )
    }


    if (allPostsError || !allPosts) {
        return (
            <Container className={styles.posts} sx={{
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                maxHeight: '90vh'
            }}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>Error</Typography>
            </Container>
        )
    }
    return (
        <Box sx={{overflowY: 'auto', height: '91vh'}}>
            <CreateCollectionModal refetch={refetch} closeModal={closeModal} isModalOpen={isModalOpen}/>

            <ImageList
                variant="masonry"
                sx={{
                    width: '95%',
                    py: 2,
                    mx: 'auto'
                }}
                gap={12}
                cols={isSmallerLaptop ? isSmallerTablet ? 2 : 3 : 5}
            >
                {allPosts.map((post) => <PostItem
                    useToggleSave={useToggleSave}
                    useToggleLike={useToggleLike}
                    openModal={openModal}
                    post={post}
                    key={post._id}
                />)}
            </ImageList>

        </Box>
    )
}

