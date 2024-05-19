import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { useLoaderData } from 'react-router-dom';
import ProfilePost from '../ProfilePost/ProfilePost';
import { AuthContext } from '../../../Context/AuthProvider';
import { confirmAlert } from 'react-confirm-alert';
import { addReport } from '../../../hooks/useReport';
import { Helmet } from 'react-helmet';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const profileOwner = useLoaderData();
    const [type, setType] = useState('');
    const [ProfileOwnerPost, setProfileOwnerPost] = useState([]);
    const [userDetails, setUserDetails] = useState([]);


    //user details fetching
    useEffect(() => {
        fetch(`https://red-saviour-server-side.onrender.com/users?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserDetails(data);
            });
    }, [user.email])


    // blood type transformation (short form to actual form) 
    useEffect(() => {
        let bloodType = profileOwner.bloodType?.toUpperCase();
        if (bloodType[bloodType.length - 1] === 'P') {
            bloodType = bloodType.slice(0, -1) + ' +';
        }
        else {
            bloodType.pop();
            bloodType += ' -';
        }
        setType(bloodType);
    }, [profileOwner.bloodType])


    useEffect(() => {
        fetch(`https://red-saviour-server-side.onrender.com/posts?id=${profileOwner._id}`)
            .then(res => res.json())
            .then(data => {
                setProfileOwnerPost(data);
            });
    }, [profileOwner._id])



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
                            reporterId: userDetails._id,
                            repotedId: profileOwner._id,
                            type: "profile",
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



    return (
        <div className='profile m-5'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className="container">
                <div className="row justify-content-around gy-5">
                    <div className="col-12 col-lg-4 rounded box-shadow p-3 fw-semibold align-self-start">
                        <div className="row g-3">
                            <div className="col-8 text-lg-center text-end">
                                <img src={profileOwner.photoURL} alt="blood donation" width="150" height="150" className='rounded-circle' />
                            </div>
                            {
                                (profileOwner.email !== user.email) &&
                                <div className="col-4 text-end">
                                    <button className='btn btn-sm btn-danger' onClick={handleReport}>Report</button>
                                </div>
                            }
                            <div className="col-12 px-5">
                                <div className="ms-lg-4">
                                    <div className="">
                                        <p>Name:  {profileOwner.name}</p>
                                    </div>
                                    <div className="">
                                        <p>Email:  {profileOwner.email}</p>
                                    </div>
                                    <div className="">
                                        <p>Phone:  {profileOwner.phone}</p>
                                    </div>
                                    <div className="">
                                        <p>Division:  {profileOwner.division}</p>
                                    </div>
                                    <div className="">
                                        <p>Address:  {profileOwner.address}</p>
                                        
                                    </div>
                                    <div className="">
                                        <p>Blood Group:  {type}</p>
                                        
                                    </div>
                                    <div className="">
                                        <p>Date Of Birth:  {profileOwner.dateOfBirth}</p>
                                     
                                    </div>
                                    <div className="">
                                        <p>Diabetes:  {profileOwner.diabetes ? "Yes" : "No"}</p>
                                       
                                    </div>
                                    <div className="mb-4">
                                        <p>Smoker:  {profileOwner.smoker ? "Yes" : "No"}</p>
                                     
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-7">
                        <div className="row gy-4">
                            {
                                (ProfileOwnerPost?.length === 0) && <div className='text-center text-success mt-5'>Any Donation request has not been posted yet</div>
                            }
                            {
                                ProfileOwnerPost.map(post => <ProfilePost key={post._id} post={post} profileOwner={profileOwner}></ProfilePost>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;