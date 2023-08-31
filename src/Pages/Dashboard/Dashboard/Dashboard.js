import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import MyPost from '../MyPost/MyPost/MyPost';
import { AuthContext } from '../../../Context/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});
   
    //fetching user full details
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserDetails(data);
            });
    }, [user.email])


    return (
        <div>
            {
                (userDetails.role === "admin")&&
                <div>
                    hi
                </div>
            }
             <MyPost></MyPost>
        </div>
    );
};

export default Dashboard;