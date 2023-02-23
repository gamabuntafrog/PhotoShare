import extendedPostsApi from "../extendedPostsApi";
import useInfiniteScrollForQueryHook from "../../../hooks/useInfiniteScrollForQueryHook";
import useInfiniteScrollForSearchByTagsQuery from "../../../hooks/useInfiniteScrollForSearchByTagsQuery";

export default function useGetManyPostsByTagsWithInfiniteScroll({tags, id}: {tags: string[], id: string}) {

    const [getPosts, {data = [], isLoading, isError}] = extendedPostsApi.useLazyGetByTagsQuery()

    const {paginatedData, isEnd, ref} = useInfiniteScrollForSearchByTagsQuery({
        isLoading,
        data,
        isError,
        trigger: ({tags, arrayOfId}: {tags: string[], arrayOfId: string[]}) => {
            if (tags.length < 1) return
            getPosts({arrayOfId, tags, id})
        },
        tags
    })

    return {data: paginatedData, isLoading, error: isError, ref, isEnd}
}