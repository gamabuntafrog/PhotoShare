import React from "react";
import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import FullScreenLoader from "./Loaders/FullScreenLoader";

const Post = React.lazy(() => import( "./Post"));
const Posts = React.lazy(() => import( "./Posts"));
const Settings = React.lazy(() => import( "./Settings"));
const UserProfile = React.lazy(() => import( "./UserProfile"));
const CreatePost = React.lazy(() => import( "./CreatePost"));
const Search = React.lazy(() => import( "./Search"));
const SearchPosts = React.lazy(() => import( "./Search/SearchComponents/Posts"));
const SearchUsers = React.lazy(() => import( "./Search/SearchComponents/Users"));
const SearchCollections = React.lazy(() => import( "./Search/SearchComponents/Collections"));
const Collection = React.lazy(() => import( "./Collection"));
const Login = React.lazy(() => import( "./Login"));
const Register = React.lazy(() => import( "./Register"));
const UsersPosts = React.lazy(() => import( "./UserProfile/UserProfileComponents/UsersPosts"));
const UserCollections = React.lazy(() => import( "./UserProfile/UserProfileComponents/UserCollections"));
const UserAllowedToViewCollections = React.lazy(() => import( "./UserProfile/UserProfileComponents/UserAllowedToViewCollections"));

const privateRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <ScrollToTop/>
                <Header/>
                <React.Suspense fallback={<FullScreenLoader withMeta/>}>
                    <Outlet/>
                </React.Suspense>
            </>
        ),
        children: [
            {
                index: true,
                element: (
                    <Posts/>
                )
            },
            {
                path: "settings",
                element: (
                    <Settings/>
                )
            },
            {
                path: "users/:id",
                element: (
                    <UserProfile/>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <UsersPosts/>
                        ),
                    },
                    {
                        path: "collections",
                        element: (
                            <UserCollections/>
                        ),
                    }, {
                        path: "allowedToView",
                        element: (
                            <UserAllowedToViewCollections/>
                        ),
                    },
                ]
            },
            {
                path: "post/create",
                element: (
                    <CreatePost/>
                )
            },
            {
                path: "post/create/:id",
                element: (
                    <CreatePost/>
                )
            },
            {
                path: "posts/:id",
                element: (
                    <Post/>
                )
            },
            {
                path: "collections/:id",
                element: (
                    <Collection/>
                )
            },
            {
                path: "search",
                element: (
                    <Search/>
                ),
                children: [
                    {
                        path: "users",
                        element: (
                            <SearchUsers/>
                        ),
                    },
                    {
                        path: "posts",
                        element: (
                            <SearchPosts/>
                        ),
                    },
                    {
                        path: "collections",
                        element: (
                            <SearchCollections/>
                        ),
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
                <React.Suspense fallback={<FullScreenLoader withMeta/>}>
                    <Outlet/>
                </React.Suspense>
            </>
        ),
        children: [
            {
                index: true,
                element: (
                    <Login/>
                )
            },
            {
                path: "register",
                element: (
                    <Register/>
                )
            },
            {
                path: "settings",
                element: (
                    <Settings/>
                )
            },
            {
                path: "*",
                element: <Navigate to='/'/>
            }
        ]
    }
])

export const chooseRouter = (isLoggedIn: boolean) => isLoggedIn ? privateRouter : publicRouter

