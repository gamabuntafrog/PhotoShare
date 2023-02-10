import {extendedPostsApi} from "../../../redux/api/rootApi";
import {useSearchParams} from "react-router-dom";
import {useDebounce} from "use-debounce";
import {Box, ImageList, Typography} from "@mui/material";
import MiniLoader from "../../Loaders/MiniLoader";
import usePostsActions from "../../../hooks/usePostsActions";
import PostItem from "../../PostItem";
import React from "react";
import useMediaQueries from "../../../hooks/useMediaQueries";


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

    if (isLoading) {
        return (
            <Box>

                <MiniLoader/>
            </Box>
        )
    }

    if (!isLoading && posts.length === 0 && debouncedQuery.length > 2) {
        return (
            <Box>
                <Typography variant='h3' textAlign='center'>Not found</Typography>
            </Box>
        )
    }

    if (posts.length === 0 && debouncedQuery.length < 2) {
        return (
            <Box>
                <Typography variant='h3' textAlign='center'>Enter title</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{

        }}>
            <ImageList
                variant="masonry"
                sx={{
                    width: '95%',
                    mx: 'auto',
                    mb: 0,
                    mt: 2
                }}
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