import {IPost} from "../../types/post";
import {IPostsActions} from "../../hooks/usePostsActions";
import useMediaQueries from "../../hooks/useMediaQueries";
import useSx from "../../hooks/useSx";
import postsStyles from "../Posts/postsStyles";
import sortItemsForMasonryList from "../../utils/sortItemsForMasonryList";
import {Box, ImageList} from "@mui/material";
import PostItem from "../PostItem";
import React from "react";


export default function MasonryPostsDrawer({posts, postsActions}: {posts: IPost[], postsActions: IPostsActions}) {
    const {isSmallerThanLaptop, isSmallerThanTablet} = useMediaQueries()
    const postsListCols = isSmallerThanLaptop ? isSmallerThanTablet ? 2 : 3 : 5

    const columns = Array.from({length: postsListCols})

    const styles = useSx(postsStyles)

    const sortedPostsForMasonryList = sortItemsForMasonryList(postsListCols, posts)

    return (
        <Box sx={{display: 'flex'}}>
            {columns.map((_, index) => {
                const postsLengthInOneColumn = Math.round(sortedPostsForMasonryList.length / postsListCols) || 1

                const slicedPosts = sortedPostsForMasonryList.slice(index * postsLengthInOneColumn, index * postsLengthInOneColumn + postsLengthInOneColumn)

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
        </Box>
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
// ЦЕ ПРИДУМАВ Я А НЕ CHATGPT!!!!!!!! (я серйозно)