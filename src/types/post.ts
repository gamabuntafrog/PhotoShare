import {IUser} from "./user";

export interface IComment {
    author: IUser,
    text: string,
    createdAt: string,
    updatedAt: string
}

export interface IPost {
    savesCount: number,
    comments: IComment[],
    image: {
        url: string,
        id: string
    },
    _id: string,
    author: IUser,
    title: string,
    body: string,
    tags: string[],
    usersLiked: string[],
    savedInCollections: string[],
    likesCount: number,
    createdAt: string,
    updatedAt: string
}