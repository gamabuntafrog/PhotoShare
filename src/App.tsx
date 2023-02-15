import React, {useEffect, useState} from 'react';
import {
    RouterProvider,
} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Alert, Box, Stack, Theme,} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import userSlice, {
    getCurrentUser,
} from "./redux/slices/userSlice";
import {chooseRouter} from "./components/router";
import FullScreenLoader from "./components/Loaders/FullScreenLoader";
import i18n from './utils/language/i18n';
import useSx from "./hooks/useSx";
import NotificationStack from "./components/NotificationStack";
import StandardHelmet from "./components/StandardHelmet";
import {Helmet} from "react-helmet";


const appStyles = (theme: Theme) => {


    return {
        wrapper: {
            color: 'text.primary',
            overflow: 'auto',
            [theme.breakpoints.down('mobile')]: {
                pb: '60px'
            },
            [theme.breakpoints.up('mobile')]: {
                pt: '80px'
            }
        }
    }
}

export default function App() {
    const {isLoading, isLoggedIn} = useAppSelector((state) => state.userReducer)
    const dispatch = useAppDispatch()

    useEffect(() => void dispatch(getCurrentUser()), []);

    const styles = useSx(appStyles)

    if (isLoading) return (
        <FullScreenLoader withMeta/>
    )

    const router = chooseRouter(isLoggedIn)

    return (
        <>
            <Helmet titleTemplate='%s | PhotoShare'>
                <html lang={i18n.language} />
                <title>PhotoShare</title>
            </Helmet>
            <Box sx={styles.wrapper}>
                <NotificationStack/>
                <RouterProvider router={router}/>
            </Box>
        </>
    );
}

