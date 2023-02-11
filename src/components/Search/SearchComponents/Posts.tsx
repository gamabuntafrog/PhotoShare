import {extendedPostsApi} from "../../../redux/api/rootApi";
import {useSearchParams} from "react-router-dom";
import {useDebounce} from "use-debounce";
import {Box, ImageList, Typography} from "@mui/material";
import MiniLoader from "../../Loaders/MiniLoader";
import usePostsActions from "../../../hooks/usePostsActions";
import PostItem from "../../PostItem";
import React from "react";
import useMediaQueries from "../../../hooks/useMediaQueries";
import useShortTranslation from "../../../hooks/useShortTranslation";
import useSx from "../../../hooks/useSx";
import searchStyles from "../searchStyles";


export default function Posts() {

    const [searchParams] = useSearchParams();

    const query = searchParams.get('query') || ''
    const [debouncedQuery] = useDebounce(query, 500)

    const {data: initPosts, isLoading} = extendedPostsApi.useSearchPostsQuery({
        title: debouncedQuery
    }, {
        skip: debouncedQuery.length < 2
    })
    console.log(debouncedQuery.length < 2)
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
                <Typography variant='h3' textAlign='center'>{t('notFound')}</Typography>
            </>
        )
    }

    if (posts.length === 0 && debouncedQuery.length < 2) {
        return (
            <>
                <Typography variant='h3' textAlign='center'>{t('enterTitle')}</Typography>
            </>
        )
    }

    return (
        <>
            <ImageList
                variant="masonry"
                sx={styles.list}
                gap={12}
                cols={postsListCols}
            >
                {posts.map((post) => <PostItem
                    postsActions={postsActions}
                    post={post}
                    key={post._id}
                />)}
            </ImageList>
        </>
    )
}