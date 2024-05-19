import React, { useEffect, useState } from 'react';
import './EachPost.css';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { addReport } from '../../../hooks/useReport';

const EachPost = ({ post, user }) => {
    const [patientDetails, setPatientDetails] = useState({});
    const [userStatusInThisPost, setUserStatusInThisPost] = useState('');
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
                // user donation status for each post
                const userExistenceInPostDonorsList = post.donors.find(donor => donor.donorId === user._id);
                if (userExistenceInPostDonorsList) {
                    setUserStatusInThisPost(userExistenceInPostDonorsList.status);
                }
                console.log(userExistenceInPostDonorsList);
            });
    }, [post.patient, post.bloodType, post.donors, user._id])

    const handleInterestedDonorAdd = () => {
        const donor = {
            donorId: user._id,
            status: 'interested',
            rating: 0,
            feedback: ''
        };

        fetch(`https://red-saviour-server-side.onrender.com/update-donors?id=${post._id}&purpose=add`, {
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
            .catch(error => console.log(error.error));
    }


    //handler for interested button
    function handleInterested() {
        if (user.status === 'confirmed') {
            confirmAlert({
                message: `You was confirmed for a donation post on ${user.donationTime}. Did your donation process canceled?`,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            fetch(`https://red-saviour-server-side.onrender.com/update-user-status?id=${user._id}&status=available`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-type': 'application/json'
                                }
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                    handleInterestedDonorAdd();
                                })
                                .catch(error => console.log(error.error))
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {
                            toast.error("You are already selected for another donation. So you can not apply for this donation now.");
                        }
                    }
                ]
            });
        }
        else {
            handleInterestedDonorAdd();
        }
    }


    //handle roport
    const handleReport = () => {
        confirmAlert({
            title: 'Are you sure ?',
            message: 'Does this post speard nudity,false information or hate speech?',
            buttons: [
                {
                    label: 'Yes I agree',
                    onClick: () => {
                        const report = {
                            reporterId: user._id,
                            repotedId: post._id,
                            type: "post",
                            resolve: false
                        }
                        addReport(report);
                    }
                },
                {
                    label: 'Close',
                    onClick: () => {
                    }
                }
            ]
        });
    }


    console.log(post);
    return (
        <div className='col-10 box-shadow p-5 rounded'>
            <div className="row justify-content-between gy-3">
                <div className='col-12 col-lg-6 order-2 order-lg-1'>
                    <p className='fs-6 fw-semibold'>Posted by <Link to={`/profile/${patientDetails.email}`} className='text-success text-decoration-none'>{patientDetails.name}</Link></p>
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
                <div className='col-12 col-lg-3 order-1 order-lg-2'>
                    <button className='btn btn-sm btn-warning me-3'>{post.status}</button>
                    <button className='btn btn-sm btn-danger' onClick={handleReport}>Report</button>
                </div>
            </div>
        </div>
    );
};

export default EachPost;