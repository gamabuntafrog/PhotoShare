import extendedPostsApi from "../extendedPostsApi";
import useInfiniteScrollForSearchByIdQuery from "../../../hooks/useInfiniteScrollForSearchByIdQuery";



export default function useGetPostsByCollectionIdWithInfiniteScroll({id}: { id: string }) {

    const [trigger, {data = [], isLoading, isError}] = extendedPostsApi.useLazyGetPostsByCollectionIdQuery()

    const {paginatedData, ref, isEnd} = useInfiniteScrollForSearchByIdQuery({trigger, isLoading, isError, id, data})

    return {data: paginatedData, isLoading, isError, ref, isEnd}
}