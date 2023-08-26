import React, { useContext, useEffect, useState } from 'react';
import './Feed.css';
import { AuthContext } from '../../../Context/AuthProvider';
import EachPost from '../EachPost/EachPost';
import Loader from '../../Shared/Loader/Loader';

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
        fetch(`http://localhost:5000/posts-list-of-same-blood-type?bloodType=${userDetails.bloodType}&id=${userDetails._id}`)
            .then(res => res.json())
            .then(data => setPostsWithSameBloodType(data));
    }, [userDetails.bloodType, userDetails._id])


    return (
        <div className='container py-5'>
                <div className="row justify-content-center gy-5">
                    {
                        postsWithSameBloodType?
                            postsWithSameBloodType.map(post => <EachPost key={post._id} post={post} user={userDetails}></EachPost>) :
                            <Loader></Loader>
                    }
                </div>
        </div>
    );
};

export default Feed;