import {ICurrentUser} from "./user";
import {INotificationWithUser} from "./notification";

export interface IUserSlice {
    isLoggedIn: boolean,
    user: ICurrentUser | null,
    isLoading: boolean,
    token: null | string,
    language: 'en-US' | 'uk'
}

export interface IUserSliceAuthorized {
    isLoggedIn: true,
    user: ICurrentUser,
    isLoading: boolean,
    token: string,
}