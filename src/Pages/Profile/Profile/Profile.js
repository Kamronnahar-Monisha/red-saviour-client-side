import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { useLoaderData } from 'react-router-dom';
import ProfilePost from '../ProfilePost/ProfilePost';
import { AuthContext } from '../../../Context/AuthProvider';
import { confirmAlert } from 'react-confirm-alert';
import { addReport } from '../../../hooks/useReport';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const profileOwner = useLoaderData();
    const [type, setType] = useState('');
    const [ProfileOwnerPost, setProfileOwnerPost] = useState([]);
    const [userDetails, setUserDetails] = useState([]);


    //user details fetching
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user.email}`)
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
        fetch(`http://localhost:5000/posts?id=${profileOwner._id}`)
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
            <div className="container">
                <div className="row justify-content-around">
                    <div className="col-5 rounded box-shadow p-3 fw-semibold align-self-start">
                        <div className="row g-3">
                            <div className="col-8 text-center">
                                <img src={profileOwner.photoURL} alt="blood donation" width="150" height="150" className='rounded-circle' />
                            </div>
                            {
                                (profileOwner.email !== user.email) &&
                                <div className="col-4 text-end">
                                    <button className='btn btn-sm btn-danger' onClick={handleReport}>Report</button>
                                </div>
                            }
                            <div className="col-12 px-5">
                                <div className="container">
                                    <div className="row justify-content-around mb-1">
                                        <div className="col-4">Name</div>
                                        <div className="col-7">{profileOwner.name}</div>
                                    </div>
                                    <div className="row justify-content-around mb-1">
                                        <div className="col-4">Email</div>
                                        <div className="col-7">{profileOwner.email}</div>
                                    </div>
                                    <div className="row justify-content-around mb-1">
                                        <div className="col-4">Phone Number</div>
                                        <div className="col-7">{profileOwner.phone}</div>
                                    </div>
                                    <div className="row justify-content-around mb-1">
                                        <div className="col-4">Division</div>
                                        <div className="col-7">{profileOwner.division}</div>
                                    </div>
                                    <div className="row justify-content-around mb-1">
                                        <div className="col-4">Address</div>
                                        <div className="col-7">{profileOwner.address}</div>
                                    </div>
                                    <div className="row justify-content-around mb-1">
                                        <div className="col-4">Blood Group</div>
                                        <div className="col-7">{type}</div>
                                    </div>
                                    <div className="row justify-content-around mb-1">
                                        <div className="col-4">Date Of Birth</div>
                                        <div className="col-7">{profileOwner.dateOfBirth}</div>
                                    </div>
                                    <div className="row justify-content-around mb-1">
                                        <div className="col-4">Diabetes</div>
                                        <div className="col-7">{profileOwner.diabetes ? "Yes" : "No"}</div>
                                    </div>
                                    <div className="row justify-content-around mb-1">
                                        <div className="col-4">Smoker</div>
                                        <div className="col-7">{profileOwner.smoker ? "Yes" : "No"}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='p-5 d-none d-lg-block'>

                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row gy-4">
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