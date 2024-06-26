import React, { useEffect, useState } from 'react';
import './PostDetails.css';
import { Link, useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const PostDetails = () => {
    const post = useLoaderData();
    const [patientDetails, setPatientDetails] = useState({});
    const [type, setType] = useState('');

    //fetching user by id from post's patient id
    useEffect(() => {
        fetch(`https://red-saviour-server-side.onrender.com/users?id=${post.patient}`)
            .then(res => res.json())
            .then(data => {
                setPatientDetails(data);

                // blood type transformation (short form to actual form) 
                let bloodType = post.bloodType?.toUpperCase();
                if (bloodType) {
                    if (bloodType[bloodType.length - 1] === 'P') {
                        bloodType = bloodType.slice(0, -1) + ' +';
                    }
                    else {
                        bloodType.pop();
                        bloodType += ' -';
                    }
                    setType(bloodType);
                }
            });
    }, [post.patient, post.bloodType])

    return (
        <div className='w-75 mx-auto my-5 theme-color-shadow p-5 rounded'>
            <Helmet>
                <title>Post Details</title>
            </Helmet>
            <div className="row justify-content-between">
                <div className='col-12 col-lg-6 order-2 order-lg-1'>
                    <p className='fs-6 fw-semibold'>Posted by <Link to={`/profile/${patientDetails.email}`} className='text-success text-decoration-none'>{patientDetails.name}</Link></p>
                    <p>Required Blood group: {type}</p>
                    <p>Blood Amount(in bags): {post.bloodAmount} bags</p>
                    <p>Reason : {post.reason}</p>
                    <p>Hospital Address: {post.hospitalAddress}</p>
                    <p>Date: {post.donationDate}</p>
                </div>
                <div className='col-12 col-lg-3 order-1 order-lg-2'>
                    <button className='btn btn-sm btn-warning me-3'>{post.status}</button>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;