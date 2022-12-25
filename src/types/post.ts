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
    _id: string,
    author: IUser,
    title: string,
    body: string,
    tags: string[],
    usersLiked: (IUser | null)[] ,
    likesCount: number,
    createdAt: string,
    updatedAt: string
}