import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPostsApi} from "../../types/postsApi";
import {IPost} from "../../types/post";
import {IUser} from "../../types/user";
import {ICollection} from "../../types/collection";




export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/posts'
    }),
    tagTypes: ['Post', 'Posts'],
    endpoints: (builder) => ({
        fetchAllPosts: builder.query<IPost[], void>({
            query: () => ({
                url: '/'
            }),
            providesTags: result => ['Posts'],
            transformResponse: (response: IPostsApi) => response.data.posts
        }),
        createPost: builder.mutation<IPost, {
            token: string, body: {
                title: string,
                body: string,
                image: string,
                tags: string[],
                collectionId: string
            }
        }>({
            query: ({token, body}) => ({
                url: '/',
                method: 'POST',
                body,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Post', 'Posts']
        }),
        delete: builder.mutation<void, {id: string, token: string}>({
            query: ({token, id}) => ({
                url: `/${id}`,
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
        }),
        getPostById: builder.query<IPost, string>({
            query: (id) => ({
                url: `/${id}`
            }),
            providesTags: result => ['Post'],
            transformResponse: (response: { code: number, data: { post: IPost }, status: string }) => response.data.post
        }),
        likePost: builder.mutation<void, {token: string, postId: string}>({
            query: ({token, postId}) => ({
                url: `/${postId}/like`,
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                }
            }),
        }),
        unlikePost: builder.mutation<void, {token: string, postId: string}>({
            query: ({token, postId}) => ({
                url: `/${postId}/unlike`,
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
        }),
        savePost: builder.mutation<IPost, {token: string, postId: string, collectionId: string}>({
            query: ({token, postId, collectionId}) => ({
                url: `/${postId}/saves/${collectionId}`,
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                invalidatesTags: ['Collection']
            })
        }),
        unsavePost: builder.mutation<IPost, {token: string, postId: string, collectionId: string}>({
            query: ({token, postId, collectionId}) => ({
                url: `/${postId}/unsaves/${collectionId}`,
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                invalidatesTags: ['Collection']
            })
        }),
    })
})



