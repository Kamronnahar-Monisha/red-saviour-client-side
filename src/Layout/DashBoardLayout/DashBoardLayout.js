import React, { useContext, useEffect, useState } from 'react';
import './DashBoardLayout.css';
import { AuthContext } from '../../Context/AuthProvider';
import Header from '../../Pages/Shared/Header/Header';
import Footer from '../../Pages/Shared/Footer/Footer';
import { Link, Outlet } from 'react-router-dom';
import { FaYelp } from 'react-icons/fa';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});

    //fetching user full details
    useEffect(() => {
        fetch(`https://red-saviour-server-side.onrender.com/users?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserDetails(data);
            });
    }, [user.email])


    return (
        <div>
            <Header></Header>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-3 side-nav py-5">
                        <ul>
                            {
                                (userDetails.role === "admin") &&
                                <>
                                    <li className='py-3 fs-5'>
                                        <FaYelp className="theme-color-red me-2" />
                                        <Link to="/dashboard/postsReport" className='text-decoration-none text-dark'>Manage Post Report</Link>
                                    </li >
                                    <li className='py-3 fs-5'>
                                        <FaYelp className="theme-color-red me-2" />
                                        <Link to="/dashboard/profilesReport" className='text-decoration-none text-dark'>Manage Profile Report</Link>
                                    </li>
                                </>
                            }
                            <li className='py-3 fs-5'>
                                <FaYelp className="theme-color-red me-2" />
                                <Link to="/dashboard/MyPosts" className='text-decoration-none text-dark'>My Posts</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;