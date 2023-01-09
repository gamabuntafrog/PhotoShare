
import {IPost} from "./post";
import {ICollection} from "./collection";

export interface IToggleLikeProps {
    isPostLiked: boolean,
    likesCount: number,
    postId: string,
}

export type useToggleLikeReturnValue = readonly [{readonly isLiked: boolean, readonly likes: number}, (() => Promise<void>)]

export type useToggleLikeType = (args: IToggleLikeProps) => useToggleLikeReturnValue

export interface IToggleSaveProps {
    savesCount: number,
    postId: string,
}

export type savesInfoType = {postId: string, savedInCollectionTitle: string, collectionId: string, isSaved: boolean}

export type useToggleSaveReturnValue = readonly [{readonly isSaved: boolean, readonly saves: number, readonly savesInfo: savesInfoType[]}, (({collectionId}: {collectionId: string, isSavedInCollection: boolean}) => Promise<void>), ((newCollection: ICollection) => void)]

export type useToggleSaveType = (args: IToggleSaveProps) => useToggleSaveReturnValue
