import {IOnePost, IPost} from "../types/post";
import {extendedCollectionsApi, extendedPostsApi} from "../redux/api/rootApi";
import {useEffect, useState} from "react";

export interface IUsePostProps {
    initPost: IOnePost | undefined,
}

export type toggleLikeOfOnePostType = (id: string, isLiked: boolean) => Promise<void>
export type toggleSaveOfOnePostType = (postId: string, collectionId: string, isSaved: boolean) => Promise<void>
export type updateSavesInfoOfOnePost = (title: string, collectionId: string) => void

export interface IPostActions {
    readonly toggleLike: toggleLikeOfOnePostType,
    readonly toggleSave: toggleSaveOfOnePostType,
    readonly updateSavesInfo: updateSavesInfoOfOnePost
}

export type usePostActionsReturnValue = readonly [IOnePost | undefined, IPostActions]

const usePostActions = ({initPost}: IUsePostProps): usePostActionsReturnValue => {
    const [unlikePost] = extendedPostsApi.useUnlikeOneByIdMutation()
    const [likePost] = extendedPostsApi.useLikeOneByIdMutation()
    const [unsavePost] = extendedCollectionsApi.useDeletePostFromCollectionMutation()
    const [savePost] = extendedCollectionsApi.useSavePostInCollectionMutation()

    const [post, setPost] = useState(initPost);

    useEffect(() => {
        if (initPost) {
            setPost(initPost)
        }
    }, [initPost]);

    const toggleLike = async (id: string, isLiked: boolean) => {
        try {
            if (!post) return

            if (isLiked) {
                await unlikePost({id}).unwrap()
            } else {
                await likePost({id}).unwrap()
            }

            let likesCount = post.likesCount
            likesCount = isLiked ? --likesCount : ++likesCount

            setPost({...post, isLiked: !post.isLiked, likesCount})
        } catch (e) {
            console.log(e)
        }
    }

    const toggleSave = async (postId: string, collectionId: string, isSaved: boolean) => {
        try {
            if (!post) return

            if (isSaved) {
                await unsavePost({postId, collectionId}).unwrap()
            } else {
                await savePost({postId, collectionId}).unwrap()
            }

            const changedSavesInfo = post.savesInfo.map((info) => {
                if (info.collectionId === collectionId) {
                    return {isSaved: !info.isSaved, collectionId: info.collectionId, title: info.title}
                }
                return info
            })

            const isSomewhereSaved = changedSavesInfo.some(({isSaved}) => !!isSaved)

            setPost({...post, savesInfo: changedSavesInfo, isSomewhereSaved})
        } catch (e) {
            console.log(e)
        }
    }

    const updateSavesInfo = (title: string, collectionId: string) => {
        if (!post) return

        setPost({...post, savesInfo: [...post.savesInfo, {title, collectionId, isSaved: false}]})
    }

    return [post, {toggleLike, toggleSave, updateSavesInfo}] as const
}

export default usePostActions