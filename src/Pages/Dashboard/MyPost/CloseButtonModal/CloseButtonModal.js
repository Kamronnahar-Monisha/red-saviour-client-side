import React from 'react';
import './CloseButtonModal.css';
import { useForm } from 'react-hook-form';

const CloseButtonModal = ({eachPost}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    console.log(eachPost);


    const handleModalSubmitButton =()=>{

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
                            <h4 className='theme-color-red'>Please give your feedback about the donors</h4>
                            <form onSubmit={handleSubmit(handleModalSubmitButton)}>
                                
                                <div className='text-center'>
                                    <button type="submit" className="btn-custom rounded" data-bs-dismiss="modal">Submit</button>
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