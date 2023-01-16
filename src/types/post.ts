import {IUser, IUserInPost} from "./user";

export interface IComment {
    author: IUser,
    text: string,
    createdAt: string,
    updatedAt: string
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
    savesInfo: {
        collectionId: string,
        title: string,
        isSaved: boolean
    }[]
}

