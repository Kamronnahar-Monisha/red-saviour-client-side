import React from 'react';
import './Dashboard.css';
import dashboardImg from '../../../images/dashboard.gif';
import { Helmet } from 'react-helmet';


const Dashboard = () => {
    return (
        <div className='w-75 mx-auto mb-5'>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <img src={dashboardImg} alt="" className='w-75' />
        </div>
    );
};

export default Dashboard;