import {extendedPostsApi} from "../../../redux/api/rootApi";
import {useSearchParams} from "react-router-dom";
import {useDebounce} from "use-debounce";
import {Box, ImageList, Typography} from "@mui/material";
import MiniLoader from "../../Loaders/MiniLoader";
import usePostsActions from "../../../hooks/usePostsActions";
import React from "react";
import useMediaQueries from "../../../hooks/useMediaQueries";
import useShortTranslation from "../../../hooks/useShortTranslation";
import useSx from "../../../hooks/useSx";
import searchStyles from "../searchStyles";

const MasonryPostsDrawer = React.lazy(() => import( "../../MasonryPostsDrawer"));

export default function Posts() {

    const [searchParams] = useSearchParams();

    const query = searchParams.get('query') || ''
    const [debouncedQuery] = useDebounce(query, 500)

    const {data: initPosts, isLoading} = extendedPostsApi.useSearchPostsQuery({
        title: debouncedQuery
    }, {
        skip: debouncedQuery.length < 2
    })

    const [posts, postsActions] = usePostsActions({initPosts})

    const {isSmallerThanLaptop, isSmallerThanTablet} = useMediaQueries()
    const postsListCols = isSmallerThanLaptop ? isSmallerThanTablet ? 2 : 3 : 5

    const t = useShortTranslation({componentNameKey: 'Search.Posts'})

    const {posts: styles} = useSx(searchStyles)


    if (isLoading) {
        return (
            <>
                <MiniLoader/>
            </>
        )
    }

    if (!isLoading && posts.length === 0 && debouncedQuery.length > 2) {
        return (
            <>
                <Typography variant='h3' sx={styles.title} textAlign='center'>{t('notFound')}</Typography>
            </>
        )
    }

    if (posts.length === 0 && debouncedQuery.length < 2) {
        return (
            <>
                <Typography variant='h3' sx={styles.title} textAlign='center'>{t('enterTitle')}</Typography>
            </>
        )
    }

    return (
        <>
            <MasonryPostsDrawer posts={posts} postsActions={postsActions}/>
        </>
    )
}