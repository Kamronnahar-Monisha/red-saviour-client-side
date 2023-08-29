import React from 'react';
import './CloseButtonModal.css';
import { useForm } from 'react-hook-form';
import EachFeedback from '../EachFeedback/EachFeedback';

const CloseButtonModal = ({ eachPost, postsRefetch }) => {
    const { handleSubmit, reset, register, formState: { errors } } = useForm();
    const confirmedUsers = eachPost?.donors?.filter(donor => donor.status === 'confirmed');


    const handleModalSubmitButton = (data) => {
        fetch(`http://localhost:5000/update-donor-feedback?id=${eachPost._id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ data })
        })
            .then(res => res.json())
            .then((data => {
                if (data.acknowledged) {
                    console.log(data);
                    fetch(`http://localhost:5000/update-post-status?id=${eachPost._id}&status=closed`, {
                        method: 'PATCH',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then((data => {
                            if (data.acknowledged) {
                                console.log(data);
                                reset();
                                postsRefetch();
                            }
                        }))
                        .catch(error => console.log(error.massage));
                }
            }))
            .catch(error => console.log(error.massage));
    }

    return (
        <div>
            <div className="modal fade" id="closedButtonModal" tabindex="-1" aria-labelledby="closedButtonModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className='text-end'>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {
                                (confirmedUsers?.length === 0) ?
                                    <h6 className='theme-color-red'>You didn't confirm any donor.If you close your post it will no longer show on other's feed</h6>
                                    :
                                    <h5 className='theme-color-red'>Please give your feedback about the donors</h5>
                            }
                            <form onSubmit={handleSubmit(handleModalSubmitButton)}>
                                <div className="row justify-content-center">
                                    {
                                        confirmedUsers?.map(confirmedUser => <EachFeedback key={confirmedUser.donorId} confirmedUser={confirmedUser} register={register} errors={errors}></EachFeedback>)
                                    }
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className="btn btn-sm btn-danger mt-2" data-bs-dismiss="modal">Close Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloseButtonModal;