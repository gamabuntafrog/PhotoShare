import styles from './Posts.module.css'
import {Avatar, Box, Container, IconButton, ImageList, List, ListItem, Typography} from "@mui/material";
import PostItem from "../PostItem/PostItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import React, {useEffect, useState} from "react";
import CreateCollectionModal from "../CreateCollectionModal";
import {extendedCollectionsApi, extendedPostsApi} from "../../redux/api/rootApi";
import usePostsActions from "../../hooks/usePostsActions";




export default function Posts() {
    const {
        data,
        isLoading: isPostsLoading,
        error: postsError,
        refetch
    } = extendedPostsApi.useGetManyQuery()

    const [posts, postsActions] = usePostsActions({initPosts: data})

    const theme = useTheme()
    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    if (isPostsLoading) {
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


    if (postsError) {
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
                {posts.map((post) => <PostItem
                    postsActions={postsActions}
                    openModal={openModal}
                    post={post}
                    key={post._id}
                />)}
            </ImageList>

        </Box>
    )
}

