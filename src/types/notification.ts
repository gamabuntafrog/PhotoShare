import {IUser} from "./user";

export type notificationsTypes = 'subscribe' | 'unsubscribe'

export interface INotification {
    type: notificationsTypes,
    user: string,
    receiver: string,
    postId: string,
    checked: boolean,
    _id: string
}

export interface INotificationWithUser {
    type: notificationsTypes,
    user: IUser,
    receiver: string,
    postId: string,
    checked: boolean,
    _id: string
}