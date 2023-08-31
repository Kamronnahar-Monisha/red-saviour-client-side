import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className='profile mt-5'>
            <div className="container">
                <div className="row justify-content-around">
                    <div className="col-2 rounded p-0">
                        <img src="https://i.ibb.co/DCjz80J/asraf.jpg" height="200" width="200" className='rounded' alt="user" />
                        <p className='mt-2 font-semibold fs-4'>Asraful Alam</p>
                    </div>
                    <div className="col-8 p-3 rounded">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;