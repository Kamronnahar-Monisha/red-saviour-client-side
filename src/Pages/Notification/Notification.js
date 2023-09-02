import React, { useContext, useEffect, useState } from 'react';
import './Notification.css';
import { BsFillBellFill } from "react-icons/bs";
import { AuthContext } from '../../Context/AuthProvider';
import { Link } from 'react-router-dom';

const Notification = () => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [userDetails, setUserDetails] = useState([]);

    //fetching user full details
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserDetails(data);
                fetch(`http://localhost:5000/notifications?id=${userDetails._id}`)
                    .then(res => res.json())
                    .then(data => setNotifications(data))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }, [user.email, userDetails._id])



    return (
        <div className="notification minimum-height">
            <div className='container'>
                <div className="row justify-content-center gy-3 my-5">
                    {
                        notifications?.length ?
                            <>
                                {
                                    notifications.map(notification => {
                                        return <div className="col-6 box-shadow rounded text-center p-2">
                                            <span className='text-success fs-4 mx-3'><BsFillBellFill /></span>
                                            You are selected for a
                                            <Link to={`/post/${notification.postId}`} className='text-decoration-none'>
                                                <span className='mx-2 text-success'>Donation Post</span>
                                            </Link>
                                            on   {notification.donationDate}
                                        </div>
                                    })
                                }
                            </>
                            :
                            <h5 className='text-success text-center m-0'>
                                There is no notification in this moment for you .
                            </h5>
                    }
                </div>
            </div>
        </div>
    );
};

export default Notification;