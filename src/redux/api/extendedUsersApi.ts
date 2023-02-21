import {
    INotification,
    IUser,
    IUserForAddInCollection,
    IUserForSearchBar,
    IUserForUsers,
    IUserWithCollections
} from "../../types/user";
import {IResponse} from "../slices/userSlice";
import {idType, rootApi} from "./rootApi";



const extendedUsersApi = rootApi.injectEndpoints({
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
            transformResponse: (res: IResponse<{ user: IUserWithCollections }>) => res.data.user,
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

export default extendedUsersApi