import React, { useEffect, useState } from 'react';
import './ConfirmedDonor.css';

const ConfirmedDonor = ({ donor }) => {
    const [donorDetails, setDonorDetails] = useState({});

    //fetching donor details
    useEffect(() => {
        fetch(`http://localhost:5000/users?id=${donor.donorId}`)
            .then(res => res.json())
            .then(data => setDonorDetails(data))
            .catch(error => console.log(error))
    }, [donor.donorId])

    return (
        <div className='col-8'>
                    <img className="rounded-circle me-2" height="40" width="40" src={donorDetails.photoURL} alt="donor" />
                    <p className='text-muted ms-2 d-inline'>{donorDetails.name}</p>
        </div>
    );
};

export default ConfirmedDonor;