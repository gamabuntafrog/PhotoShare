import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser} from "../../types/user";
import {IPost} from "../../types/post";
import {ICollection, ICollectionWithPosts} from "../../types/collection";



export const collectionsApi = createApi({
    reducerPath: 'collectionsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/collections'
    }),
    tagTypes: ['Collection'],
    endpoints: (builder) => ({
        create: builder.mutation<ICollection, {
            token: string, body: {
                tags: string[],
                title: string
            }
        }>({
            query: ({token, body}) => ({
                url: `/`,
                method: 'POST',
                body,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Collection']
        }),
        getCollectionWithPosts: builder.query<ICollectionWithPosts, {id: string, token: string}>({
            query: ({id, token}) => ({
                url: `/${id}`,
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            providesTags: result => ['Collection'],
            transformResponse: (response: {data: {collection: ICollectionWithPosts}, status: string, code: number}) => response.data.collection
        }),
        getCurrent: builder.query<ICollection[], {token: string}>({
            query: ({token}) => ({
                url: `/`,
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            providesTags: result => ['Collection'],
            transformResponse: (response: {data: {collections: ICollection[]}, status: string, code: number}) => response.data.collections
        }),
    })
})