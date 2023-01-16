import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser, IUserWithPosts} from "../../types/user";
import {IResponseWithMessage} from "../slices/userSlice";
import {ICollection} from "../../types/collection";


export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/users'
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getById: builder.query<IUserWithPosts, {id: string, token: string, posts: boolean, collections: boolean}>({
            query: ({id, token, posts, collections}) => ({
                url: `/${id}`,
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                },
                params: {
                    posts,
                    collections
                }
            }),
            transformResponse: (response: {status: number, data: { user: IUserWithPosts }}) => {
                return response.data.user
            },
            providesTags: result => ['User']
        }),
        updateCurrent: builder.mutation<IResponseWithMessage<{user: IUser}>, {token: string, body: {username: string, avatar: string}}>({
            query: ({token, body}) => ({
                url: '/current',
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`
                },
                body
            }),
            invalidatesTags: ['User']
        }),
        subscribe: builder.mutation<IUser, {userId: string, token: string}>({
            query: ({userId, token}) => ({
                url: `/${userId}/subscribes`,
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                },
            }),
            invalidatesTags: ['User']
        }),
        unsubscribe: builder.mutation<IUser, {userId: string, token: string}>({
            query: ({userId, token}) => ({
                url: `/${userId}/subscribes`,
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                },
            }),
            invalidatesTags: ['User']
        })
    })
})
