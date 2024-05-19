import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EachProfileReport = ({report,handleResolve}) => {
    const [repotedProfileDetails,setRepotedProfileDetails] = useState({});

    useEffect(()=>{
        fetch(`https://red-saviour-server-side.onrender.com/users?id=${report.repotedId}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setRepotedProfileDetails(data);
        })
        .catch(error=>console.log(error));
    },[report.repotedId])

    return (
        <div className="row p-2 border-bottom gy-2" >
            <div className="col-12 col-lg-8">
                <Link to={`/profile/${repotedProfileDetails.email}`} className='text-decoration-none text-dark'>{report.repotedId}</Link>
            </div>
            <div className="col-6 col-lg-2">
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
        </div>

    );
};

export default EachProfileReport;