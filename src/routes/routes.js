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
                element:<PrivateRoute> <Post></Post></PrivateRoute>
            },
            {
                path: '/feed',
                element:<PrivateRoute> <Feed></Feed></PrivateRoute>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            },
            {
                path: '/notification',
                element: <Notification></Notification>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: '/donationBenefit',
                element: <DonationBenefit></DonationBenefit>
            },
            {
                path: '/donationProcess',
                element: <DonationProcess></DonationProcess>
            },
        ]
    },
    {
        path: "*",
        element: <PageNotFound></PageNotFound>,
    },
]);

