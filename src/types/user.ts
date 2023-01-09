import {IPost} from "./post";
import {ICollection, ICollectionWithPosts} from "./collection";

export interface IUser {
    username: string,
    email: string,
    avatar: {
        url: string | null,
        id: string | null
    },
    age: number,
    posts: IPost[] | string[],
    savedPosts: IPost[],
    likedPosts: IPost[],
    subscribes: IUser[],
    subscribers: IUser[],
    createdAt: string,
    updatedAt: string,
    token: string,
    _id: string,
}

export interface IUserWithPosts {
    username: string,
    email: string,
    avatar: {
        url: string | null,
        id: string | null
    },
    age: number,
    posts: IPost[],
    savedPosts: string[],
    likedPosts: string[],
    subscribes: string[],
    subscribers: string[],
    createdAt: string,
    updatedAt: string,
    token: string,
    _id: string,
    collections: ICollectionWithPosts[]
}

export interface ICurrentUser {
    username: string,
    email: string,
    avatar: {
        url: string | null,
        id: string | null
    },
    collections: string[]
    age: number,
    posts: string[],
    savedPosts: {post: string, collection: string}[],
    likedPosts: string[],
    subscribes: string[],
    subscribers: string[],
    createdAt: string,
    updatedAt: string,
    token: string,
    _id: string,
}

