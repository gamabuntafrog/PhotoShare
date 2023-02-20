import extendedPostsApi from "../extendedPostsApi";
import useInfiniteScrollForSearchBuIdQuery from "../../../hooks/useInfiniteScrollForSearchBuIdQuery";



export default function useGetPostsByUserIdWithInfiniteScroll({id}: { id: string }) {

    const [trigger, {data = [], isLoading, isError}] = extendedPostsApi.useLazyGetPostsByUserIdQuery()

    const {paginatedData, ref, isEnd} = useInfiniteScrollForSearchBuIdQuery({trigger, isLoading, isError, id, data})

    return {data: paginatedData, isLoading, isError, ref, isEnd}
}