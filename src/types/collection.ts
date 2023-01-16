import {IUser, IUserInPost} from "./user";
import {IPost} from "./post";

export interface ICollection {
    author: string,
    tags: string[],
    posts: string[],
    title: string,
    _id: string
}

export interface ICollectionWithPosts {
    author: IUserInPost,
    tags: string[],
    posts: IPost[],
    title: string,
    _id: string
}