import {IOnePost} from "../types/types";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import extendedPostsApi from "../redux/api/extendedPostsApi";
import extendedCollectionsApi from "../redux/api/extendedCollectionsApi";

export interface IUsePostProps {
    initPost: IOnePost | undefined,
}

export type toggleLikeOfOnePostType = (id: string, isLiked: boolean) => Promise<void>
export type toggleSaveOfOnePostType = (postId: string, collectionId: string, isSaved: boolean) => Promise<void>
export type updateSavesInfoOfOnePost = (title: string, collectionId: string, postId: string) => Promise<void>
export type deleteOnePostType = (id: string) => Promise<void>

export interface IPostActions {
    readonly toggleLike: toggleLikeOfOnePostType,
    readonly toggleSave: toggleSaveOfOnePostType,
    readonly updateSavesInfo: updateSavesInfoOfOnePost,
    readonly deletePost: deleteOnePostType
}

export type usePostActionsReturnValue = readonly [IOnePost | undefined, IPostActions]

const usePostActions = ({initPost}: IUsePostProps): usePostActionsReturnValue => {
    const [unlikePost] = extendedPostsApi.useUnlikeOneByIdMutation()
    const [likePost] = extendedPostsApi.useLikeOneByIdMutation()
    const [unsavePost] = extendedCollectionsApi.useDeletePostFromCollectionMutation()
    const [savePost] = extendedCollectionsApi.useSavePostInCollectionMutation()
    const [deletePostFn] = extendedPostsApi.useDeletePostMutation()
    const navigate = useNavigate()

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

            setPost(prev => {
                if (!prev) return prev

                const changedSavesInfo = post.savesInfo.map((info) => {
                    if (info.collectionId === collectionId) {
                        return {isSaved: !isSaved, collectionId: info.collectionId, title: info.title}
                    }
                    return info
                })

                const isSomewhereSaved = changedSavesInfo.some(({isSaved}) => !!isSaved)

                return {...post, savesInfo: changedSavesInfo, isSomewhereSaved}
            })
        } catch (e) {
            console.log(e)
        }
    }

    const updateSavesInfo = async (title: string, collectionId: string, postId: string) => {
        if (!post) return

        try {
            await savePost({postId, collectionId}).unwrap()

            setPost(prev => {
                if (!prev) return prev

                const changedSavesInfo = [...post.savesInfo,  {title, collectionId, isSaved: false}].map((info) => {
                    if (info.collectionId === collectionId) {
                        return {isSaved: !info.isSaved, collectionId: info.collectionId, title: info.title}
                    }
                    return info
                })

                const isSomewhereSaved = changedSavesInfo.some(({isSaved}) => !!isSaved)

                return {...post, savesInfo: changedSavesInfo, isSomewhereSaved}
            })
        } catch (e) {
            console.log(e)
        }
    }

    const deletePost = async (id: string) => {
        await deletePostFn({id}).then(() => navigate('/'))
    }

    return [post, {toggleLike, toggleSave, updateSavesInfo, deletePost}] as const
}

export default usePostActions