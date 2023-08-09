import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Main from "../Layout/Main";
import DonationProcess from "../Pages/DonationProcess/DonationProcess/DonationProcess";
import DonationBenefit from "../Pages/DonationBenefit/DonationBenefit/DonationBenefit";


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
                path: '/donationProcess',
                element: <DonationProcess></DonationProcess>
            },
            {
                path: '/donationBenefit',
                element: <DonationBenefit></DonationBenefit>
            },
        ]
    },
    {
        path: "*",
        element: <PageNotFound></PageNotFound>,
    },
]);
