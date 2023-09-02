import React from 'react';
import './DonationBenefit.css';
import enjoyImg from '../../../images/enjoy.png';
import chekUpImg from '../../../images/check-up.png';
import healthImg from '../../../images/health.png';
import helpImg from '../../../images/help.png';
import researchImg from '../../../images/Research.png';

const DonationBenefit = () => {
    return (
        <div className='container my-5'>
            <div className="row justify-content-center gy-5">
                <div className="col-lg-10 box-shadow rounded p-5 benefit-box">
                    <div className="row justify-content-around align-items-center">
                        <div className="col-5">
                            <h4 className='fw-bold text-danger'>Sense of Fulfillment</h4>
                            <p className='benefit-paragraph'>Donating blood is a selfless act that directly contributes to saving lives. Many donors experience a strong sense of fulfillment and satisfaction knowing that their donation has made a positive impact on someone's health and well-being.</p>
                        </div>
                        <div className="col-4">
                            <img src={enjoyImg} alt="girl jumping with joy" className='w-100' />
                        </div>
                    </div>
                </div>
                <div className="col-lg-10 box-shadow rounded p-5 benefit-box">
                    <div className="row justify-content-around align-items-center">
                        <div className="col-5 order-2">
                            <h4 className='fw-bold text-danger'>Community Impact</h4>
                            <p className='benefit-paragraph'>Blood donation is a way to give back to the community. By donating blood, individuals contribute to the overall health and safety of their community. This act of generosity fosters a sense of unity and shared responsibility among community members.</p>
                        </div>
                        <div className="col-4 order-1">
                            <img src={helpImg} alt="girl jumping with joy" className='w-100' />
                        </div>
                    </div>
                </div>
                <div className="col-lg-10 box-shadow rounded p-5 benefit-box">
                    <div className="row justify-content-around align-items-center">
                        <div className="col-5">
                            <h4 className='fw-bold text-danger'>Health Benefits</h4>
                            <p className='benefit-paragraph'>Regular blood donation may have health benefits for donors as well. Donating blood helps reduce the body's iron levels, which can be beneficial for individuals with high iron levels or a condition called hemochromatosis. Lower iron levels are associated with a reduced risk of certain cardiovascular diseases.</p>
                        </div>
                        <div className="col-4">
                            <img src={healthImg} alt="girl jumping with joy" className='w-100' />
                        </div>
                    </div>
                </div>
                <div className="col-lg-10 box-shadow rounded p-5 benefit-box">
                    <div className="row justify-content-around align-items-center">
                        <div className="col-5 order-2">
                            <h4 className='fw-bold text-danger'>Medical Check-up</h4>
                            <p className='benefit-paragraph'>Before each blood donation, donors typically undergo a basic medical check-up. This includes measuring blood pressure, pulse rate, hemoglobin levels, and sometimes other health indicators. These routine check-ups provide donors with insights into their own health and can lead to the early detection of certain medical conditions.</p>
                        </div>
                        <div className="col-4 order-1">
                            <img src={chekUpImg} alt="girl jumping with joy" className='w-100' />
                        </div>
                    </div>
                </div>
                <div className="col-lg-10 box-shadow rounded p-5 benefit-box">
                    <div className="row justify-content-around align-items-center">
                        <div className="col-5">
                            <h4 className='fw-bold text-danger'>Contribution to Research</h4>
                            <p className='benefit-paragraph'>Donated blood can also be used for medical research purposes, contributing to advancements in healthcare and medical knowledge. Blood samples may be used to study diseases, develop new treatments, and improve medical technologies.</p>
                        </div>
                        <div className="col-4">
                            <img src={researchImg} alt="girl jumping with joy" className='w-100' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationBenefit;