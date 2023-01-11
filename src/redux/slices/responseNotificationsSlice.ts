import {createSlice} from "@reduxjs/toolkit";

export interface IResponseNotification {
    status: 'success' | 'error',
    code?: number,
    message: string
}

interface IResponseNotificationInitialState {
    notifications: IResponseNotification[]
}

const hardCodeNotifications = [
    {
        status: 'success',
        code: 201,
        message: 'Post created'
    },
    {
        status: 'success',
        code: 204,
        message: 'Post deleted'
    },
] as IResponseNotification[]

const initialState = {
    notifications: hardCodeNotifications
} as IResponseNotificationInitialState

export const responseNotificationsSlice = createSlice({
    name: 'responseNotifications',
    initialState,
    reducers: {
        pushResponse: (state, {payload}) => {
            state.notifications.push(payload)
        },
        pullResponse: (state) => {
            state.notifications.shift()
        }
    }
})

export const {pushResponse, pullResponse} = responseNotificationsSlice.actions