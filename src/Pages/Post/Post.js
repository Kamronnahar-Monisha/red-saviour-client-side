import React, { useContext, useEffect, useState } from 'react';
import './Post.css';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user.email}`)
            .then(res => res.json())
            .then(data => setUserDetails(data));
    }, [user.email])


    const handlePost = (data) => {
        console.log(userDetails);
        console.log(data);
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        const currentDate = year + '-' + month + '-' + dt;
        if (currentDate > data.donationDate) {
            toast.error('You can not post for previous date.');
        }
        else {
            const post = {
                patient: userDetails._id,
                bloodType: data.bloodType,
                bloodAmount: data.bloodAmount,
                reason: data.reason,
                division: data.division,
                hospitalAddress: data.hospitalAddress,
                phone: data.phone,
                donationDate: data.donationDate,
                postDate: currentDate,
                donors: [],
                status: "ongoing"
            };
            reset();
            fetch('http://localhost:5000/post', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(post)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast.success('Successfully added a post .');
                    navigate('/dashboard')
                })
           
        }
    }


    return (
        <div className='d-flex justify-content-center align-items-center mt-5'>
            <div className='col-lg-7'>
                <div className='theme-color-shadow rounded p-5'>
                    <h3 className='theme-color-red fw-bolder text-center mb-5'>Request For Blood</h3>
                    <form onSubmit={handleSubmit(handlePost)}>
                        <div className="mb-3">
                            <label htmlFor="blood-type" className="form-label text-muted fw-bold">Blood Type</label>
                            <select  {...register('bloodType', { required: "Blood Type is required" })} className="form-select" aria-label="Default select" id="blood-type">
                                <option value="aP" selected>A+</option>
                                <option value="aN">A-</option>
                                <option value="bP">B+</option>
                                <option value="bN">B-</option>
                                <option value="oP">O+</option>
                                <option value="oN">O-</option>
                                <option value="abP">AB+</option>
                                <option value="abN">AB-</option>
                            </select>
                            {errors.bloodType && <p className='text-danger'>{errors.bloodType.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bloodAmount" className="form-label text-muted fw-bold">Blood Amount (Bags)</label>
                            <input type="number" {...register("bloodAmount", {
                                required: "Blood Amount is required"
                            })} className="form-control" id="bloodAmount" />
                            {errors.bloodAmount && <p className='text-danger'>{errors.bloodAmount?.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reason" className="form-label text-muted fw-bold">Reason for Blood Request</label>
                            <input type="text" {...register("reason", {
                                required: "Reason for blood request is required"
                            })} className="form-control" id="reason" />
                            {errors.reason && <p className='text-danger'>{errors.reason?.message}</p>}
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
                            <label htmlFor="hospitalAddress" className="form-label text-muted fw-bold">Hospital Address</label>
                            <input type="text" {...register("hospitalAddress", {
                                required: "Hospital Address is required"
                            })} className="form-control" id="hospitalAddress" />
                            {errors.hospitalAddress && <p className='text-danger'>{errors.hospitalAddress?.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label text-muted fw-bold">Phone Number</label>
                            <input type="number" {...register("phone", {
                                required: "phone number is required"
                            })} className="form-control" id="phone" />
                            {errors.phone && <p className='text-danger'>{errors.phone?.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="donationDate" className="form-label text-muted fw-bold">Date of Donation</label>
                            <input type="date" {...register("donationDate", {
                                required: "Date of Donation is Required"
                            })} className="form-control" id="donationDate" />
                            {errors.donationDate && <p className='text-danger'>{errors.donationDate.message}</p>}
                        </div>
                        <button type="submit" className="btn-custom rounded form-control">Add Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Post;