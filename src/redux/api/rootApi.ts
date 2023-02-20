import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../store";
import {createStandardCustomError, IResponse, IResponseWithMessage, logout} from "../slices/userSlice";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {pushResponse} from "../slices/responseNotificationsSlice";
import baseUrl from "../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
        const {token, language} = (getState() as RootState).userReducer

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        if (language) {
            headers.set('language', language)
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

export interface ICRUDOperationWithoutId<T> {
    body: T
}

export type idType = {
    id: string,
}







