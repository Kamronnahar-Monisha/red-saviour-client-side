import React, { useContext, useEffect, useState } from 'react';
import './Feed.css';
import { AuthContext } from '../../../Context/AuthProvider';
import EachPost from '../EachPost/EachPost';
import Loader from '../../Shared/Loader/Loader';
import { Helmet } from 'react-helmet';

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
            .then(data => {
                data = data.filter(eachPost => eachPost.status !== 'closed');
                const postFromDhaka = data.filter(eachPost => eachPost.division === 'dhaka');
                const sortedPostFromDhaka = postFromDhaka.sort((a, b) => (a.donationDate > b.donationDate) ? 1 : (a.donationDate < b.donationDate) ? -1 : 0);
                const sortedPostFromDhakaWithoutWaitingStatus = sortedPostFromDhaka.filter(eachPost => eachPost.status !== 'waiting');
                const sortedPostFromDhakaOfWaitingStatus = sortedPostFromDhaka.filter(eachPost => eachPost.status === 'waiting');
                const postFromOtherDivision = data.filter(eachPost => eachPost.division !== 'dhaka');
                const sortedPostFromOtherDivision = postFromOtherDivision.sort((a, b) => (a.donationDate > b.donationDate) ? 1 : (a.donationDate < b.donationDate) ? -1 : 0);
                const sortedPosFromOtherDivisionWithoutWaitingStatus = sortedPostFromOtherDivision.filter(eachPost => eachPost.status !== 'waiting');
                const sortedPostFromOtherDivisionOfWaitingStatus = sortedPostFromOtherDivision.filter(eachPost => eachPost.status === 'waiting');
                const finalSortedPost = [...sortedPostFromDhakaWithoutWaitingStatus, ...sortedPosFromOtherDivisionWithoutWaitingStatus, ...sortedPostFromDhakaOfWaitingStatus, ...sortedPostFromOtherDivisionOfWaitingStatus];
                console.log(finalSortedPost);
                setPostsWithSameBloodType(finalSortedPost);
            });
    }, [userDetails.bloodType, userDetails._id])


    return (
        <div className='container py-5'>
            <Helmet>
                <title>Feed</title>
            </Helmet>
            <div className="row justify-content-center gy-5">
                {
                    postsWithSameBloodType.map(post => <EachPost key={post._id} post={post} user={userDetails}></EachPost>)

                }
            </div>
        </div>
    );
};

export default Feed;