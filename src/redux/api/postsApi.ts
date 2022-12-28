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
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        fetchAllPosts: builder.query<IPostsApi, void>({
            query: () => ({
                url: '/'
            }),
            providesTags: result => ['Post']
        }),
        createPost: builder.mutation<IPost, {
            token: string, body: {
                title: string,
                body: string,
                image: string,
                tags: string[],
                collection: ICollection
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
            invalidatesTags: ['Post']
        }),
        getPostById: builder.query<IPost, string>({
            query: (id) => ({
                url: `/${id}`
            }),
            providesTags: result => ['Post'],
            transformResponse: (response: { code: number, data: { post: IPost }, status: string }) => response.data.post
        })
    })
})



