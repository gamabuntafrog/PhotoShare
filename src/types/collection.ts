import {IUser, IUserInPost} from "./user";
import {IPost} from "./post";

export interface ICollection {
    authors: string[],
    tags: string[],
    posts: string[],
    title: string,
    _id: string
}

export interface IAuthorOfCollection extends IUserInPost {
    subscribersCount: number
}

export interface ICollectionWithPosts {
    authors: IAuthorOfCollection[],
    tags: string[],
    posts: IPost[],
    title: string,
    _id: string
}