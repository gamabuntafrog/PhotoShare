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

export interface IViewerOfCollection {
    username: string,
    avatar: string | null,
    _id: string,
}

export interface ICollectionWithPosts {
    authors: IAuthorOfCollection[],
    viewers: IViewerOfCollection[],
    tags: string[],
    posts: IPost[],
    title: string,
    _id: string,
    isPrivate: boolean,

}

export interface IFullCollection {
    collection: ICollectionWithPosts,
    currentUserStatus: {
        isAuthor: boolean,
        isAdmin: boolean
    }
}