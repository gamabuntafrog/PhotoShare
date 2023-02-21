import {IPost} from "./post";
import {ICollection, ICollectionWithPosts} from "./collection";

export interface IUserInPost {
    username: string,
    avatar: string | null,
    age: number,
    posts: string[],
    createdAt: string,
    updatedAt: string,
    _id: string,
}

export interface IUserInOnePost {
    username: string,
    avatar: string | null,
    subscribersCount: number,
    createdAt: string,
    _id: string,
}

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
    subscribes: string[],
    subscribers: string[],
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

export interface IPostForICollection {
    _id: string,
    image: string
}

export interface ICollectionForIUser {
    _id: string,
    title: string,
    posts: IPostForICollection[],
    authors: string[]
}

export interface IUserWithCollections {
    _id: string,
    username: string,
    avatar: string | null,
    email: string,
    subscribersCount: number,
    subscribesCount: number,
    postsCount: number,
    createdAt: string,
    canViewAllowedToViewCollections: boolean
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
    savedPosts: { post: string, collection: string }[],
    likedPosts: string[],
    subscribes: string[],
    subscribers: string[],
    createdAt: string,
    updatedAt: string,
    token: string,
    _id: string,
}

export interface IUserForAddInCollection {
    _id: string,
    username: string,
    avatar: string | null
}

export interface IUserForSearchBar {
    _id: string,
    username: string,
    avatar: string | null
}

export interface IUserForUsers {
    _id: string,
    username: string,
    avatar: string | null,
    postsCount: number,
    collectionsCount: number,
    subscribesCount: number,
    subscribersCount: number
}

export type notificationActions = 'subscribe' | 'unsubscribe' | 'likePost' | 'unlikePost'

export interface INotification {
    user: {
        _id: string,
        username?: string,
        avatarURL?: string | null
    },
    type: notificationActions,
    post: {
        _id: string,
        image?: string
    },
    checked: boolean
}