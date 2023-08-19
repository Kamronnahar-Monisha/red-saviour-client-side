import React from 'react';
import './Login.css';
import loginImg from '../../images/login-img.gif';

const Login = () => {
    return (
        <div className='container py-5'>
            <div className="row justify-content-around align-items-center pb-5 pt-4 gy-5">
                <div className="col-lg-5">
                    <img src={loginImg} alt="A girl log in a website" className='w-100' />
                </div>
                <div className="col-lg-5">
                    <div className='rounded p-5 theme-color-shadow'>
                        <h3 className='theme-color-red fw-bolder'>Please Sign In !!</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;