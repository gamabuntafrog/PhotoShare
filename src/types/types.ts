import {MutationTrigger} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition
} from "@reduxjs/toolkit/query";
import {IPost} from "./post";

export type likePostFnType = MutationTrigger<MutationDefinition<{ token: string, id: string }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Collection", void, "collectionsApi">>
export type unlikePostFnType = MutationTrigger<MutationDefinition<{ token: string, id: string }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Collection", void, "collectionsApi">>


export interface IToggleLikeProps {
    isPostLiked: boolean,
    likesCount: number,
    postId: string,
}

export type useToggleLikeReturnValue = readonly [{readonly isLiked: boolean, readonly likes: number}, (() => Promise<void>)]

export type useToggleLike = (args: IToggleLikeProps) => useToggleLikeReturnValue