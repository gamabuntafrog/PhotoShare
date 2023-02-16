import useInfiniteScrollForQueryHook from "../../../hooks/useInfiniteScrollForQueryHook";
import extendedPostsApi from "../extendedPostsApi";



export default function useGetPostsByUserIdWithInfiniteScroll({id}: {id: string}) {

    const [trigger, {data = [], isLoading, isError}] = extendedPostsApi.useLazyGetPostsByUserIdQuery()

    const {paginatedData, isEnd, ref} = useInfiniteScrollForQueryHook({
        isLoading,
        data,
        isError,
        triggerCallback: ({page}) => {
            const arrayOfId = paginatedData.map((el) => el._id)
            trigger({page, arrayOfId, id})
        }
    })

    return {data: paginatedData, isLoading, isError, ref, isEnd}
}