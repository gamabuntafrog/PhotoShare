import {
    IToggleLikeProps,
    useToggleLikeReturnValue
} from "../types/types";
import {useEffect, useState} from "react";
import {postsApi} from "../redux/api/postsApi";
import {useAppDispatch} from "../redux/hooks";
import {IResponseNotification, pushResponse} from "../redux/slices/responseNotificationsSlice";


export default function useToggleLikeOfPostCreator({token, currentUserId}: { token: string, currentUserId: string }) {

    const [likePost] = postsApi.useLikePostMutation()
    const [unlikePost] = postsApi.useUnlikePostMutation()
    const dispatch = useAppDispatch()

    return function useToggleLike({usersLiked, likesCount, postId, skip}: IToggleLikeProps): useToggleLikeReturnValue {
        const findIsPostLiked = usersLiked.some((id) => id === currentUserId)

        const [{isLiked, likes}, setLikesState] = useState({isLiked: findIsPostLiked, likes: likesCount});

        useEffect(() => {
            setLikesState({isLiked: findIsPostLiked, likes: likesCount})
        }, [skip]);


        const incLike = () => setLikesState(({isLiked, likes}) => {
            return {likes: ++likes, isLiked: !isLiked}
        })

        const decLike = () => setLikesState(({isLiked, likes}) => {
            return {likes: --likes, isLiked: !isLiked}
        })

        const toggleLike = async () => {
            try {
                if (isLiked) {
                    await unlikePost({postId, token}).unwrap()

                    decLike()
                } else {
                    await likePost({postId, token}).unwrap()

                    incLike()
                }
            } catch (e) {
                console.log(e)
                dispatch(pushResponse(e as IResponseNotification))
            }
        }


        return [{isLiked, likes}, toggleLike] as const
    }
}

