import React, {useEffect} from 'react';
import {
    RouterProvider,
} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Box, Container, createTheme, ThemeProvider, Typography, useTheme} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import userSlice, {
    addNotification,
    disableLoading,
    getNotifications,
    getCurrentUser
} from "./redux/slices/userSlice";
import {AppDispatch} from "./redux/store";
import {chooseRouter} from "./components/router";
import {INotification} from "./types/notification";




const tryAuth = (dispatch: AppDispatch) => {
    dispatch(getCurrentUser())
}

// 1. Зробити зміну аватарки
// 2. Переробити дизайн постів на щось схоже з ютубом чи пінтерестом
// 3. Зробити створення постів
// 4. Зробити створення коментарів
// 5. Доробити notifications ( зробити хук useClickOutside )

//
// // зробити логін та регістраціюю та логін через гугл

export default function App() {
    const {user, isLoading, isLoggedIn, token, notifications} = useAppSelector((state) => state.userReducer)
    const {mode} = useAppSelector((state) => state.themeReducer)
    const dispatch = useAppDispatch()

    const subscribe = async (token: string) => {
        try {
            const {data}: {data: {notification: INotification}} = await fetch('http://localhost:3001/users/notifications/', {
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

    useEffect(() => {!!token ? tryAuth(dispatch) : dispatch(disableLoading())}, []);

    useEffect(() => {
        if (token && user) {
            subscribe(token)
            dispatch(getNotifications({token, withUsers: true}))
        }
    }, [token, user]);

    // useEffect(() => {
    //     console.log(notifications)
    // }, [notifications]);


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
            <RouterProvider router={router}/>
        </Box>
    );


}

