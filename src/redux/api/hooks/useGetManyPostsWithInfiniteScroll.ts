import useInfiniteScrollForQueryHook from "../../../hooks/useInfiniteScrollForQueryHook";
import extendedPostsApi from "../extendedPostsApi";
import {useState} from "react";

export default function useGetManyPostsWithInfiniteScroll() {

    const [trigger, {data = [], isLoading, isError}] = extendedPostsApi.useLazyGetManyQuery()
    const [isNextPostsLoading, setIsNextPostsLoading] = useState(false);

    const {paginatedData, isEnd, ref} = useInfiniteScrollForQueryHook({
        isLoading,
        data,
        isError,
        triggerCallback: () => {
            setIsNextPostsLoading(true)
            const arrayOfId = paginatedData.map((el) => el._id)
            trigger({arrayOfId}).then(() => setIsNextPostsLoading(false))
        }
    })

    return {data: paginatedData, isLoading, error: isError, ref, isEnd, isNextPostsLoading}
}