import React, { useEffect, useState } from 'react';
import './MyPostDetails.css';

const MyPostDetails = ({ post, userDetails }) => {
    const [type, setType] = useState('');

    useEffect(() => {
        let bloodType = userDetails.bloodType.toUpperCase();
        if (bloodType[bloodType.length - 1] === 'P') {
            bloodType = bloodType.slice(0, -1) + ' +'
        }
        else {
            bloodType.pop();
            bloodType += ' -'
        }
        setType(bloodType);
    }, [userDetails.bloodType])

    return (
        <div className='col-10 theme-color-shadow p-5 rounded'>
            <div className="d-flex justify-content-between">
                <div>
                    <p className='fs-4 fw-semibold'>Posted by {userDetails.name}</p>
                    <p>Required Blood group: {type}</p>
                    <p>Blood Amount(in bags): {post.bloodAmount} bags</p>
                    <p>Reason : {post.reason}</p>
                    <p>Hospital Address: {post.hospitalAddress}</p>
                    <p>Date: {post.donationDate}</p>
                </div>
                <div>
                    <button className='btn btn-sm btn-warning me-3'>{post.status}</button>
                </div>
            </div>
        </div>
    );
};

export default MyPostDetails;