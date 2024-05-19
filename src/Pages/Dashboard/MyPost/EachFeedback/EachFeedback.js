import React, { useEffect, useState } from 'react';
import './EachFeedback.css';

const EachFeedback = ({ confirmedUser,register,errors }) => {
    const [donorDetails, setDonorDetails] = useState({});
    const textAreaId =confirmedUser.donorId;


    //fetching donor details
    useEffect(() => {
        fetch(`https://red-saviour-server-side.onrender.com/users?id=${confirmedUser.donorId}`)
            .then(res => res.json())
            .then(data => setDonorDetails(data))
            .catch(error => console.log(error))
    }, [confirmedUser.donorId])


    return (
        <div className="col-10">
            <div>
                <img className="rounded-circle me-3" height="40" width="40" src={donorDetails.photoURL} alt="donor" />
                <p className='text-muted d-inline'>{donorDetails.name}</p>
            </div>
            <div className="my-3">
                <textarea type="text" {...register(textAreaId, {
                    required: "feedback is Required",maxLength: 1000
                })} className="form-control" id={textAreaId} />
                {errors.textAreaId && <p className='text-danger'>{errors.textAreaId.message}</p>}
            </div>
        </div>
    );
};

export default EachFeedback;