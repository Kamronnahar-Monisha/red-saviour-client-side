import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from './../../../images/logo.png';

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-light navbar-expand-lg py-3">
                <div className="container">
                    <Link className="navbar-brand" to="/home">
                        <img src={logo} alt="logo" className='logo col-3' />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item ms-2 fs-5 fw-medium">
                                <Link className="nav-link text-dark" to="/home">Home</Link>
                            </li>
                            <li className="nav-item ms-2 fs-5 fw-medium text-nowrap">
                                <Link className="nav-link text-dark" to="/blog">Donation Process</Link>
                            </li>
                            {/* {
                                user &&
                                <li className="nav-item ms-3">
                                    <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                                </li>
                            } */}
                            <li className="nav-item">
                                {/* {
                                    user ?
                                        <>
                                            {
                                                (user?.photoURL) ?
                                                    <img width="40" height="40" src={user.photoURL} alt="user" className='rounded-circle me-3'
                                                        title={user.displayName} />
                                                    :
                                                    <FaUserAlt className='me-3'></FaUserAlt>
                                            }
                                            <button className='btn-sm theme-button-outline' onClick={handleLogOut}>Log Out</button>
                                        </>
                                        :
                                        <>
                                            <Link to="/login" className='me-3'>
                                                <button className='btn-sm theme-button'>LogIn</button>
                                            </Link>
                                            <Link to="/register" className=''>
                                                <button className='btn-sm theme-button-outline'>Register</button>
                                            </Link>
                                        </>
                                } */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;