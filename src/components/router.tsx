import {createBrowserRouter, Navigate, Outlet, useParams} from "react-router-dom";
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
import UsersPosts from "./UserProfile/UserProfileComponents/UsersPosts";
import UserCollections from "./UserProfile/UserProfileComponents/UserCollections";
import UserAllowedToViewCollections from "./UserProfile/UserProfileComponents/UserAllowedToViewCollections";
import SearchUsers from "./Search/SearchComponents/Users";
import Search from "./Search";
import SearchPosts from './Search/SearchComponents/Posts'
import SearchCollections from './Search/SearchComponents/Collections'
import ScrollToTop from "./ScrollToTop";

const privateRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <ScrollToTop/>
                <Header/>
                <Outlet/>
            </>
        ),
        children: [
            {
                index: true,
                element: <Posts/>
            },
            {
                path: "settings",
                element: <Settings/>
            },
            {
                path: "users/:id",
                element: <UserProfile/>,
                children: [
                    {
                        index: true,
                        element: <UsersPosts/>,
                    },
                    {
                        path: "collections",
                        element: <UserCollections/>
                    },                    {
                        path: "allowedToView",
                        element: <UserAllowedToViewCollections/>
                    },
                ]
            },
            {
                path: "post/create",
                element: <CreatePost/>
            },
            {
                path: "post/create/:id",
                element: <CreatePost/>
            },
            {
                path: "posts/:id",
                element: <Post/>
            },
            {
                path: "collections/:id",
                element: <Collection/>
            },
            {
                path: "search",
                element: <Search/>,
                children: [
                    {
                        path: "users",
                        element: <SearchUsers/>
                    },
                    {
                        path: "posts",
                        element: <SearchPosts/>
                    },
                    {
                        path: "collections",
                        element: <SearchCollections/>
                    }
                ]
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
                <ScrollToTop/>
                <Header/>
                <Outlet/>
            </>
        ),
        children: [
            {
                index: true,
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

