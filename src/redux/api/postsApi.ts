import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {IPostsApi} from "../../types/postsApi";
import {IPost} from "../../types/post";



export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        fetchAllPosts: builder.query<IPostsApi, void>({
            query: () => ({
                url: '/posts'
            }),
            providesTags: result => ['Post']
        }),
        createPost: builder.mutation<IPost, {token: string, body: {
                title: string,
                body: string,
                image: string,
                tags: string[]
            }}>({
            query: ({token, body}) => ({
                url: '/posts',
                method: 'POST',
                body,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Post']
        })
        // getPostById: builder.query<IPost, string>({
        //     query: (id) => `/${id}`
        // })
    })
})



