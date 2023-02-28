import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ICurrentUser, IUser} from "../../types/types";
import {IUserSlice} from "../../types/types";
import {IResponseNotification, pushResponse} from "./responseNotificationsSlice";
import baseUrl from "../../utils/baseUrl";

export interface IResponseError {message: string, code: number, status: 'success' | 'error'}

export const createStandardCustomError = (err: any): IResponseError => {
    if (!err) err = {}

    if (!err.status) err.status = 'error'
    if (!err.message) err.message = 'Unexpected error'
    if (!err.code) err.code = 400

    if (err.message == 'Failed to fetch') err.message = 'Check connection'

    return err
}


const initialState: IUserSlice = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
    token: null,
    language: "en-US"
}

const usersBaseURL = `${baseUrl}/users`
const authBaseURL = `${baseUrl}/auth`

export interface IResponse<T> { code: number, data: T, status: string }
export interface IResponseWithMessage<T> { code: number, data: T, status: string, message: string }

const fetchToken = async ({email, password}: { email: string, password: string }): Promise<string> => {

    const response = await fetch(`${authBaseURL}/login`, {
        body: JSON.stringify({email, password}),
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        method: 'POST'
    })

    if (!response.ok) {
        const error = await response.json()
        throw createStandardCustomError(error)
    }

    const responseData: IResponse<{token: string}> = await response.json()

    return responseData.data.token
}

const fetchUser = async (token: string): Promise<ICurrentUser> => {

    const response = await fetch(`${usersBaseURL}/current`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const error = await response.json()
        throw createStandardCustomError(error)
    }

    const responseData: IResponse<{user: ICurrentUser}> = await response.json()

    return responseData.data.user
}

export const getCurrentUser = createAsyncThunk<{ user: ICurrentUser | null, token: string | null }, void, { state: RootState }>('users/getCurrent', async (args, {getState, rejectWithValue, dispatch}) => {
    const {userReducer} = getState()

    try {
        const token = userReducer.token

        if (!token) return {user: null, token: null}

        const user = await fetchUser(token)

        return {user, token}
    } catch (e) {
        console.log(e)
        dispatch(pushResponse(createStandardCustomError(e as IResponseError)))
        return rejectWithValue(createStandardCustomError(e as IResponseError))
    }
})

export const login = createAsyncThunk<{ user: ICurrentUser, token: string }, { email: string, password: string }, { state: RootState }>('users/getCurrent', async (args, {getState, rejectWithValue}) => {
    const {userReducer} = getState()
    const {email, password} = args

    try {
        const token = userReducer.token || await fetchToken({email, password})

        const user = await fetchUser(token)

        return {user, token}
    } catch (e) {
        console.log(e)
        return rejectWithValue(createStandardCustomError(e as IResponseError))
    }
})

export const register = createAsyncThunk<{ user: ICurrentUser, token: string }, {email: string, username: string, password: string}>('users/login', async ({username, email, password}) => {

    const response: {status: string, code: number, data: {user: ICurrentUser, token: string}} = await fetch(`${authBaseURL}/register`, {
        body: JSON.stringify({email, password, username}),
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        method: 'POST'
    }).then((res) => res.json())

    const {user, token} = response.data

    return {user, token}
})

export const logout = createAsyncThunk<void, void, { state: RootState }>('logout', async (args, {getState}) => {

    const {userReducer} = getState()
    const token = userReducer.token!

    const logout = await fetch(`${authBaseURL}/logout`, {
        headers: {
            authorization: `Bearer ${token}`
        },
        method: 'POST',
    })

    return
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        disableLoading: (state) => {
            state.isLoading = false
        },
        subscribeToUser: (state, {payload: userId}) => {
            state.user?.subscribes.push(userId)
        },
        unsubscribeFromUser: (state, {payload: userId}) => {
            state.user!.subscribes = state.user?.subscribes.filter((id) => id !== userId) || []
        },
        changeLanguage: (state, {payload: language}) => {
            state.language = language
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, {payload}) => {
            state.token = payload.token
            state.user = payload.user
            state.isLoading = false
            state.isLoggedIn = true
        })
        builder.addCase(register.rejected, () => {
            return {...initialState, isLoading: false}
        })
        builder.addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCurrentUser.fulfilled, (state, {payload}) => {
            if (!payload.token) {
                state.token = null;
                state.user = null;
                state.isLoading = false
                state.isLoggedIn = false

                return
            }

            state.token = payload.token
            state.user = payload.user
            state.isLoading = false
            state.isLoggedIn = true
        })
        builder.addCase(getCurrentUser.rejected, () => {
            return {...initialState, isLoading: false}
        })
        builder.addCase(logout.fulfilled, () => {
            return {...initialState, isLoading: false}
        })
        builder.addCase(logout.rejected, () => {
            return {...initialState, isLoading: false}
        })
    }
})
export const {disableLoading,subscribeToUser, unsubscribeFromUser, changeLanguage} = userSlice.actions
export default userSlice
