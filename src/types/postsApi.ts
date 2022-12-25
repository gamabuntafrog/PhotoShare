import {IPost} from "./post";

export interface IPostsApi {
    code: number,
    status: string,
    data: {
        posts: IPost[]
    }
}