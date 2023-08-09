import React from 'react';
import './Showcase.css';
import { Link } from 'react-router-dom';
import showcaseImg from './../../../images/showcase-image.svg';

const Showcase = () => {
    return (
        <div>
            <div className='container'>
                <div className="row justify-content-between align-items-center">
                    <div className="col-lg-5 order-2 order-lg-1 text-center text-lg-start">
                        <p className="fs-4 m-0 p-0">Be the reason for someone's heartbeat...</p>
                        <h1 className="fw-bolder"><span className='theme-color-red heading-highlight'>A single drop</span> of blood </h1>
                        <h1 className="fw-bolder">can make a <span className='theme-color-red heading-highlight'>huge difference</span></h1>
                        <p className='py-2 pe-3 showcase-paragraph'>
                            It is said that blood is one of the most priceless gifts one can give to another. Blood is essential for a person to stay alive. People who step up to donate their blood are real-life superheroes.
                        </p>
                        <Link to="/services" className='btn-custom rounded'>Get Blood</Link>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2">
                        <img src={showcaseImg} alt="blood donation" className='w-100' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Showcase;