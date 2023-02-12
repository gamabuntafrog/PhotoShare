import {Avatar, Box, Container, IconButton, ImageList, Typography} from "@mui/material";
import PostItem from "../PostItem/PostItem";
import React, {useEffect, useState} from "react";
import {extendedCollectionsApi, extendedPostsApi} from "../../redux/api/rootApi";
import usePostsActions, {IPostsActions} from "../../hooks/usePostsActions";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useSx from "../../hooks/useSx";
import postsStyles from "./postsStyles";
import useMediaQueries from "../../hooks/useMediaQueries";
import useShortTranslation from "../../hooks/useShortTranslation";
import {useInView} from "react-intersection-observer";
import useInfiniteScrollForQueryHook from "../../hooks/useInfiniteScrollForQueryHook";
import {IPost} from "../../types/post";


function useGetManyPostsQueryWithInfiniteScroll() {
    const [page, setPage] = useState(1);

    const {
        data = [],
        isLoading,
        error
    } = extendedPostsApi.useGetManyQuery({page})

    const {paginatedData, isEnd, ref} = useInfiniteScrollForQueryHook({isLoading, data, setPage, isError: !!error})

    return {data: paginatedData, isLoading, error, ref, isEnd}
}



export default function Posts() {

    const {data, isLoading: isPostsLoading, error: postsError, ref, isEnd} = useGetManyPostsQueryWithInfiniteScroll()

    const [posts, postsActions] = usePostsActions({initPosts: data})

    // useEffect(() => {
    //     console.log('changed')
    // }, [data]);


    const styles = useSx(postsStyles)

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
        <>
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

function MasonryPostsDrawer({posts, postsActions}: {posts: IPost[], postsActions: IPostsActions}) {
    const {isSmallerThanLaptop, isSmallerThanTablet} = useMediaQueries()
    const postsListCols = isSmallerThanLaptop ? isSmallerThanTablet ? 2 : 3 : 5

    const columns = Array.from({length: postsListCols})

    const styles = useSx(postsStyles)

    return (
        <>
            {columns.map((_, index) => {
                const postsLengthInOneColumn = Math.ceil(posts.length / postsListCols)
                const slicedPosts = posts.slice(index * postsLengthInOneColumn, index * postsLengthInOneColumn + postsLengthInOneColumn)

                return (
                    <ImageList
                        variant="masonry"
                        sx={styles.postsList}
                        gap={12}
                        key={index}
                        cols={1}
                    >
                        {slicedPosts.map((post) => <PostItem
                            postsActions={postsActions}
                            post={post}
                            key={post._id}
                        />)}
                    </ImageList>
                )
            })}
        </>
    )
}

// 1 ImageList = 1 column

// for example: if postsListCols = 3
// html: first column second column third column
//             image         image        image
//             image         image        image
//             image         image        image
//             image         image        image
//etc...