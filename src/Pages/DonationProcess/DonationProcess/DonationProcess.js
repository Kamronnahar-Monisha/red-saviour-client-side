import React from 'react';
import './DonationProcess.css';
import registrationImg from '../../../images/regi.png';
import checkupImg from '../../../images/examination.png';
import donationImg from '../../../images/blood.png';
import donationVolumeImg from '../../../images/healthcare.png';
import restImg from '../../../images/clock.png';
import careImg from '../../../images/care.png';
import appreciationImg from '../../../images/appreciation.png';
import frequencyImg from '../../../images/frequency.png';
import noteImg from '../../../images/notes.png';
import { Helmet } from 'react-helmet';



const DonationProcess = () => {
    return (
        <div className='container'>
            <Helmet>
                <title>Donation Process</title>
            </Helmet>
            <div className="row justify-content-center py-5 gy-5">
                <div className="col-10">
                    <div className="row justify-content-center box-shadow p-3 rounded">
                        <div className="col-12 col-lg-2">
                            <div className='text-lg-end text-center'>
                                <img src={registrationImg} alt="registration" width="80" height="80" className='p-0' />
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 p-1 text-center text-lg-start">
                            <h5>Registration and Screening</h5>
                            <p className='p-0 m-0'>
                                Upon arrival at the blood donation center or blood drive location, you'll be asked to provide identification and complete a registration form. You'll also undergo a screening process where you'll answer questions about your medical history, recent travel, and other factors that might affect the eligibility of your blood donation.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row justify-content-center box-shadow p-3 rounded">
                        <div className="col-12 col-lg-2">
                            <div className='text-lg-end text-center'>
                                <img src={checkupImg} alt="registration" width="80" height="80" className='p-0' />
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 p-1 text-center text-lg-start">
                            <h5>Health Check-up</h5>
                            <p className='p-0 m-0'>
                                A medical professional will measure your blood pressure, pulse rate, and body temperature.A small sample of blood may be taken to check your hemoglobin levels to ensure you're not anemic and are eligible to donate.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row justify-content-center box-shadow p-3 rounded">
                        <div className="col-12 col-lg-2">
                            <div className='text-lg-end text-center'>
                                <img src={donationImg} alt="registration" width="80" height="80" className='p-0' />
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 p-1 text-center text-lg-start">
                            <h5>Donation</h5>
                            <p className='p-0 m-0'>
                                Once you're cleared through the health screening, you'll be guided to a donation area. The actual blood donation process typically takes about 8-10 minutes. You'll be seated in a comfortable chair, and a trained phlebotomist will clean your arm with an antiseptic, usually around the inside of your elbow. A sterile needle will be inserted into a vein, and the blood will be collected into a special bag.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row justify-content-center box-shadow p-3 rounded">
                        <div className="col-12 col-lg-2">
                            <div className='text-lg-end text-center'>
                                <img src={donationVolumeImg} alt="registration" width="80" height="80" className='p-0' />
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 p-1 text-center text-lg-start">
                            <h5> Donation Volume</h5>
                            <p className='p-0 m-0'>
                                A standard whole blood donation is about 500 milliliters (around a pint).Some donations involve specific components of blood, such as platelets or plasma, where the blood is processed to separate out these components, and the rest of the blood is returned to the donor.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row justify-content-center box-shadow p-3 rounded">
                        <div className="col-12 col-lg-2">
                            <div className='text-lg-end text-center'>
                                <img src={restImg} alt="registration" width="80" height="80" className='p-0' />
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 p-1 text-center text-lg-start">
                            <h5>Rest and Refreshment</h5>
                            <p className='p-0 m-0'>
                                After the donation is complete, the needle will be removed, and a bandage will be applied to the site. You'll be asked to rest for a short while and enjoy some refreshments, usually including snacks and drinks. This helps your body recover and minimizes the chance of feeling lightheaded.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row justify-content-center box-shadow p-3 rounded">
                        <div className="col-12 col-lg-2">
                            <div className='text-lg-end text-center'>
                                <img src={careImg} alt="registration" width="80" height="80" className='p-0' />
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 p-1 text-center text-lg-start">
                            <h5>Post-Donation Care</h5>
                            <p className='p-0 m-0'>
                                You'll be given post-donation instructions, which may include avoiding strenuous activity for a few hours and keeping the bandage on for a certain period.It's important to follow these instructions to ensure a smooth recovery.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row justify-content-center box-shadow p-3 rounded">
                        <div className="col-12 col-lg-2">
                            <div className='text-lg-end text-center'>
                                <img src={appreciationImg} alt="registration" width="80" height="80" className='p-0' />
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 p-1 text-center text-lg-start">
                            <h5> Donor Appreciation</h5>
                            <p className='p-0 m-0'>
                                Many blood donation centers provide donors with certificates of appreciation, small gifts, or other tokens of thanks for their contribution.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row justify-content-center box-shadow p-3 rounded">
                        <div className="col-12 col-lg-2">
                            <div className='text-lg-end text-center'>
                                <img src={frequencyImg} alt="registration" width="80" height="80" className='p-0' />
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 p-1 text-center text-lg-start">
                            <h5>Donation Frequency</h5>
                            <p className='p-0 m-0'>
                                Whole blood donation can usually be done every 8 to 12 weeks, depending on the guidelines of the blood bank or organization.Some components like platelets and plasma can be donated more frequently.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row justify-content-center box-shadow p-3 rounded">
                        <div className="col-12 col-lg-2">
                            <div className='text-lg-end text-center'>
                                <img src={noteImg} alt="registration" width="80" height="80" className='p-0' />
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 p-1 text-center text-lg-start">
                            <h5>Note</h5>
                            <p className='p-0 m-0'>
                                It's important to note that the specific details of the blood donation process can vary slightly depending on the blood donation center or organization. Additionally, eligibility criteria may differ based on factors such as age, weight, health status, recent travel, and more. Always make sure to donate blood through reputable and authorized organizations to ensure the safety of both donors and recipients.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationProcess;