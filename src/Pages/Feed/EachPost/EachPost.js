import React, { useEffect, useState } from 'react';
import './EachPost.css';

const EachPost = ({ post }) => {
    const [userDetails, setUserDetails] = useState({});
    const [type, setType] = useState('');

    //fetching user by id from post's patient id
    useEffect(() => {
        fetch(`http://localhost:5000/users?id=${post.patient}`)
            .then(res => res.json())
            .then(data => {
                setUserDetails(data);
                let bloodType = userDetails.bloodType?.toUpperCase();
                if (bloodType) {
                    if (bloodType[bloodType.length - 1] === 'P') {
                        bloodType = bloodType.slice(0, -1) + ' +'
                    }
                    else {
                        bloodType.pop();
                        bloodType += ' -'
                    }
                    setType(bloodType);
                }
            });
    }, [post.patient,userDetails.bloodType])

    console.log(post);
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
                    <button className='btn btn btn-success'>Interested</button>
                </div>
                <div>
                    <button className='btn btn-sm btn-warning me-3'>{post.status}</button>
                    <button className='btn btn-sm btn-danger'>Report</button>
                </div>
            </div>
        </div>
    );
};

export default EachPost;