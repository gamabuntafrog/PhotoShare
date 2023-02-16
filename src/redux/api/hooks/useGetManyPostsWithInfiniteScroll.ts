import useInfiniteScrollForQueryHook from "../../../hooks/useInfiniteScrollForQueryHook";
import extendedPostsApi from "../extendedPostsApi";

export default function useGetManyPostsWithInfiniteScroll() {

    const [trigger, {data = [], isLoading, isError}] = extendedPostsApi.useLazyGetManyQuery()

    const {paginatedData, isEnd, ref} = useInfiniteScrollForQueryHook({
        isLoading,
        data,
        isError,
        triggerCallback: ({page}) => {
            const arrayOfId = paginatedData.map((el) => el._id)
            trigger({page, arrayOfId})
        }
    })

    return {data: paginatedData, isLoading, error: isError, ref, isEnd}
}