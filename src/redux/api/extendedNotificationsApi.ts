import {rootApi} from "./rootApi";
import {INotification} from "../../types/user";
import {IResponse} from "../slices/userSlice";

const extendedNotificationsApi = rootApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<INotification[], void>({
            query: () => ({
                url: '/notifications',
            }),
            transformResponse: (res: IResponse<{ notifications: INotification[] }>) => res.data.notifications,
        }),
    })
})

export default extendedNotificationsApi