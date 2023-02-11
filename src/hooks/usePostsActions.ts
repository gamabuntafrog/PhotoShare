import {extendedCollectionsApi, extendedPostsApi} from "../redux/api/rootApi";
import {useEffect, useState} from "react";
import {IPost, ISavesInfo} from "../types/post";
import useMediaQueries from "./useMediaQueries";
import sortItemsForMasonryList from "../utils/sortItemsForMasonryList";

export interface IUsePostsProps {
    initPosts: IPost[] | undefined,
}

export type toggleLikeType = (id: string, isLiked: boolean) => Promise<void>
export type toggleSaveType = (postId: string, collectionId: string, isSaved: boolean) => Promise<void>
export type updateSavesInfo = (title: string, collectionId: string, postId: string) => Promise<void>

export interface IPostsActions {
    readonly toggleLike: toggleLikeType,
    readonly toggleSave: toggleSaveType,
    readonly updateSavesInfo: updateSavesInfo
}

export type usePostsActionsReturnValue = readonly [IPost[], IPostsActions]

const usePostsActions = ({initPosts}: IUsePostsProps): usePostsActionsReturnValue => {
    const [unlikePost] = extendedPostsApi.useUnlikeOneByIdMutation()
    const [likePost] = extendedPostsApi.useLikeOneByIdMutation()
    const [unsavePost] = extendedCollectionsApi.useDeletePostFromCollectionMutation()
    const [savePost] = extendedCollectionsApi.useSavePostInCollectionMutation()

    const [posts, setPosts] = useState(initPosts || []);

    useEffect(() => {
        if (initPosts) {
            setPosts(initPosts)
        }
    }, [initPosts]);

    const toggleLike = async (id: string, isLiked: boolean) => {
        try {
            if (isLiked) {
                await unlikePost({id}).unwrap()
            } else {
                await likePost({id}).unwrap()
            }

            setPosts(prev => prev.map((post) => {
                    if (post._id === id) {
                        let {likesCount: initLikesCount, isLiked} = post

                        const likesCount = isLiked ? --initLikesCount : ++initLikesCount

                        return {...post, isLiked: !isLiked, likesCount}
                    } else {
                        return post
                    }
                })
            )
        } catch (e) {
            console.log(e)
        }
    }

    const toggleSave = async (postId: string, collectionId: string, isSaved: boolean) => {
        try {
            if (isSaved) {
                await unsavePost({postId, collectionId}).unwrap()
            } else {
                await savePost({postId, collectionId}).unwrap()
            }

            setPosts(prev => prev.map((post) => {
                    if (post._id === postId) {
                        let {savesCount, savesInfo} = post

                        const changedSavesInfo = savesInfo.map((info) => {
                            if (info.collectionId === collectionId) {
                                return {isSaved: !isSaved, collectionId: info.collectionId, title: info.title}
                            }
                            return info
                        })

                        const isSomewhereSaved = changedSavesInfo.some(({isSaved}) => !!isSaved)

                        return {...post, isSomewhereSaved, savesCount, savesInfo: changedSavesInfo}
                    } else {
                        return post
                    }
                })
            )
        } catch (e) {
            console.log(e)
        }
    }

    const updateSavesInfo = async (title: string, collectionId: string, postId: string) => {
        try {
            await savePost({postId, collectionId}).unwrap()

            setPosts(prev => prev.map((post) => {
                if (post._id === postId) {
                    return {...post, isSomewhereSaved: true, savesInfo: [...post.savesInfo, {title, collectionId, isSaved: true}]}
                }

                return {...post, savesInfo: [...post.savesInfo, {title, collectionId, isSaved: false}]}
            }))

        } catch (e) {
            console.log(e)
        }
    }

    const {isSmallerThanLaptop, isSmallerThanTablet} = useMediaQueries()
    const postsListCols = isSmallerThanLaptop ? isSmallerThanTablet ? 2 : 3 : 5

    const sortedPostsForMasonryList = sortItemsForMasonryList(postsListCols, posts)

    // console.log('notSorted: ', posts)
    // console.log('sorted: ', sortedPostsForMasonryList)

    return [sortedPostsForMasonryList, {toggleLike, toggleSave, updateSavesInfo}] as const
}

export default usePostsActions