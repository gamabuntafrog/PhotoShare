import extendedPostsApi from "../extendedPostsApi";
import useInfiniteScrollForQueryHook from "../../../hooks/useInfiniteScrollForQueryHook";

export default function useGetManyPostsByTitleWithInfiniteScroll({title}: {title: string}) {

    const [trigger, {data = [], isLoading, isError}] = extendedPostsApi.useLazySearchPostsQuery()

    const {paginatedData, isEnd, ref} = useInfiniteScrollForQueryHook({
        isLoading,
        data,
        isError,
        triggerCallback: ({page}) => {
            if (title.length < 2) return

            const arrayOfId = paginatedData.map((el) => el._id)
            trigger({page, arrayOfId, title})
        }
    })

    return {data: paginatedData, isLoading, error: isError, ref, isEnd}
}