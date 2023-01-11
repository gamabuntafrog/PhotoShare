import React, {useEffect} from 'react';
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
    getCurrentUser, removeErrors
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

export default function App() {
    const {user, isLoading, isLoggedIn, token} = useAppSelector((state) => state.userReducer)
    const {mode} = useAppSelector((state) => state.themeReducer)
    const {notifications} = useAppSelector(state => state.responseNotificationsReducer)
    const dispatch = useAppDispatch()

    console.log(notifications)

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

    useEffect(() => {
        // const sub = setInterval(() => dispatch(pushResponse({status: 'error', message: 'failed login'})), 2000)
        const sub = setInterval(() => dispatch(pullResponse()), 6000)

        if (notifications.length < 1) {
            clearInterval(sub)
        }
        return () => clearInterval(sub)
    }, [notifications.length > 0]);


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
            <Stack sx={{ position: "fixed", bottom: 24, left: 24, zIndex: 1000 }} spacing={2}>
                {notifications.map(({message, status, code}, index) => {
                    return (
                        <Alert key={index} severity={status}>
                            <Typography variant='h6'>{message}</Typography>
                        </Alert>
                    )
                })}
            </Stack>
            <RouterProvider router={router}/>
        </Box>
    );


}

