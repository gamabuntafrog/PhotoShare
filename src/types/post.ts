import {IUser, IUserInOnePost, IUserInPost} from "./user";

export interface IReplyComment {
    _id: string,
    author: { _id: string, username: string, avatar: string },
    receiver: { _id: string, username: string},
    text: string,
}

export interface IComment {
    _id: string,
    author: { _id: string, username: string, avatar: string },
    text: string,
    replies: IReplyComment[]
}

export interface ISavesInfo {
    collectionId: string,
    title: string,
    isSaved: boolean
}

export interface IPost {
    savesCount: number,
    comments: IComment[],
    image: string,
    _id: string,
    author: IUserInPost,
    title: string,
    body: string,
    tags: string[],
    likesCount: number,
    createdAt: string,
    updatedAt: string,
    isLiked: boolean,
    isSomewhereSaved: boolean,
    savesInfo: ISavesInfo[]
}

export interface IOnePost {
    savesCount: number,
    comments: IComment[],
    image: string,
    _id: string,
    author: IUserInOnePost,
    title: string,
    body: string,
    tags: string[],
    likesCount: number,
    createdAt: string,
    updatedAt: string,
    isLiked: boolean,
    isSomewhereSaved: boolean,
    savesInfo: {
        collectionId: string,
        title: string,
        isSaved: boolean
    }[]
}
