import React, { useEffect, useState } from 'react';
import './MyPostDetails.css';
import EachDonor from '../EachDonor/EachDonor';
import { toast } from 'react-hot-toast';
import ConfirmedDonor from '../ConfirmedDonor/ConfirmedDonor';

const MyPostDetails = ({ post, userDetails, index, postsRefetch, setEachPost }) => {
    const [type, setType] = useState('');
    const confirmedUsers = post?.donors?.filter(donor => donor.status === 'confirmed');


    useEffect(() => {
        let bloodType = post.bloodType.toUpperCase();
        if (bloodType[bloodType.length - 1] === 'P') {
            bloodType = bloodType.slice(0, -1) + ' +'
        }
        else {
            bloodType.pop();
            bloodType += ' -'
        }
        setType(bloodType);
    }, [post.bloodType])




    //confirm button handler
    const handleConfirm = () => {
        const donor = {
            status: 'confirm'
        }
        //convert all shortlisted donor to confirmed donor
        fetch(`http://localhost:5000/update-donors?id=${post._id}&purpose=confirm`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(donor)
        })
            .then(res => res.json())
            .then((data => {
                if (data[0].acknowledged) {
                    console.log(data);
                    //updating post status to waiting
                    fetch(`http://localhost:5000/update-post-status?id=${post._id}&status=waiting`, {
                        method: 'PATCH',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then((data => {
                            if (data.acknowledged) {
                                console.log(data);
                                //update users status to confirmed to the all confirmed donor
                                fetch(`http://localhost:5000/update-users-status?id=${post._id}&status=confirmed`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-type': 'application/json'
                                    }
                                })
                                    .then(res => res.json())
                                    .then((data => {
                                        console.log(data);
                                    }))
                                    .catch(error => console.log(error.massage));
                                toast.success("You have successfully confirmed all the short listed donor.")
                                postsRefetch();
                            }
                        }))
                        .catch(error => console.log(error.massage));
                }
            }))
            .catch(error => console.log(error.massage));
    }


    return (
        <div className='col-10 box-shadow p-5 rounded'>
            <div className="row justify-content-between">
                <div className='col-6'>
                    <p className='fs-4 fw-semibold text-success'>Posted by <span className='text-success'>{userDetails.name}</span></p>
                    <p>Required Blood group: {type}</p>
                    <p>Blood Amount(in bags): {post.bloodAmount} bags</p>
                    <p>Reason : {post.reason}</p>
                    <p>Hospital Address: {post.hospitalAddress}</p>
                    <p>Date: {post.donationDate}</p>
                </div>
                <div className='col-4'>
                    <button className='btn btn-sm btn-warning me-3'>{post.status}</button>
                </div>
            </div>
            {
                (post.status !== 'closed') ?
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button border border-success accordion-custom-style" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="true" aria-controls={"collapse" + index}>
                                    Select Donor
                                </button>
                            </h2>
                            <div id={"collapse" + index} className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="row">
                                        {
                                            post.donors.map(donor => <EachDonor key={post._id} post={post} currentDonor={donor} postsRefetch={postsRefetch}></EachDonor>)
                                        }
                                    </div>
                                    {
                                        post.donors.length ?
                                            <div className='mt-3'>
                                                <button className="btn btn-success" onClick={handleConfirm}>
                                                    {
                                                        (post.status === 'waiting') ?
                                                            'Re-confirm'
                                                            :
                                                            'Confirm'
                                                    }
                                                </button>
                                                <button onClick={() => setEachPost(post)} className='btn btn-secondary ms-3' data-bs-toggle="modal" data-bs-target="#closedButtonModal">Close Post</button>
                                            </div>
                                            :
                                            <div className='mt-3'>
                                                <p className='text-center text-success fs-5'>
                                                    Sorry this post don't have any interested donor yet.
                                                </p>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        {
                            (confirmedUsers.length !== 0) && <h5 className='mt-3 mb-2 text-success'>All Selected Donors:</h5>
                        }
                        <div className="row">
                            {
                                confirmedUsers?.map(donor => <ConfirmedDonor key={donor.donorId} donor={donor}></ConfirmedDonor>)
                            }
                        </div>
                        <button className='btn btn-secondary mt-3'>Post Closed</button>
                    </div>
            }
        </div>
    );
};

export default MyPostDetails;