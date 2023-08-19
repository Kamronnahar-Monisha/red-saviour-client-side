import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import './Register.css';
import registerImg from '../../images/register-img.gif';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [signUpError, setSignUPError] = useState('');
    const { createUser, createProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = (data) => {
        console.log(data);
        setSignUPError('');
        createUser(data.email, data.password)
            .then((result) => {
                reset();
                toast.success('User Created Successfully.');
                console.log(data);
                createProfileInformation(data.name," ", data);
            })
            .catch((error) => {
                setSignUPError(error.message);
            })

    }

    const createProfileInformation = (name, photoURL, data) => {
        const profile = {
            displayName: name,
            photoURL
        }
        createProfile(profile)
            .then(() => {
                 saveUser(data);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }


    const saveUser = (data) => {
        const user = {
         "name": data.name,
         "email": data.email,
         "phone": data.phone,
         "division": data.division,
         "address": data.division,
         "dateOfBirth": data.dateOfBirth,
         "bloodType": data.bloodType,
         "diabetes": data.diabetes,
         "smoker": data.smoker,
         "rating":0,
         "donation":0,
         "Status":"available",
         "donationTime":"",
         "role": "user"
        };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                 console.log(data);
                 navigate('/');
            })
    }

    return (
        <div className='container py-5'>
            <div className="row justify-content-around align-items-center pb-5 pt-4 gy-5">
                <div className="col-lg-6">
                    <img src={registerImg} alt="A girl log in a website" className='w-100' />
                </div>
                <div className="col-lg-5">
                    <div className='theme-color-shadow rounded p-5'>
                        <h3 className='theme-color-red fw-bolder'>Please Register Your Account !!</h3>
                        <form onSubmit={handleSubmit(handleSignUp)}>
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label text-muted fw-bold">Full Name</label>
                                <input type="text" {...register("name", {
                                    required: "Name is Required"
                                })} className="form-control" id="fullName" />
                                {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mail" className="form-label text-muted fw-bold">Email address</label>
                                <input type="email" {...register("email", {
                                    required: "email is Required"
                                })} className="form-control" id="mail" />
                                {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label text-muted fw-bold">Password</label>
                                <input type="password" {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[0-9])/, message: 'Password must have uppercase character and number' }
                                })} className="form-control" id="Password" />
                                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="division" className="form-label text-muted fw-bold">Division</label>
                                <select  {...register('division', { required: "Division is required" })} className="form-select" aria-label="Default select" id="division">
                                    <option value="dhaka" selected>Dhaka</option>
                                    <option value="barishal">Barishal</option>
                                    <option value="chattogram">Chattogram</option>
                                    <option value="khulna">Khulna</option>
                                    <option value="rajshahi">Rajshahi</option>
                                    <option value="mymensing">Mymensingh</option>
                                    <option value="rangpur">Rangpur</option>
                                    <option value="sylhet">Sylhet</option>
                                </select>
                                {errors.division && <p className='text-danger'>{errors.division.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label text-muted fw-bold">Address</label>
                                <input type="text" {...register("address", {
                                    required: "Address is Required"
                                })} className="form-control" id="address" />
                                {errors.address && <p className='text-danger'>{errors.address.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label text-muted fw-bold">Phone Number</label>
                                <input type="number" {...register("phone", {
                                    required: "Phone Number is Required"
                                })} className="form-control" id="phone" />
                                {errors.phone && <p className='text-danger'>{errors.phone.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="date-of-birth" className="form-label text-muted fw-bold">Date Of Birth</label>
                                <input type="date" {...register("dateOfBirth", {
                                    required: "Date Of Birth is Required"
                                })} className="form-control" id="date-of-birth" />
                                {errors.dateOfBirth && <p className='text-danger'>{errors.dateOfBirth.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="blood-type" className="form-label text-muted fw-bold">Blood Type</label>
                                <select  {...register('bloodType', { required: "Blood Type is required" })} className="form-select" aria-label="Default select" id="blood-type">
                                    <option value="a+" selected>A+</option>
                                    <option value="a-">A-</option>
                                    <option value="b+">B+</option>
                                    <option value="b-">B-</option>
                                    <option value="o+">O+</option>
                                    <option value="o-">O-</option>
                                    <option value="ab+">AB+</option>
                                    <option value="ab-">AB-</option>
                                </select>
                                {errors.bloodType && <p className='text-danger'>{errors.bloodType.message}</p>}
                            </div>
                            
                            <div className="mb-3 form-check">
                                <input type="checkbox" {...register("smoker", {
                                })} className="form-check-input" id="smoker" />
                                <label className="form-check-label text-muted" htmlFor="smoker ">Are You a Smoker?</label>
                                {errors.smoker && <p className='text-danger'>{errors.smoker.message}</p>}
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" {...register("diabetes", {
                                })} className="form-check-input" id="diabetes" />
                                <label className="form-check-label text-muted" htmlFor="diabetes">Do you have diabetes</label>
                                {errors.diabetes && <p className='text-danger'>{errors.diabetes.message}</p>}
                            </div>

                            <div className="mb-3 form-check">
                                <input type="checkbox" {...register("condition", {
                                    required: "Term and condition should be accepted"
                                })} className="form-check-input" id="condition" />
                                <label className="form-check-label text-muted" htmlFor="condition ">Accept term and condition</label>
                                {errors.condition && <p className='text-danger'>{errors.condition.message}</p>}
                            </div>
                            <button type="submit" className="btn-custom rounded form-control">Sign Up</button>
                            {signUpError && <p className='text-danger'>{signUpError}</p>}
                        </form>
                        <div className='text-muted my-3 text-center'>
                            Already have an account? Please <Link to='/login' className='theme-color-red text-decoration-none fw-bold register-login-link'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;