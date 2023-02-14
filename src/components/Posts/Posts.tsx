import {Avatar, Box, Container, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {extendedPostsApi} from "../../redux/api/rootApi";
import usePostsActions from "../../hooks/usePostsActions";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useSx from "../../hooks/useSx";
import postsStyles from "./postsStyles";
import useShortTranslation from "../../hooks/useShortTranslation";
import useInfiniteScrollForQueryHook from "../../hooks/useInfiniteScrollForQueryHook";

import MasonryPostsDrawer from "../MasonryPostsDrawer";
import {Helmet} from "react-helmet";
import StandardHelmet from "../StandardHelmet";


function useGetManyPostsQueryWithInfiniteScroll() {
    const [page, setPage] = useState(1);

    const {
        data = [],
        isLoading,
        error
    } = extendedPostsApi.useGetManyQuery({page})

    const {paginatedData, isEnd, ref} = useInfiniteScrollForQueryHook({
        isLoading,
        data,
        setPage,
        page,
        isError: !!error
    })

    return {data: paginatedData, isLoading, error, ref, isEnd}
}


export default function Posts() {

    const {data, isLoading: isPostsLoading, error: postsError, ref, isEnd} = useGetManyPostsQueryWithInfiniteScroll()

    const [posts, postsActions] = usePostsActions({initPosts: data})

    const styles = useSx(postsStyles)

    const t = useShortTranslation({componentNameKey: 'Posts'})
    const tH = useShortTranslation({componentNameKey: 'Helmet'})

    if (isPostsLoading) return (
        <FullScreenLoader withMeta/>
    )

    if (postsError) {
        return (
            <>
                <StandardHelmet keyOfOther='error'/>
                <Container sx={styles.errorContainer}>
                    <Typography variant='h1' sx={{textAlign: 'center'}}>{t('error')}</Typography>
                </Container>
            </>
        )
    }

    return (
        <>
            <StandardHelmet keyOfTitle='posts'/>
            <Box
                sx={styles.container}
            >
                <MasonryPostsDrawer posts={posts} postsActions={postsActions}/>
            </Box>
            <div ref={ref}/>
            {isEnd && <Typography variant='h4' textAlign='center' sx={{my: 2}}>This is the end</Typography>}
        </>
    )
}



