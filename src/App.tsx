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
import {extendedPostsApi, extendedUsersApi} from "./redux/api/rootApi";
import FullScreenLoader from "./components/Loaders/FullScreenLoader";
import Header from "./components/Header";


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


export default function App() {
    const {user, isLoading, isLoggedIn, token} = useAppSelector((state) => state.userReducer)
    const mode = useAppSelector((state) => state.themeReducer.mode)
    const notifications = useAppSelector(state => state.responseNotificationsReducer.notifications)
    const dispatch = useAppDispatch()

    useEffect(() => responsedNotificationsCleaner(dispatch, notifications.length), [notifications.length]);

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

    useEffect(() => {
        !!token ? tryAuth(dispatch) : dispatch(disableLoading())
    }, []);

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
            bgcolor: mode === 'dark' ? 'background.default' : 'background.paper',
            color: 'var(--text-primary)',
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

