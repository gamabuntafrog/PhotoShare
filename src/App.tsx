import React, {useEffect, useState} from 'react';
import {
    RouterProvider,
} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Alert, Box, Container, createTheme, Snackbar, Stack, ThemeProvider, Typography, useTheme} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import userSlice, {
    addNotification,
    disableLoading,
    getNotifications,
    getCurrentUser, removeErrors, logout
} from "./redux/slices/userSlice";
import {AppDispatch} from "./redux/store";
import {chooseRouter} from "./components/router";
import {INotification} from "./types/notification";
import {IResponseNotification, pullResponse, pushResponse} from "./redux/slices/responseNotificationsSlice";


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
const logoutWhenSessionIsOver = (logOutCallback: () => void, notifications: IResponseNotification[]) => {
    const isSessionIsOver = notifications.some(({code}) => code === 401)
    if (isSessionIsOver) {
        logOutCallback()
        return
    }
}

export default function App() {
    const {user, isLoading, isLoggedIn, token} = useAppSelector((state) => state.userReducer)
    const mode = useAppSelector((state) => state.themeReducer.mode)
    const notifications = useAppSelector(state => state.responseNotificationsReducer.notifications)
    const dispatch = useAppDispatch()

    console.log(notifications)


    useEffect(() => responsedNotificationsCleaner(dispatch, notifications.length), [notifications.length]);
    useEffect(() => logoutWhenSessionIsOver(() => dispatch(logout()), notifications), [notifications.length]);


    const subscribe = async (token: string) => {
        try {
            const {data}: { data: { notification: INotification } } = await fetch('http://localhost:3001/users/notifications/', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())

            dispatch(addNotification(data.notification))
            // console.log(data)
            subscribe(token)

        } catch (e) {
            console.log(e)
            setTimeout(() => subscribe(token), 500)
        }
    }

    useEffect(() => {
        !!token ? tryAuth(dispatch) : dispatch(disableLoading())
    }, []);

    // useEffect(() => {
    //     if (token && user) {
    //         subscribe(token)
    //         dispatch(getNotifications({token, withUsers: true}))
    //     }
    // }, [token, user]);



    if (isLoading) {
        return (
            <Box sx={{
                bgcolor: 'background.default',
                color: 'var(--text-primary)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant='h1'>Loading...</Typography>
            </Box>
        )
    }

    const router = chooseRouter(isLoggedIn)

    return (
        <Box sx={{
            bgcolor: mode === 'dark' ? 'background.default' : 'background.paper',
            color: 'var(--text-primary)',
            height: '100vh',
            maxHeight: '100vh',
            overflow: 'hidden',
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

