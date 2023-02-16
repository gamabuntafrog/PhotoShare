import { Box, Container, Typography} from "@mui/material";
import React from "react";
import usePostsActions from "../../hooks/usePostsActions";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useSx from "../../hooks/useSx";
import postsStyles from "./postsStyles";
import useShortTranslation from "../../hooks/useShortTranslation";
import StandardHelmet from "../StandardHelmet";
import useGetManyPostsWithInfiniteScroll from "../../redux/api/hooks/useGetManyPostsWithInfiniteScroll";

const MasonryPostsDrawer = React.lazy(() => import( "../MasonryPostsDrawer"));

export default function Posts() {

    const {data, isLoading: isPostsLoading, error: postsError, ref, isEnd} = useGetManyPostsWithInfiniteScroll()

    const [posts, postsActions] = usePostsActions({initPosts: data})

    const styles = useSx(postsStyles)

    const t = useShortTranslation({componentNameKey: 'Posts'})

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



