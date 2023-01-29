import {IUser, IUserInPost} from "./user";
import {IPost} from "./post";

export interface ICollection {
    authors: string[],
    tags: string[],
    posts: string[],
    title: string,
    _id: string
}

type ROLES = 'ADMIN' | 'AUTHOR'

export interface IAuthorOfCollection {
    username: string,
    avatar: string | null,
    _id: string,
    subscribersCount: number,
    isAuthor: boolean,
    isAdmin: boolean
}

export interface ICollectionWithPosts {
    authors: IAuthorOfCollection[],
    tags: string[],
    posts: IPost[],
    title: string,
    _id: string,
    isAuthor: boolean,
    isAdmin: boolean,
    isPrivate: boolean
}