import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {IPostsApi} from "../../types/postsApi";



export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    endpoints: (builder) => ({
        fetchAllPosts: builder.query<IPostsApi, void>({
            query: () => ({
                url: '/posts'
            })
        })
        // getPostById: builder.query<IPost, string>({
        //     query: (id) => `/${id}`
        // })
    })
})



