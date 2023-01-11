import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ICurrentUser, IUser} from "../../types/user";
import {IUserSlice} from "../../types/userSlice";
import {INotificationWithUser} from "../../types/notification";
import {IResponseNotification} from "./responseNotificationsSlice";

class StatusError extends Error {
    code: number | undefined;
}

const createCustomError = (err: {message: string, code: number, status: 'success' | 'error'}) => {
    throw err
}

export interface IResponseError {
    code: number,
    message: string,
    status: string
}
//

const initialState: IUserSlice = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
    token: null,
    notifications: [],
    errors: {
        authError: false,
    }
}

const usersBaseURL = 'http://localhost:3001/users'
const authBaseURL = 'http://localhost:3001/auth'

export interface IResponse<T> { code: number, data: T, status: string }

const fetchToken = async ({email, password}: { email: string, password: string }): Promise<string> => {

    const response = await fetch(`${authBaseURL}/login`, {
        body: JSON.stringify({email, password}),
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        method: 'POST'
    })
    console.log(response)

    if (!response.ok) {
        const error = await response.json()
        createCustomError(error)
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

    console.log(response)

    if (!response.ok) {
        const error = await response.json()
        createCustomError(error)
    }

    const responseData: IResponse<{user: ICurrentUser}> = await response.json()

    return responseData.data.user
}

export const getCurrentUser = createAsyncThunk<{ user: ICurrentUser, token: string }, void, { state: RootState }>('users/getCurrent', async (args, {getState, rejectWithValue}) => {
    const {userReducer} = getState()

    try {
        const token = userReducer.token!

        const user = await fetchUser(token)

        return {user, token}
    } catch (e) {
        console.log(e)
        return rejectWithValue(e as IResponseNotification)
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
        return rejectWithValue(e as IResponseNotification)
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

export const getNotifications = createAsyncThunk('users/notifications', async ({
                                                                                   token,
                                                                                   withUsers
}: { token: string, withUsers: boolean }) => {
    const response: { data: { notifications: INotificationWithUser[] } } = await fetch(`${usersBaseURL}/notifications/all?users=${withUsers}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        },
    }).then((res) => res.json())
    // не треба ніякої дати, просто пушу в базу даних сповіщення і після отримання роблю рефетч на клієнті!
    // console.log(response)
    return response.data.notifications
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        disableLoading: (state) => {
            state.isLoading = false
        },
        addNotification: (state, {payload}) => {
            state.notifications.push(payload)
        },
        removeErrors: (state) => {
            state.errors = initialState.errors
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNotifications.pending, (state, {payload}) => {
        })
        builder.addCase(getNotifications.fulfilled, (state, {payload}) => {
            state.notifications = payload
        })
        builder.addCase(getNotifications.rejected, (state, {payload}) => {
        })
        builder.addCase(register.pending, (state, {payload}) => {
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, {payload}) => {
            state.token = payload.token
            state.user = payload.user
            state.isLoading = false
            state.isLoggedIn = true
        })
        builder.addCase(register.rejected, (state, {payload}) => {
            return {...initialState, isLoading: false, errors: {...state.errors, authError: true}}
        })
        builder.addCase(getCurrentUser.pending, (state, {payload}) => {
            state.isLoading = true
        })
        builder.addCase(getCurrentUser.fulfilled, (state, {payload}) => {
            state.token = payload.token
            state.user = payload.user
            state.isLoading = false
            state.isLoggedIn = true
        })
        builder.addCase(getCurrentUser.rejected, (state, {payload}) => {
            return {...initialState, isLoading: false, errors: {...state.errors, authError: true}}
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            return {...initialState, isLoading: false}
        })
        builder.addCase(logout.rejected, (state, action) => {
            return {...initialState, isLoading: false}
        })
    }
})
export const {disableLoading, addNotification, removeErrors} = userSlice.actions
export default userSlice
