import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../store";
import {createStandardCustomError, IResponse, IResponseWithMessage, logout} from "../slices/userSlice";
import {IOnePost, IPost} from "../../types/post";
import {
    ICollectionForIUser,
    IUser,
    IUserForAddInCollection,
    IUserForSearchBar, IUserForUsers,
    IUserWithCollections
} from "../../types/user";
import {IPostsApi} from "../../types/postsApi";
import {ICollection, ICollectionWithPosts, IFullCollection} from "../../types/collection";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {pushResponse} from "../slices/responseNotificationsSlice";
import {returnTransformedError} from "../utils";

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const baseUrl = isDevelopment ? 'http://localhost:3001' : 'https://photosharebackend.up.railway.app'

const baseQuery = fetchBaseQuery({
    baseUrl,
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

        if (errorData && 'message' in errorData) {
            api.dispatch(pushResponse(errorData))
        }
    }

    if (error && error.status === 401) {
        api.dispatch(logout())
    }

    if (isMessageInData(data)) {
        api.dispatch(pushResponse(data))
    }
    // console.log(isMessageInData(data))
    // console.log(data)

    return result
}

export const rootApi = createApi({
    reducerPath: 'rootApi',
    refetchOnMountOrArgChange: true,
    tagTypes: ['Post', 'User', 'Collection'],
    baseQuery: baseQueryWithInteceptors,
    endpoints: () => ({})
})


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
        getMany: build.query<IPost[], {page: number}>({
            query: ({page}) => ({
                url: '/posts',
                params: {
                    page
                }
            }),
            transformResponse: (response: IResponse<{ posts: IPost[] }>) => response.data.posts,

        }),
        searchPosts: build.query<IPost[], { title: string }>({
            query: ({title}) => ({
                url: `/posts/search`,
                params: {
                    title
                }
            }),
            transformResponse: (response: IResponse<{ posts: IPost[] }>) => response.data.posts,
        }),
        getPostsByUserId: build.query<IPost[], idType>({
            query: ({id}) => ({
                url: `/users/${id}/posts`
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
    }),
    overrideExisting: false
})

export const extendedCollectionsApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getOneWithPostsAndAuthor: build.query<IFullCollection, idType>({
            query: ({id}) => ({
                url: `/collections/${id}`,
            }),
            transformResponse: (response: IResponse<IFullCollection>) => response.data,
            providesTags: ['Collection']
        }),
        getCollectionsByUserId: build.query<ICollectionForIUser[], idType>({
            query: ({id}) => ({
                url: `/users/${id}/collections`
            }),
            transformResponse: (response: IResponse<{ collections: ICollectionForIUser[] }>) => response.data.collections,
        }),
        searchCollections: build.query<ICollectionForIUser[], {title: string}>({
            query: ({title}) => ({
                url: `/collections/search`,
                params: {
                    title
                }
            }),
            transformResponse: (response: IResponse<{ collections: ICollectionForIUser[] }>) => response.data.collections,
        }),
        getAllowedToViewCollections: build.query<ICollectionForIUser[], idType>({
            query: ({id}) => ({
                url: `/users/${id}/allowedToViewCollections`
            }),
            transformResponse: (response: IResponse<{ allowedToViewCollections: ICollectionForIUser[] }>) => response.data.allowedToViewCollections,
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
            transformErrorResponse: returnTransformedError
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
        addViewerToCollection: build.mutation<unknown, { collectionId: string, viewerId: string }>({
            query: ({collectionId, viewerId}) => ({
                url: `/collections/${collectionId}/viewers/${viewerId}`,
                method: `POST`,
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
        changeCollectionInfo: build.mutation<unknown, { collectionId: string, title: string, tags: string[] }>({
            query: ({collectionId, title, tags}) => ({
                url: `/collections/${collectionId}`,
                method: `PATCH`,
                body: {
                    title,
                    tags
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
        deleteViewerFromCollection: build.mutation<unknown, { collectionId: string, viewerId: string }>({
            query: ({collectionId, viewerId}) => ({
                url: `/collections/${collectionId}/viewers/${viewerId}`,
                method: `DELETE`
            }),
            invalidatesTags: ['Collection']
        }),
        deleteCurrentUserFromCollection: build.mutation<unknown, { collectionId: string }>({
            query: ({collectionId}) => ({
                url: `/collections/${collectionId}/current`,
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
                url: `/users/search/forAddInCollection`,
                params: {
                    username,
                    collectionId
                }
            }),
            providesTags: ['Collection', 'User'],
            transformResponse: (res: IResponse<{ users: IUserForAddInCollection[] }>) => res.data.users,
        }),
        getUsersForSearchBar: build.query<IUserForSearchBar[], { username: string }>({
            query: ({username}) => ({
                url: `/users/search/forSearchBar`,
                params: {
                    username,
                }
            }),
            providesTags: ['User'],
            transformResponse: (res: IResponse<{ users: IUserForSearchBar[] }>) => res.data.users,
        }),
        getUsersByUsername: build.query<IUserForUsers[], { username: string }>({
            query: ({username}) => ({
                url: `/users/search`,
                params: {
                    username,
                }
            }),
            providesTags: ['User'],
            transformResponse: (res: IResponse<{ users: IUserForUsers[] }>) => res.data.users,
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

