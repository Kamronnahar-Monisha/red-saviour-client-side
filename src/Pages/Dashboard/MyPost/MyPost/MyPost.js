import React, { useContext, useEffect, useState } from 'react';
import './MyPost.css';
import { AuthContext } from '../../../../Context/AuthProvider';
import MyPostDetails from '../MyPostDetails/MyPostDetails';
import Loader from '../../../Shared/Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import CloseButtonModal from '../CloseButtonModal/CloseButtonModal';

const MyPost = () => {
    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});
    const [eachPost, setEachPost] = useState({});

    //fetching user full details
    useEffect(() => {
        fetch(`https://red-saviour-server-side.onrender.com/users?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserDetails(data);
            });
    }, [user.email])

    const { data: myPosts = [], refetch, isLoading } = useQuery({
        queryKey: ['myPosts', userDetails._id],
        queryFn: async () => {
            const res = await fetch(`https://red-saviour-server-side.onrender.com/posts?id=${userDetails._id}`);
            const data = await res.json();
            console.log(data);
            return data;
        }
    });

    return (
            <div className='container py-5'>
                <div className="row justify-content-center gy-5">
                    {
                        isLoading ?
                            <Loader></Loader>
                            :
                            myPosts.map((myPost, index) => <MyPostDetails key={myPost._id} post={myPost} userDetails={userDetails} index={index} postsRefetch={refetch} setEachPost={setEachPost}></MyPostDetails>)

                    }
                </div>
                <CloseButtonModal eachPost={eachPost} postsRefetch={refetch} ></CloseButtonModal>
            </div>
    );
};

export default MyPost;