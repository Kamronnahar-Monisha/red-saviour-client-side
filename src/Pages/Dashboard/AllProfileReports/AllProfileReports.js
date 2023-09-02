import React from 'react';
import './AllProfileReports.css';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Shared/Loader/Loader';
import { Link } from 'react-router-dom';
import EachProfileReport from './EachProfileReport';
import { Helmet } from 'react-helmet';

const AllProfileReports = () => {
    const { data: allProfileReports = [], refetch, isLoading } = useQuery({
        queryKey: ['allProfileReports'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/reports?type=profile`);
            const data = await res.json();
            return data;
        }
    });


    //handle resolve
    const handleResolve = (id) => {
        fetch(`http://localhost:5000/report?id=${id}`, {
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

    return (
        <div>
            <Helmet>
                <title>All Profile Reports</title>
            </Helmet>
            {
                isLoading ?
                    <Loader></Loader>
                    :
                    <div className='w-75 box-shadow py-3 rounded ms-5 my-5'>
                        <div className='ms-2 text-center'>
                            <p className='text-success'>
                                Manage Reported Profile
                            </p>
                        </div>
                        <div className='px-5 py-1'>
                            <div className="row text-muted p-2 border-bottom">
                                <div className="col-12 col-lg-8">
                                    Profile Id
                                </div>
                                <div className="col-2 d-none d-lg-block text-success">
                                    Resolve
                                </div>
                            </div>
                            {
                                allProfileReports.length ?
                                    <>
                                        {
                                            allProfileReports.map(report => <EachProfileReport key={report._id} report={report} handleResolve={handleResolve}></EachProfileReport>)
                                        }
                                    </>
                                    :
                                    <div className='text-center text-muted my-2'>
                                        There is no report at this moment.
                                    </div>
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default AllProfileReports;