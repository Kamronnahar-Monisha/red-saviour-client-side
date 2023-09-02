import React, { useEffect, useState } from 'react';
import './ProfilePost.css';

const ProfilePost = ({ post,profileOwner }) => {
    const [type, setType] = useState('');

    // blood type transformation (short form to actual form) 
    useEffect(() => {
        let bloodType = post.bloodType?.toUpperCase();
        if (bloodType[bloodType.length - 1] === 'P') {
            bloodType = bloodType.slice(0, -1) + ' +';
        }
        else {
            bloodType.pop();
            bloodType += ' -';
        }
        setType(bloodType);
    }, [post.bloodType])


    return (
        <div className='col-12 rounded box-shadow p-3'>
            <div className="row justify-content-between">
                <div className='col-lg-6 order-2 order-lg-1'>
                    <p className='fs-6 fw-semibold'>Posted by <span className='text-success'>{profileOwner.name}</span></p>
                    <p>Required Blood group: {type}</p>
                    <p>Blood Amount(in bags): {post.bloodAmount} bags</p>
                    <p>Reason : {post.reason}</p>
                    <p>Hospital Address: {post.hospitalAddress}</p>
                    <p>Date: {post.donationDate}</p>
                </div>
                <div className='col-lg-3 order-1 order-lg-2 mb-2 mb-lg-0'>
                    <button className='btn btn-sm btn-warning me-3'>{post.status}</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePost;