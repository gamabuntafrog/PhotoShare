import {IOnePost, IPost} from "../../types/post";
import {IResponse, IResponseWithMessage} from "../slices/userSlice";
import {returnTransformedError} from "../utils";
import {ICreatePostBody, ICRUDOperationWithoutId, idType, rootApi} from "./rootApi";

const extendedPostsApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getMany: build.query<IPost[], {page: number, arrayOfId: string[]}>({
            query: ({page, arrayOfId}) => ({
                url: '/posts',
                params: {
                    page,
                    arrayOfId: JSON.stringify(arrayOfId)
                }
            }),
            transformResponse: (response: IResponse<{ posts: IPost[] }>) => response.data.posts,
        }),
        getByTags: build.query<IPost[], {arrayOfId: string[], tags: string[], id: string}>({
            query: ({arrayOfId, tags, id}) => ({
                url: `/posts/tags/${id}`,
                params: {
                    arrayOfId: JSON.stringify(arrayOfId),
                    tags: JSON.stringify(tags),
                },
            }),
            transformResponse: (response: IResponse<{ posts: IPost[] }>) => response.data.posts,
        }),
        getPostsByCollectionId: build.query<IPost[], {arrayOfId: string[], id: string}>({
            query: ({arrayOfId, id}) => ({
                url: `/posts/collections/${id}`,
                params: {
                    arrayOfId: JSON.stringify(arrayOfId)
                }
            }),
            transformResponse: (response: IResponse<{ posts: IPost[] }>) => response.data.posts,
        }),
        searchPosts: build.query<IPost[], { title: string, page: number, arrayOfId: string[] }>({
            query: ({title, page, arrayOfId}) => ({
                url: `/posts/search`,
                params: {
                    title,
                    page,
                    arrayOfId: JSON.stringify(arrayOfId)
                }
            }),
            transformResponse: (response: IResponse<{ posts: IPost[] }>) => response.data.posts,
        }),
        getPostsByUserId: build.query<IPost[], { id: string, arrayOfId: string[] }>({
            query: ({id, arrayOfId}) => ({
                url: `/posts/users/${id}`,
                params: {
                    arrayOfId: JSON.stringify(arrayOfId)
                }
            }),
            transformResponse: (response: IResponse<{ posts: IPost[] }>) => response.data.posts,
        }),
        getOneById: build.query<IOnePost, idType>({
            query: ({id}) => ({
                url: `/posts/${id}`
            }),
            transformErrorResponse: returnTransformedError,
            transformResponse: (response: IResponse<{ post: IOnePost }>) => response.data.post
        }),
        createPost: build.mutation<IResponseWithMessage<{ post: IPost }>, ICRUDOperationWithoutId<ICreatePostBody>>({
            query: ({body}) => ({
                url: '/posts',
                method: 'POST',
                body: body,
            }),
            transformErrorResponse: returnTransformedError
        }),
        deletePost: build.mutation<void, idType>({
            query: ({id}) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: returnTransformedError,
        }),
        likeOneById: build.mutation<unknown, idType>({
            query: ({id}) => ({
                url: `/posts/${id}/like`,
                method: 'PATCH',
            }),
            transformErrorResponse: returnTransformedError,
        }),
        unlikeOneById: build.mutation<unknown, idType>({
            query: ({id}) => ({
                url: `/posts/${id}/unlike`,
                method: 'PATCH',
            }),
            transformErrorResponse: returnTransformedError,
        }),
        createComment: build.mutation<unknown, { postId: string, text: string }>({
            query: ({postId, text}) => ({
                url: `/posts/${postId}/comments`,
                method: 'POST',
                body: {
                    text
                }
            }),
            transformErrorResponse: returnTransformedError,
        }),
        createReply: build.mutation<unknown, { postId: string, commentId: string, text: string  }>({
            query: ({postId, commentId, text}) => ({
                url: `/posts/${postId}/comments/${commentId}`,
                method: 'POST',
                body: {
                    text
                }
            }),
            transformErrorResponse: returnTransformedError,
        }),
    }),
    overrideExisting: false
})

export default extendedPostsApi