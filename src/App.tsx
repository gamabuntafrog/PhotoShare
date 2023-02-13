import React, {useEffect, useState} from 'react';
import {
    RouterProvider,
} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Alert, Box,  Stack, Typography, useTheme} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import userSlice, {
    disableLoading,
    getCurrentUser,
} from "./redux/slices/userSlice";
import {AppDispatch} from "./redux/store";
import {chooseRouter} from "./components/router";
import {IResponseNotification, pullResponse, pushResponse} from "./redux/slices/responseNotificationsSlice";
import FullScreenLoader from "./components/Loaders/FullScreenLoader";
import i18n from './utils/language/i18n';


const tryAuth = async (dispatch: AppDispatch) => {
    try {
        await dispatch(getCurrentUser()).unwrap()
    } catch (e) {
        dispatch(pushResponse(e as IResponseNotification))
    }
}


// 4. Зробити створення коментарів
// 5. Доробити notifications ( зробити хук useClickOutside )
// // зробити логін та регістраціюю та логін через гугл


const responsedNotificationsCleaner = (dispatch: AppDispatch, notificationsLength: number) => {
    let id: NodeJS.Timer | null = null

    if (notificationsLength) {
        id = setInterval(() => dispatch(pullResponse()), 3000);
    }

    return () => {
        if (id) clearInterval(id)
    }
}

const changeDocumentLanguage = (language: typeof i18n.language) => {
    document.documentElement.lang = language
};


export default function App() {
    const {isLoading, isLoggedIn} = useAppSelector((state) => state.userReducer)
    const notifications = useAppSelector(state => state.responseNotificationsReducer.notifications)
    const dispatch = useAppDispatch()


    // const subscribe = async (token: string) => {
    //     try {
    //         const {data}: { data: { notification: INotification } } = await fetch('http://localhost:3001/users/notifications/', {
    //             method: 'GET',
    //             headers: {
    //                 authorization: `Bearer ${token}`
    //             }
    //         }).then((res) => res.json())
    //
    //         dispatch(addNotification(data.notification))
    //         // console.log(data)
    //         subscribe(token)
    //
    //     } catch (e) {
    //         console.log(e)
    //         setTimeout(() => subscribe(token), 500)
    //     }
    // }

    useEffect(() => responsedNotificationsCleaner(dispatch, notifications.length), [notifications.length]);
    useEffect(() => changeDocumentLanguage(i18n.language), [i18n.language]);
    useEffect(() => void tryAuth(dispatch), []);

    // useEffect(() => {
    //     if (token && user) {
    //         subscribe(token)
    //         dispatch(getNotifications({token, withUsers: true}))
    //     }
    // }, [token, user]);

    const theme = useTheme()

    if (isLoading) return <FullScreenLoader/>

    const router = chooseRouter(isLoggedIn)

    return (
        <Box sx={{
            color: 'text.primary',
            overflow: 'auto',
            [theme.breakpoints.down('mobile')]: {
                pb: '60px'
            },
            [theme.breakpoints.up('mobile')]: {
                pt: '80px'
            }
        }}>
            <Stack sx={{position: "fixed", bottom: 24, left: 24, zIndex: 1000}} spacing={2}>
                {notifications.map(({message, status, code}, index) => {
                    return (
                        <Alert key={index} sx={{alignItems: 'center'}} severity={status}>
                            <Typography variant='h6'>{message}</Typography>
                        </Alert>
                    )
                })}
            </Stack>
            <RouterProvider router={router}/>

        </Box>
    );


}

