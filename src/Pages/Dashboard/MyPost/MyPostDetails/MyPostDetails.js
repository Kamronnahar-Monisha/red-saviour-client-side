import React, { useEffect, useState } from 'react';
import './MyPostDetails.css';
import EachDonor from '../EachDonor/EachDonor';

const MyPostDetails = ({ post, userDetails,index }) => {
    const [type, setType] = useState('');

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


    const handleConfirm = ()=>{
        
    }

    return (
        <div className='col-10 theme-color-shadow p-5 rounded'>
            <div className="row justify-content-between">
                <div className='col-6'>
                    <p className='fs-4 fw-semibold'>Posted by {userDetails.name}</p>
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
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button border border-success accordion-custom-style" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+index} aria-expanded="true" aria-controls={"collapse"+index}>
                            Select Donor
                        </button>
                    </h2>
                    <div id={"collapse"+index} className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="row">
                                {
                                    post.donors.map(donor => <EachDonor key={post._id} post={post} currentDonor={donor}></EachDonor>)
                                }
                            </div>
                            <div className='mt-3'>
                                <button className="btn btn-success" onClick={handleConfirm}>Confirm</button>
                                <button className="btn btn-secondary ms-3">Coles Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPostDetails;