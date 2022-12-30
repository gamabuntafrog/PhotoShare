import {createBrowserRouter, Navigate} from "react-router-dom";
import Header from "./Header";
import Posts from "./Posts";
import Settings from "./Settings";
import UserProfile from "./UserProfile";
import Login from "./Login";
import React from "react";
import Register from "./Register";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Collection from "./Collection";

const privateRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header/>
                <Posts/>
            </>
        ),
    },
    {
        path: "/settings",
        element: (
            <>
                <Header/>
                <Settings/>
            </>
        )
    },
    {
        path: "/users/:id",
        element: (
            <>
                <Header/>
                <UserProfile/>
            </>
        )
    },
    {
        path: "/post/create",
        element: (
            <>
                <Header/>
                <CreatePost/>
            </>
        )
    },
    {
        path: "/post/create/:id",
        element: (
            <>
                <Header/>
                <CreatePost/>
            </>
        )
    },
    {
        path: "/posts/:id",
        element: (
            <>
                <Header/>
                <Post/>
            </>
        )
    },
    {
        path: "/collections/:id",
        element: (
            <>
                <Header/>
                <Collection/>
            </>
        )
    },
    {
        path: "*",
        element: (
            <>
                <Header/>
                <Navigate to='/'/>
            </>
        )
    }
]);

const publicRouter = createBrowserRouter([
    {
        path: "/login",
        element: (
            <>
                <Header/>
                <Login/>
            </>
        )
    },
    {
        path: "/register",
        element: (
            <>
                <Header/>
                <Register/>
            </>
        )
    },
    {
        path: "/settings",
        element: (
            <>
                <Header/>
                <Settings/>
            </>
        )
    },
    {
        path: "*",
        element: (
            <>
                <Header/>
                <Navigate to='/login'/>
            </>
        )
    }
])

export const chooseRouter = (isLoggedIn: boolean) => isLoggedIn ? privateRouter : publicRouter