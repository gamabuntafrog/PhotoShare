import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
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
                <Outlet/>
            </>
        ),
        children: [
            {
                path: "",
                element: <Posts/>
            },
            {
                path: "/settings",
                element: <Settings/>
            },
            {
                path: "/users/:id",
                element: <UserProfile/>
            },
            {
                path: "/post/create",
                element: <CreatePost/>
            },
            {
                path: "/post/create/:id",
                element: <CreatePost/>
            },
            {
                path: "/posts/:id",
                element: <Post/>
            },
            {
                path: "collections/:id",
                element: <Collection/>
            },
            {
                path: "*",
                element: <Navigate to='/'/>
            }
        ]
    }
]);

const publicRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header/>
                <Outlet/>
                {/*<Navigate to='/login'/>*/}
            </>
        ),
        children: [
            {
                path: "",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "settings",
                element: <Settings/>
            },
            {
                path: "*",
                element: <Navigate to='/'/>
            }
        ]
    }
])

export const chooseRouter = (isLoggedIn: boolean) => isLoggedIn ? privateRouter : publicRouter

