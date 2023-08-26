import React, { useEffect, useState } from 'react';
import './EachDonor.css';

const EachDonor = ({ post, currentDonor }) => {
    const [donorDetails, setDonorDetails] = useState({});
    const [donorStatus, setDonorStatus] = useState(currentDonor.status);
    const [isDelete, SetIsDelete] = useState(false);

    //fetching donor details
    useEffect(() => {
        fetch(`http://localhost:5000/users?id=${currentDonor.donorId}`)
            .then(res => res.json())
            .then(data => setDonorDetails(data))
            .catch(error => console.log(error))
    }, [currentDonor.donorId])


    //handle shortlist button and remove button
    const handleDonorList = (shortListStatus) => {
        setDonorStatus(shortListStatus);
        const donor = {
            donorId: currentDonor.donorId,
            status: shortListStatus,
            rating: 0,
            feedback: ''
        };

        fetch(`http://localhost:5000/update-donors?id=${post._id}`, {
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
                }
            }))
            .catch(error => alert(error.massage));

    }


    //handle delete button
    const handleDelete = () => {
        const deletePost = true;
        const donor = currentDonor;
        fetch(`http://localhost:5000/update-donors?id=${post._id}&delete=${deletePost}`,{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ donor })
        })
            .then(res => res.json())
            .then((data => {
                SetIsDelete(true);
                if (data[0].acknowledged) {
                    console.log(data);
                }
            }))
            .catch(error => alert(error.massage));
    }

    return (
        <>
            {
                !isDelete &&
                <div className='col-8 my-2 rounded p-2 shadow'>
                    <div className="row">
                        <div className="col-1">
                            <img className="rounded-circle me-3" height="40" width="40" src={donorDetails.photoURL} alt="donor" />
                        </div>
                        <div className="col-4">
                            <p className='text-muted'>{donorDetails.name}</p>
                        </div>
                        <div className="col-7">
                            {
                                donorStatus === 'interested'?
                                    <button className="btn btn-sm btn-primary" onClick={() => handleDonorList('shortlisted')}>Short list</button>
                                    :
                                    <button className="btn btn-sm btn-secondary">{donorStatus}</button>
                            }
                            <button className="ms-3 btn btn-sm btn-warning" onClick={() => handleDonorList('interested')}>Remove</button>
                            <button className="ms-3 btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default EachDonor;