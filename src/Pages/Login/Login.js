import React, { useContext, useState } from 'react';
import './Login.css';
import loginImg from '../../images/login-img.gif';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const { logInWithEmailAndPassword, passwordReset } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [UserEmail, setUserEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";


    const handleLogin = (data) => {
        setLoginError('');
        logInWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                reset();
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setLoginError(error.message);
            });
    }


    const handleEmail = (e) => {
        setUserEmail(e.target.value);
    }

    const handleForgotPassword = () => {
        if (UserEmail !== "") {
            passwordReset(UserEmail)
                .then(() => {
                    toast("Password reset link was sent to your mail.");
                })
                .catch((error) => {
                    setLoginError(error.message);
                });
        } else {
            toast.error("Please enter your email!");
        }
    }


    return (
        <div className='container py-5'>
            <Helmet>
                <title>Please Login</title>
            </Helmet>
            <div className="row justify-content-around align-items-center pb-5 pt-4 gy-5">
                <div className="col-lg-5">
                    <img src={loginImg} alt="A girl log in a website" className='w-100' />
                </div>
                <div className="col-lg-5">
                    <div className='rounded p-5 theme-color-shadow'>
                        <h3 className='theme-color-red fw-bolder'>Please Sign In !!</h3>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="mb-3" onChange={handleEmail} >
                                <label htmlFor="email" className="form-label text-muted fw-bold">Email address</label>
                                <input type="email" {...register("email", {
                                    required: "Email Address is required"
                                })} className="form-control" id="email" />
                                {errors.email && <p className='text-danger'>{errors.email?.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-muted fw-bold">Password</label>
                                <input type="password" {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })} className="form-control" id="password" />
                                {errors.password && <p className='text-danger'>{errors.password?.message}</p>}
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label text-muted" htmlFor="exampleCheck1 ">Remember me</label>
                                </div>
                                <div className='mr-4'>
                                    <a className='theme-color-red font-semibold cursor-pointer text-decoration-none' onClick={handleForgotPassword} href="#forgetPassword">Forgot Password?</a>
                                </div>
                            </div>
                            <button type="submit" className="btn-custom rounded form-control">Sign In</button>
                            <div>
                                {loginError && <p className='text-red-600'>{loginError}</p>}
                            </div>
                        </form>
                        <div className='text-muted my-3 text-center'>
                            Don't have a account ? Please <Link to='/Register' className='text-decoration-none theme-color-red fw-bold'>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;