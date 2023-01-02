import {
    IToggleLikeProps,
    useToggleLikeReturnValue
} from "../types/types";
import {useState} from "react";
import {postsApi} from "../redux/api/postsApi";


export default function useToggleLikeOfPostCreator({token}: { token: string }) {

    const [likePost] = postsApi.useLikePostMutation()
    const [unlikePost] = postsApi.useUnlikePostMutation()

    return function useToggleLike({isPostLiked, likesCount, postId}: IToggleLikeProps): useToggleLikeReturnValue {

        const [{isLiked, likes}, setLikesState] = useState({isLiked: isPostLiked, likes: likesCount});

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
            }
        }

        return [{isLiked, likes}, toggleLike] as const
    }
}

