import React, { useEffect, useState } from 'react';
import './EachDonor.css';

const EachDonor = ({ post, currentDonor, postsRefetch }) => {
    const [donorDetails, setDonorDetails] = useState({});

    //fetching donor details
    useEffect(() => {
        fetch(`http://localhost:5000/users?id=${currentDonor.donorId}`)
            .then(res => res.json())
            .then(data => setDonorDetails(data))
            .catch(error => console.log(error))
    }, [currentDonor.donorId])


    //handle shortlist button and remove button
    const handleDonorList = (shortListStatus) => {
        const donor = {
            donorId: currentDonor.donorId,
            status: shortListStatus,
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
                    postsRefetch();
                }
            }))
            .catch(error => alert(error.massage));

    }


    //handle delete button
    const handleDelete = () => {
        const donor = currentDonor;
        fetch(`http://localhost:5000/update-donors?id=${post._id}&purpose=delete`, {
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
                    postsRefetch();
                }
            }))
            .catch(error => alert(error.massage));
    }

    return (
        <>
            {
                    <div className='col-12 my-2 rounded p-2 shadow'>
                        <div className="row gy-2">
                            <div className="col-3 col-lg-1">
                                <img className="rounded-circle me-3" height="40" width="40" src={donorDetails.photoURL} alt="donor" />
                            </div>
                            <div className="col-8 col-lg-4">
                                <p className='text-muted'>{donorDetails.name}</p>
                            </div>
                            {
                                (donorDetails.status === 'confirmed') && (post._id !== donorDetails.donatedPost) ?
                                    <div className="col-12 col-lg-5">
                                        <button className="btn btn-sm btn-secondary">Already selected to another post</button>
                                    </div>
                                    :
                                    <div className="col-12 col-lg-7 ">
                                        {
                                            currentDonor.status === 'interested' ?
                                                <button className="btn btn-sm btn-primary" onClick={() => handleDonorList('shortlisted')}>Short list</button>
                                                :
                                                <button className="btn btn-sm btn-secondary">{currentDonor.status}</button>
                                        }
                                        <button className="ms-3 btn btn-sm btn-warning" onClick={() => handleDonorList('interested')}>Remove</button>
                                        <button className="ms-lg-3 mt-2 mt-lg-0 btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
                                    </div>
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export default EachDonor;