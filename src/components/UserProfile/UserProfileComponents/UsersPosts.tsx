import {useParams} from "react-router-dom";
import React from "react";
import {extendedCollectionsApi, extendedPostsApi} from "../../../redux/api/rootApi";
import MiniLoader from "../../Loaders/MiniLoader";
import {Box, ImageList, Typography} from "@mui/material";
import usePostsActions from "../../../hooks/usePostsActions";
import useSx from "../../../hooks/useSx";
import postsStyles from "../../Posts/postsStyles";
import useMediaQueries from "../../../hooks/useMediaQueries";
import PostItem from "../../PostItem";
import useShortTranslation from "../../../hooks/useShortTranslation";
import MasonryPostsDrawer from "../../MasonryPostsDrawer";


export default function UsersPosts() {

    const {id = ''} = useParams<{ id: string }>()!


    const {data: initPosts, isLoading, isError} = extendedPostsApi.useGetPostsByUserIdQuery({id})

    const [posts, postsActions] = usePostsActions({initPosts})

    const styles = useSx(postsStyles)
    const {isSmallerThanLaptop, isSmallerThanTablet} = useMediaQueries()

    const postsListCols = isSmallerThanLaptop ? isSmallerThanTablet ? 2 : 3 : 5

    const t = useShortTranslation({componentNameKey: 'UserProfile.UsersPosts'})

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
        <Box
            sx={styles.container}
        >
            <MasonryPostsDrawer posts={posts} postsActions={postsActions}/>
        </Box>
    )
}