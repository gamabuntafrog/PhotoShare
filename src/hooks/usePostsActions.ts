import { useEffect, useState } from 'react'
import extendedCollectionsApi from '../redux/api/extendedCollectionsApi'
import extendedPostsApi from '../redux/api/extendedPostsApi'
import { IPost } from '../types/types'

export interface IUsePostsProps {
  initPosts: IPost[] | undefined
}

export type toggleLikeType = (id: string, isLiked: boolean) => Promise<void>
export type toggleSaveType = (
  postId: string,
  collectionId: string,
  isSaved: boolean
) => Promise<void>
export type updateSavesInfo = (title: string, collectionId: string, postId: string) => Promise<void>

export interface IPostsActions {
  readonly toggleLike: toggleLikeType
  readonly toggleSave: toggleSaveType
  readonly updateSavesInfo: updateSavesInfo
}

export type usePostsActionsReturnValue = readonly [IPost[], IPostsActions]

const usePostsActions = ({ initPosts }: IUsePostsProps): usePostsActionsReturnValue => {
  const [unlikePost] = extendedPostsApi.useUnlikeOneByIdMutation()
  const [likePost] = extendedPostsApi.useLikeOneByIdMutation()
  const [unsavePost] = extendedCollectionsApi.useDeletePostFromCollectionMutation()
  const [savePost] = extendedCollectionsApi.useSavePostInCollectionMutation()

  const [posts, setPosts] = useState([] as IPost[])

  useEffect(() => {
    if (initPosts) {
      setPosts(initPosts)
    }
  }, [JSON.stringify(initPosts)])

  const toggleLike = async (id: string, isLiked: boolean) => {
    try {
      setPosts((prev) =>
        prev.map((post) => {
          if (post._id === id) {
            let { likesCount: initLikesCount, isLiked } = post

            const likesCount = isLiked ? --initLikesCount : ++initLikesCount

            return { ...post, isLiked: !isLiked, likesCount }
          } else {
            return post
          }
        })
      )

      if (isLiked) {
        await unlikePost({ id }).unwrap()
      } else {
        await likePost({ id }).unwrap()
      }
    } catch (e) {
      console.log(e)

      setPosts((prev) =>
        prev.map((post) => {
          if (post._id === id) {
            let { likesCount: initLikesCount, isLiked } = post

            const likesCount = isLiked ? --initLikesCount : ++initLikesCount

            return { ...post, isLiked: !isLiked, likesCount }
          } else {
            return post
          }
        })
      )
    }
  }

  const toggleSave = async (postId: string, collectionId: string, isSaved: boolean) => {
    try {
      setPosts((prev) =>
        prev.map((post) => {
          if (post._id === postId) {
            let { savesCount, savesInfo } = post

            const changedSavesInfo = savesInfo.map((info) => {
              if (info.collectionId === collectionId) {
                return { isSaved: !isSaved, collectionId: info.collectionId, title: info.title }
              }
              return info
            })

            const isSomewhereSaved = changedSavesInfo.some(({ isSaved }) => !!isSaved)

            return { ...post, isSomewhereSaved, savesCount, savesInfo: changedSavesInfo }
          } else {
            return post
          }
        })
      )

      if (isSaved) {
        await unsavePost({ postId, collectionId }).unwrap()
      } else {
        await savePost({ postId, collectionId }).unwrap()
      }
    } catch (e) {
      console.log(e)

      setPosts((prev) =>
        prev.map((post) => {
          if (post._id === postId) {
            let { savesCount, savesInfo } = post

            const changedSavesInfo = savesInfo.map((info) => {
              if (info.collectionId === collectionId) {
                return { isSaved: !isSaved, collectionId: info.collectionId, title: info.title }
              }
              return info
            })

            const isSomewhereSaved = changedSavesInfo.some(({ isSaved }) => !!isSaved)

            return { ...post, isSomewhereSaved, savesCount, savesInfo: changedSavesInfo }
          } else {
            return post
          }
        })
      )
    }
  }

  const updateSavesInfo = async (title: string, collectionId: string, postId: string) => {
    try {
      setPosts((prev) =>
        prev.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              isSomewhereSaved: true,
              savesInfo: [...post.savesInfo, { title, collectionId, isSaved: true }]
            }
          }

          return {
            ...post,
            savesInfo: [...post.savesInfo, { title, collectionId, isSaved: false }]
          }
        })
      )

      await savePost({ postId, collectionId }).unwrap()
    } catch (e) {
      console.log(e)

      setPosts((prev) =>
        prev.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              isSomewhereSaved: true,
              savesInfo: [...post.savesInfo, { title, collectionId, isSaved: false }]
            }
          }

          return {
            ...post,
            savesInfo: [...post.savesInfo, { title, collectionId, isSaved: true }]
          }
        })
      )
    }
  }

  return [posts, { toggleLike, toggleSave, updateSavesInfo }] as const
}

export default usePostsActions
