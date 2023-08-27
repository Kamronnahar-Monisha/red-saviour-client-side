import React, { useEffect, useState } from 'react';
import './EachPost.css';

const EachPost = ({ post, user }) => {
    const [patientDetails, setPatientDetails] = useState({});
    const [userStatusInThisPost, setUserStatusInThisPost] = useState('');
    const [type, setType] = useState('');

    //fetching user by id from post's patient id
    useEffect(() => {
        fetch(`http://localhost:5000/users?id=${post.patient}`)
            .then(res => res.json())
            .then(data => {
                setPatientDetails(data);

                // blood type transformation (short form to actual form) 
                let bloodType = post.bloodType?.toUpperCase();
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
                // user donation status for each post
                const userExistenceInPostDonorsList = post.donors.find(donor => donor.donorId === user._id);
                if (userExistenceInPostDonorsList) {
                    setUserStatusInThisPost(userExistenceInPostDonorsList.status);
                }
                console.log(userExistenceInPostDonorsList);
            });
    }, [post.patient, post.bloodType, post.donors, user._id])


    //handler for interested button
    function handleInterested() {
        const donor = {
            donorId: user._id,
            status: 'interested',
            rating: 0,
            feedback: ''
        };

        fetch(`http://localhost:5000/update-donors?id=${post._id}&purpose=add`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ donor })
        })
            .then(res => res.json())
            .then((data => {
                if (data[0].acknowledged) {
                    console.log(data);
                    setUserStatusInThisPost(data[1].status);
                }
            }))
            .catch(error => alert(error.massage));
    }

    console.log(post);
    return (
        <div className='col-10 theme-color-shadow p-5 rounded'>
            <div className="row justify-content-between">
                <div className='col-6'>
                    <p className='fs-6 fw-semibold'>Posted by {patientDetails.name}</p>
                    <p>Required Blood group: {type}</p>
                    <p>Blood Amount(in bags): {post.bloodAmount} bags</p>
                    <p>Reason : {post.reason}</p>
                    <p>Hospital Address: {post.hospitalAddress}</p>
                    <p>Date: {post.donationDate}</p>
                    {
                        userStatusInThisPost.length ?
                            <button className='btn btn btn-secondary'>{userStatusInThisPost}</button>
                            :
                            <button className='btn btn btn-success' onClick={handleInterested}>Interested</button>
                    }
                </div>
                <div className='col-3'>
                    <button className='btn btn-sm btn-warning me-3'>{post.status}</button>
                    <button className='btn btn-sm btn-danger'>Report</button>
                </div>
            </div>
        </div>
    );
};

export default EachPost;