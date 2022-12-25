import {ICurrentUser} from "./user";
import {INotificationWithUser} from "./notification";

export interface IUserSlice {
    isLoggedIn: boolean,
    user: ICurrentUser | null,
    isLoading: boolean,
    token: null | string,
    notifications: INotificationWithUser[],
    errors: {
        authError: boolean,
    }
}

export interface IUserSliceAuthorized {
    isLoggedIn: true,
    user: ICurrentUser,
    isLoading: boolean,
    token: string,
    notifications: INotificationWithUser[]
}