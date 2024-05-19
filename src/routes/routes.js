import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Main from "../Layout/Main";
import DonationProcess from "../Pages/DonationProcess/DonationProcess/DonationProcess";
import DonationBenefit from "../Pages/DonationBenefit/DonationBenefit/DonationBenefit";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Post from "../Pages/Post/Post";
import Profile from "../Pages/Profile/Profile/Profile";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "../routes/PrivateRoute/PrivateRoute";
import Feed from "../Pages/Feed/Feed/Feed";
import Notification from "../Pages/Notification/Notification";
import MyPost from "../Pages/Dashboard/MyPost/MyPost/MyPost";
import DashboardLayout from "../Layout/DashBoardLayout/DashBoardLayout";
import AllPostReports from "../Pages/Dashboard/AllPostReports/AllPostReports";
import AllProfileReports from "../Pages/Dashboard/AllProfileReports/AllProfileReports";
import PostDetails from "../Pages/PostDetails/PostDetails";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/post',
                element: <PrivateRoute> <Post></Post></PrivateRoute>
            },
            {
                path: '/feed',
                element: <PrivateRoute> <Feed></Feed></PrivateRoute>
            },
            {
                path: '/notification',
                element: <PrivateRoute><Notification></Notification></PrivateRoute>
            },
            {
                path: '/donationBenefit',
                element: <DonationBenefit></DonationBenefit>
            },
            {
                path: '/donationProcess',
                element: <DonationProcess></DonationProcess>
            },
            {
                path: "/profile/:email",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>,
                loader: async ({ params }) => {
                    return fetch(`https://red-saviour-server-side.onrender.com/user/${params.email}`);
                }
            },
            {
                path: "/post/:id",
                element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
                loader: async ({ params }) => {
                    return fetch(`https://red-saviour-server-side.onrender.com/post/${params.id}`);
                }
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/MyPosts',
                element: <MyPost></MyPost>
            },
            {
                path: '/dashboard/postsReport',
                element: <AllPostReports></AllPostReports>
            },
            {
                path: '/dashboard/profilesReport',
                element: <AllProfileReports></AllProfileReports>
            },
        ]
    },
    {
        path: "*",
        element: <PageNotFound></PageNotFound>,
    },
]);

