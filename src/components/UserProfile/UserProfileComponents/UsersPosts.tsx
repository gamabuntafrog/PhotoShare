import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import MiniLoader from "../../Loaders/MiniLoader";
import {Box, ImageList, Typography} from "@mui/material";
import usePostsActions from "../../../hooks/usePostsActions";
import useSx from "../../../hooks/useSx";
import postsStyles from "../../Posts/postsStyles";
import useShortTranslation from "../../../hooks/useShortTranslation";
import MasonryPostsDrawer from "../../MasonryPostsDrawer";
import useGetPostsByUserIdWithInfiniteScroll from "../../../redux/api/hooks/useGetPostsByUserIdWithInfiniteScroll";
import extendedPostsApi from "../../../redux/api/extendedPostsApi";


export default function UsersPosts() {

    const {id = ''} = useParams<{ id: string }>()!

    const {data, isLoading, isEnd, isError, ref} = useGetPostsByUserIdWithInfiniteScroll({id})
    // const {data = [], isLoading, isError} = extendedPostsApi.useGetPostsByUserIdQuery({id, page: 1, arrayOfId: []})
    const [posts, postsActions] = usePostsActions({initPosts: data})
    const styles = useSx(postsStyles)

    const t = useShortTranslation({componentNameKey: 'UserProfile.UserPosts'})

    if (isLoading) {
        return <MiniLoader/>
    }

    if (isError) {
        return <Typography variant='h1'>{t('error')}</Typography>
    }

    if (!posts) {
        return <Typography variant='h1'>{t('noPostsMessage')}</Typography>
    }

    return (
        <>
            <Box
                sx={styles.container}
            >
                <MasonryPostsDrawer posts={posts} postsActions={postsActions}/>
            </Box>
            <div ref={ref} />
        </>
    )
    // return <div/>
}