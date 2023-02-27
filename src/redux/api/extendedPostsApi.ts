import {IComment, IOnePost, IPost, IReplyComment} from "../../types/post";
import {IResponse, IResponseWithMessage} from "../slices/userSlice";
import {returnTransformedError} from "../utils";
import {ICreatePostBody, ICRUDOperationWithoutId, idType, rootApi} from "./rootApi";

const extendedPostsApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getMany: build.query<IPost[], {arrayOfId: string[]}>({
            query: ({arrayOfId}) => ({
                url: '/posts',
                params: {
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
        searchPosts: build.query<IPost[], { title: string, arrayOfId: string[] }>({
            query: ({title, arrayOfId}) => ({
                url: `/posts/search`,
                params: {
                    title,
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
        createComment: build.mutation<IComment, { postId: string, text: string }>({
            query: ({postId, text}) => ({
                url: `/posts/${postId}/comments`,
                method: 'POST',
                body: {
                    text
                }
            }),
            transformErrorResponse: returnTransformedError,
            transformResponse: (response: IResponse<{ comment: IComment }>) => response.data.comment
        }),
        createReply: build.mutation<IReplyComment, { postId: string, commentId: string, text: string, receiverId: string  }>({
            query: ({postId, commentId, receiverId, text}) => ({
                url: `/posts/${postId}/comments/${commentId}`,
                method: 'POST',
                body: {
                    text,
                    receiverId
                }
            }),
            transformErrorResponse: returnTransformedError,
            transformResponse: (response: IResponse<{ reply: IReplyComment }>) => response.data.reply
        }),
    }),
    overrideExisting: false
})

export default extendedPostsApi