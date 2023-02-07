import {Avatar, Box, Container, IconButton, ImageList, Typography} from "@mui/material";
import PostItem from "../PostItem/PostItem";
import React, {useEffect, useState} from "react";
import {extendedCollectionsApi, extendedPostsApi} from "../../redux/api/rootApi";
import usePostsActions from "../../hooks/usePostsActions";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useSx from "../../hooks/useSx";
import postsStyles from "./postsStyles";
import useMediaQueries from "../../hooks/useMediaQueries";
import useShortTranslation from "../../hooks/useShortTranslation";




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

    const t = useShortTranslation({componentNameKey: 'Posts'})

    if (isPostsLoading) return <FullScreenLoader/>

    if (postsError) {
        return (
            <Container sx={styles.errorContainer}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>{t('error')}</Typography>
            </Container>
        )
    }

    if (posts.length === 0) {
        return (
            <Container sx={styles.errorContainer}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>{t('noPostsMessage')}</Typography>
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

