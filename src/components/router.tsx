import React from "react";
import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import Header from "./Header";
import UsersPosts from "./UserProfile/UserProfileComponents/UsersPosts";
import UserCollections from "./UserProfile/UserProfileComponents/UserCollections";
import UserAllowedToViewCollections from "./UserProfile/UserProfileComponents/UserAllowedToViewCollections";
import SearchUsers from "./Search/SearchComponents/Users";
import SearchPosts from './Search/SearchComponents/Posts'
import SearchCollections from './Search/SearchComponents/Collections'
import ScrollToTop from "./ScrollToTop";
import FullScreenLoader from "./Loaders/FullScreenLoader";

const Post = React.lazy(() => import( "./Post"));
const Posts = React.lazy(() => import( "./Posts"));
const Settings = React.lazy(() => import( "./Settings"));
const UserProfile = React.lazy(() => import( "./UserProfile"));
const CreatePost = React.lazy(() => import( "./CreatePost"));
const Search = React.lazy(() => import( "./Search"));
const Collection = React.lazy(() => import( "./Collection"));
const Login = React.lazy(() => import( "./Login"));
const Register = React.lazy(() => import( "./Register"));

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
                element: (
                    <>
                        <React.Suspense fallback={<FullScreenLoader withMeta />}>
                            <Posts/>
                        </React.Suspense>
                    </>
                )
            },
            {
                path: "settings",
                element: (
                    <>
                        <React.Suspense fallback={<FullScreenLoader withMeta />}>
                            <Settings/>
                        </React.Suspense>
                    </>
                )
            },
            {
                path: "users/:id",
                element: (
                    <>
                        <React.Suspense fallback={<FullScreenLoader withMeta />}>
                            <UserProfile/>
                        </React.Suspense>
                    </>
                ),
                children: [
                    {
                        index: true,
                        element: <UsersPosts/>,
                    },
                    {
                        path: "collections",
                        element: <UserCollections/>
                    }, {
                        path: "allowedToView",
                        element: <UserAllowedToViewCollections/>
                    },
                ]
            },
            {
                path: "post/create",
                element: (
                    <>
                        <React.Suspense fallback={<FullScreenLoader withMeta />}>
                            <CreatePost/>
                        </React.Suspense>
                    </>
                )
            },
            {
                path: "post/create/:id",
                element: (
                    <>
                        <React.Suspense fallback={<FullScreenLoader withMeta />}>
                            <CreatePost/>
                        </React.Suspense>
                    </>
                )
            },
            {
                path: "posts/:id",
                element: (
                    <>
                        <React.Suspense fallback={<FullScreenLoader withMeta />}>
                            <Post/>
                        </React.Suspense>
                    </>
                )
            },
            {
                path: "collections/:id",
                element: (
                    <>
                        <React.Suspense fallback={<FullScreenLoader withMeta />}>
                            <Collection/>
                        </React.Suspense>
                    </>
                )
            },
            {
                path: "search",
                element: (
                    <>
                        <React.Suspense fallback={<FullScreenLoader withMeta />}>
                            <Search/>
                        </React.Suspense>
                    </>
                ),
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
                element: (
                    <>
                        <React.Suspense fallback={<FullScreenLoader withMeta />}>
                            <Login/>
                        </React.Suspense>
                    </>
                )
            },
            {
                path: "register",
                element: (
                    <>
                        <React.Suspense fallback={<FullScreenLoader withMeta />}>
                            <Register/>
                        </React.Suspense>
                    </>
                )
            },
            {
                path: "settings",
                element: (
                    <>
                        <React.Suspense fallback={<FullScreenLoader withMeta />}>
                            <Settings/>
                        </React.Suspense>
                    </>
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

