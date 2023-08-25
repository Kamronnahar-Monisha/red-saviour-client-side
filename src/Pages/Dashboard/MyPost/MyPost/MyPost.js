import React, { useContext, useEffect, useState } from 'react';
import './MyPost.css';
import { AuthContext } from '../../../../Context/AuthProvider';
import MyPostDetails from '../MyPostDetails/MyPostDetails';

const MyPost = () => {
    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});
    const [myPosts, setMyPosts] = useState([]);

    //fetching user full details
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserDetails(data);
                fetch(`http://localhost:5000/posts?id=${userDetails._id}`)
                    .then(res => res.json())
                    .then(data => setMyPosts(data));
            });
    }, [user.email,userDetails._id])

    return (
        <div className='container py-5'>
            <div className="d-flex justify-content-center">
                {
                    myPosts.map(myPost => <MyPostDetails key={myPost._id} post={myPost} userDetails={userDetails}></MyPostDetails>)
                }
            </div>
        </div>
    );
};

export default MyPost;