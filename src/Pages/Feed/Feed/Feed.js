import React, { useContext, useEffect, useState } from 'react';
import './Feed.css';
import { AuthContext } from '../../../Context/AuthProvider';
import EachPost from '../EachPost/EachPost';

const Feed = () => {
    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});
    const [postsWithSameBloodType, setPostsWithSameBloodType] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user.email}`)
            .then(res => res.json())
            .then(data => setUserDetails(data));
    }, [user.email])

    useEffect(() => {
        fetch(`http://localhost:5000/posts-list-of-same-blood-type?bloodType=${userDetails.bloodType}&id=${user._id}`)
            .then(res => res.json())
            .then(data => setPostsWithSameBloodType(data));
    }, [userDetails.bloodType, user._id])


    return (
        <div className='container py-5'>
            <div className="d-flex justify-content-center">
                {
                    postsWithSameBloodType.map(post => <EachPost key={post._id} post={post}></EachPost>)
                }
            </div>
        </div>
    );
};

export default Feed;