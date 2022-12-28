import {IUser} from "./user";
import {IPost} from "./post";

export interface ICollection {
    author: string,
    tags: string[],
    posts: string[],
    title: string,
    _id: string
}