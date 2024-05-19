import React from 'react';
import './AllPostReports.css';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Shared/Loader/Loader';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AllPostReports = () => {

    const { data: allPostReports = [], refetch, isLoading } = useQuery({
        queryKey: ['allPostReports'],
        queryFn: async () => {
            const res = await fetch(`https://red-saviour-server-side.onrender.com/reports?type=post`);
            const data = await res.json();
            return data;
        }
    });

    //handle resolve
    const handleResolve = (id) => {
        fetch(`https://red-saviour-server-side.onrender.com/report?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data => {
                console.log(data);
                refetch();
            }))
            .catch(error => console.log(error.massage));
    }

    //handle Delete
    const handleDelete = (reportId, postId) => {
        fetch(`https://red-saviour-server-side.onrender.com/report?id=${reportId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then((data => {
                console.log(data);
                refetch();
            }))
            .catch(error => console.log(error.massage));
        fetch(`https://red-saviour-server-side.onrender.com/post?id=${postId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then((data => {
                console.log(data);
            }))
            .catch(error => console.log(error.massage));
    }

    return (
        <div>
            <Helmet>
                <title>All Post Reports</title>
            </Helmet>
            {
                isLoading ?
                    <Loader></Loader>
                    :
                    <div className='w-75 box-shadow py-3 rounded ms-5 my-5'>
                        <div className='ms-2 text-center'>
                            <p className='text-success'>
                                Manage Reported Posts
                            </p>
                        </div>
                        <div className='px-5 py-1'>
                            <div className="row text-muted p-2 border-bottom">
                                <div className="col-12 col-lg-8">
                                    Post Id
                                </div>
                                <div className="col-2 d-none d-lg-block text-success">
                                    Resolve
                                </div>
                                <div className="col-2 d-none d-lg-block text-danger">
                                    Delete
                                </div>
                            </div>
                            {
                                allPostReports.length ?
                                    <>
                                        {
                                            allPostReports.map(report => {
                                                return <div className="row p-2 border-bottom gy-2">
                                                    <div className=" col-12 col-lg-8 ">
                                                        <Link to={`/post/${report.repotedId}`} className='text-decoration-none text-dark'>{report.repotedId}</Link>
                                                    </div>
                                                    <div className=" col-6 col-lg-2">
                                                        {
                                                            report.resolve ?
                                                                <button className="btn btn-sm btn-secondary">
                                                                    Resoled
                                                                </button>
                                                                :
                                                                <button className="btn btn-sm btn-success" onClick={() => { handleResolve(report._id) }}>
                                                                    Resole
                                                                </button>
                                                        }
                                                    </div>
                                                    <div className="col-6 col-lg-2 text-danger">
                                                        {
                                                            <button className="btn btn-sm btn-danger" onClick={() => { handleDelete(report._id, report.repotedId) }}>
                                                                Delete
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </>
                                    :
                                    <div className='text-center text-muted mt-2'>
                                        There is no report at this moment.
                                    </div>
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default AllPostReports;