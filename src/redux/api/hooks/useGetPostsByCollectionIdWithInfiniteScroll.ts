import extendedPostsApi from "../extendedPostsApi";
import useInfiniteScrollForSearchBuIdQuery from "../../../hooks/useInfiniteScrollForSearchBuIdQuery";



export default function useGetPostsByCollectionIdWithInfiniteScroll({id}: { id: string }) {

    const [trigger, {data = [], isLoading, isError}] = extendedPostsApi.useLazyGetPostsByCollectionIdQuery()

    const {paginatedData, ref, isEnd} = useInfiniteScrollForSearchBuIdQuery({trigger, isLoading, isError, id, data})

    return {data: paginatedData, isLoading, isError, ref, isEnd}
}