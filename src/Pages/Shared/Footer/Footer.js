import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../../images/main logo_Main Icon.png';
import { FaFacebookSquare, FaWhatsappSquare, FaInstagramSquare } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='footer py-3 text-white text-center text-lg-start'>
            <div className="container">
                <div className="row justify-content-around align-items-center gy-5">
                    <div className="col-lg-4">
                        <Link className="navbar-brand" to="/home">
                            <img src={logo} alt="logo" className='col-2'/>
                            <span className='logo-text ms-2'>Red Saviour</span>
                        </Link>
                        <p className='mt-1'>
                            Connecting Hearts, Saving Lives: Together through Red Saviour.
                        </p>
                        <div className='fs-3'>
                            <a href="https://www.facebook.com/kamronnahar.monisha/" target="_blank" rel="noreferrer">
                                <FaFacebookSquare className="text-white sicon" />
                            </a>
                            <a href="https://www.instagram.com/kamronnahar_monisha/" target="_blank" rel="noreferrer">
                                <FaWhatsappSquare className='text-white ms-4 sicon' />
                            </a>
                            <a href="https://www.instagram.com/kamronnahar_monisha/" target="_blank" rel="noreferrer">
                                <FaInstagramSquare className='text-white ms-4 sicon' />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <h5 className='mb-lg-4 mb-2'>Quick Link</h5>
                        <Link className="text-decoration-none text-white d-block mb-2" to='/'>Home</Link>
                        <Link className="text-decoration-none text-white d-block mb-2" to="/donationProcess">Donation Process</Link>
                        <Link className="text-decoration-none text-white d-block mb-2" to="/donationBenefit">Donation Benefit</Link>
                    </div>
                    <div className="col-lg-2">
                        <h5 className='mb-lg-4 mb-2'>Donation</h5>
                        <Link className="text-decoration-none text-white d-block mb-2">About</Link>
                        <Link className="text-decoration-none text-white d-block mb-2" to="/feed">Feed</Link>
                        <Link className="text-decoration-none text-white d-block mb-2">Terms & Condition</Link>
                    </div>
                    <div className="col-lg-2">
                        <h5 className='mb-lg-4 mb-2'>HelpLine</h5>
                        <Link className="text-decoration-none text-white d-block mb-2">Support Center</Link>
                        <Link className="text-decoration-none text-white d-block mb-2">Feedback</Link>
                        <Link className="text-decoration-none text-white d-block mb-2">Accessability</Link>
                    </div>
                </div>
                <div className='text-center'>
                    Copyright © 2022 <span className='theme-color'>Red Saviour</span>. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default Footer;