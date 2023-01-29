import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../store";
import {createStandardCustomError, IResponse, IResponseWithMessage, logout} from "../slices/userSlice";
import {IOnePost, IPost} from "../../types/post";
import {IUser, IUserForAddInCollection, IUserWithCollections} from "../../types/user";
import {IPostsApi} from "../../types/postsApi";
import {ICollection, ICollectionWithPosts} from "../../types/collection";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {pushResponse} from "../slices/responseNotificationsSlice";
import {returnTransformedError} from "../utils";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).userReducer.token

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    },
})

const isMessageInData = (data: any): data is IResponseWithMessage<any> => !!data && 'message' in data

export const baseQueryWithInteceptors: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    const {error, data} = result

    if (error) {
        const errorData = result.error.data as IResponse<any> | IResponseWithMessage<any>

        if ('message' in errorData) {
            api.dispatch(pushResponse(errorData))
        }
    }

    if (error && error.status === 401) {
        api.dispatch(logout())
    }

    if (isMessageInData(data)) {
        api.dispatch(pushResponse(data))
    }
    console.log(isMessageInData(data))
    console.log(data)

    return result
}

export const rootApi = createApi({
    reducerPath: 'rootApi',
    refetchOnMountOrArgChange: true,
    tagTypes: ['Post', 'User', 'Collection'],
    baseQuery: baseQueryWithInteceptors,
    endpoints: () => ({})
})

const hardcodeBody = {
    title: "test",
    body: "",
    image: "data:image/png;base64,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",
    tags: ['#test'],
    collectionId: '63c15690d50784536a1c343b'
} as {
    title: string,
    body: string,
    image: string,
    tags: string[],
    collectionId: string
}

export interface ICreatePostBody {
    title: string,
    body: string,
    image: string,
    tags: string[],
    collectionId: string
}

export interface ICRUDOperationWithId<T> {
    id: string,
    body: T
}

export interface ICRUDOperationWithoutId<T> {
    body: T
}

export type idType = {
    id: string,
}


export const extendedPostsApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getMany: build.query<IPost[], void>({
            query: () => '/posts',
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
    }),
    overrideExisting: false
})

export const extendedCollectionsApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getOneWithPostsAndAuthor: build.query<ICollectionWithPosts, idType>({
            query: ({id}) => ({
                url: `/collections/${id}`,
            }),
            transformResponse: (response: IResponse<{ collection: ICollectionWithPosts }>) => response.data.collection,
            providesTags: ['Collection']
        }),
        getCurrentUserCollections: build.query<ICollection[], void>({
            query: () => ({
                url: `/collections/current`,
            }),
            transformResponse: (response: IResponse<{ collections: ICollection[] }>) => response.data.collections,
            providesTags: ['Collection']
        }),
        createCollection: build.mutation<IResponseWithMessage<{ collection: ICollection }>, {
            body: {
                tags: string[],
                title: string
            }
        }>({
            query: ({body}) => ({
                url: `/collections`,
                method: 'POST',
                body,
            }),
            transformErrorResponse: returnTransformedError
        }),
        deleteCollection: build.mutation<unknown, idType>({
            query: ({id}) => ({
                url: `/collections/${id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: returnTransformedError,
        }),
        savePostInCollection: build.mutation<unknown, { collectionId: string, postId: string }>({
            query: ({collectionId, postId}) => ({
                url: `/collections/${collectionId}/saves/${postId}`,
                method: 'POST',
            }),
            transformErrorResponse: returnTransformedError,
        }),
        deletePostFromCollection: build.mutation<unknown, { collectionId: string, postId: string }>({
            query: ({collectionId, postId}) => ({
                url: `/collections/${collectionId}/saves/${postId}`,
                method: 'DELETE',
            }),
            transformErrorResponse: returnTransformedError,
            invalidatesTags: ['Collection']
        }),
        addAuthorToCollection: build.mutation<unknown, { collectionId: string, authorId: string, role: 'ADMIN' | 'AUTHOR' }>({
            query: ({collectionId, authorId, role}) => ({
                url: `/collections/${collectionId}/authors/${authorId}`,
                method: `POST`,
                params: {
                    role
                }
            }),
            invalidatesTags: ['Collection']
        }),
        changeAuthorRoleInCollection: build.mutation<unknown, { collectionId: string, authorId: string, role: 'ADMIN' | 'AUTHOR' }>({
            query: ({collectionId, authorId, role}) => ({
                url: `/collections/${collectionId}/authors/${authorId}/roles`,
                method: `PATCH`,
                params: {
                    role
                }
            }),
            invalidatesTags: ['Collection']
        }),
        deleteAuthorFromCollection: build.mutation<unknown, { collectionId: string, authorId: string }>({
            query: ({collectionId, authorId}) => ({
                url: `/collections/${collectionId}/authors/${authorId}`,
                method: `DELETE`
            }),
            invalidatesTags: ['Collection']
        }),
        deleteCurrentUserFromCollection: build.mutation<unknown, { collectionId: string }>({
            query: ({collectionId}) => ({
                url: `/collections/${collectionId}/authors`,
                method: `DELETE`,
            }),
            invalidatesTags: ['Collection']
        }),
        changeIsPrivate: build.mutation<unknown, { collectionId: string }>({
            query: ({collectionId}) => ({
                url: `/collections/${collectionId}/isPrivate`,
                method: `PATCH`,
            }),
            invalidatesTags: ['Collection']
        })
    }),
})


export const extendedUsersApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getUsersForAddInCollection: build.query<IUserForAddInCollection[], { username: string, collectionId: string }>({
            query: ({username, collectionId}) => ({
                url: `/users/search`,
                params: {
                    username,
                    collectionId
                }
            }),
            providesTags: ['Collection', 'User'],
            transformResponse: (res: IResponse<{ users: IUserForAddInCollection[] }>) => res.data.users,
        }),
        getUserById: build.query<IUserWithCollections, idType>({
            query: ({id}) => ({
                url: `/users/${id}`,
                params: {
                    collections: true
                }
            }),
            transformResponse: (res: IResponse<{ user: IUserWithCollections }>) => res.data.user
        }),
        updateCurrentUser: build.mutation<unknown, { body: { username: string, avatar: string } }>({
            query: ({body}) => ({
                url: `/users/current`,
                method: 'PATCH',
                body
            }),
        }),
        subscribeToUser: build.mutation<IUser, idType>({
            query: ({id}) => ({
                url: `/users/${id}/subscribes`,
                method: "POST",
            }),
        }),
        unsubscribeFromUser: build.mutation<IUser, idType>({
            query: ({id}) => ({
                url: `/users/${id}/subscribes`,
                method: "DELETE",
            }),
        })
    }),
    overrideExisting: false
})

// добавити сюди оновлення юзера

