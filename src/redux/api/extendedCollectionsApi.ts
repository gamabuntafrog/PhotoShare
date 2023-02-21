import {ICollection, IFullCollection} from "../../types/collection";
import {IResponse, IResponseWithMessage} from "../slices/userSlice";
import {ICollectionForIUser} from "../../types/user";
import {returnTransformedError} from "../utils";
import {idType, rootApi} from "./rootApi";

const extendedCollectionsApi = rootApi.injectEndpoints({
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
                url: `/collections/users/${id}`
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
        sendRequestToJoinToCollection: build.mutation<unknown, {collectionId: string}>({
            query: ({collectionId}) => ({
                url: `/collections/${collectionId}/requests`,
                method: 'POST'
            }),
            invalidatesTags: ['Collection']
        }),
        unsendRequestToJoinFromCollection: build.mutation<unknown, {collectionId: string}>({
            query: ({collectionId}) => ({
                url: `/collections/${collectionId}/requests`,
                method: 'DELETE'
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
        deleteRequestedUserFromCollection: build.mutation<unknown, { collectionId: string, userId: string }>({
            query: ({collectionId, userId}) => ({
                url: `/collections/${collectionId}/requests/${userId}`,
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

export default extendedCollectionsApi