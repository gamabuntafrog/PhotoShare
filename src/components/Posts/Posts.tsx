import cssStyles from './Posts.module.css'
import {Avatar, Box, Container, IconButton, ImageList, List, ListItem, Typography} from "@mui/material";
import PostItem from "../PostItem/PostItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import React, {useEffect, useState} from "react";
import CreateCollectionModal from "../CreateCollectionModal";
import {extendedCollectionsApi, extendedPostsApi} from "../../redux/api/rootApi";
import usePostsActions from "../../hooks/usePostsActions";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useSx from "../../hooks/useSx";
import postsStyles from "./postsStyles";
import useMediaQueries from "../../hooks/useMediaQueries";




export default function Posts() {

    const {
        data,
        isLoading: isPostsLoading,
        error: postsError,
    } = extendedPostsApi.useGetManyQuery()

    const [posts, postsActions] = usePostsActions({initPosts: data})



    const styles = useSx(postsStyles)

    const {isSmallerThanLaptop, isSmallerThanTablet} = useMediaQueries()

    const postsListCols = isSmallerThanLaptop ? isSmallerThanTablet ? 2 : 3 : 5

    if (isPostsLoading) return <FullScreenLoader/>

    if (postsError) {
        return (
            <Container className={cssStyles.posts} sx={{
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
        <Box
            sx={styles.container}
        >
            <ImageList
                variant="masonry"
                sx={styles.postsList}
                gap={12}
                cols={postsListCols}
            >
                {posts.map((post) => <PostItem
                    postsActions={postsActions}
                    post={post}
                    key={post._id}
                />)}
            </ImageList>

        </Box>
    )
}

