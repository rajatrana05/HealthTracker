import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TimePicker } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    GetDoctorDataRoute,
    UpdateDoctorDataRoute,
} from "../../Utilities/API-Routes";
// import moment from "moment";
import dayjs from "dayjs";
import Navbar from "../../views/Navbar";
import "./Profile.css";

const Profile = () => {
    // States
    const { user } = useSelector((state) => state.user);
    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    // This is to Get the Doctors data
    const GetDoctorData = async () => {
        const { data } = await axios.post(
            GetDoctorDataRoute,
            { userId: params.id },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (data?.success) {
            setDoctor(data?.doctor);
        }
    };

    // This is to Handle Changes in the Input feild
    const handleChange = (event) => {
        setDoctor({ ...doctor, [event.target.name]: event.target.value });
    };

    // This is to Handle Time Change
    const handleTimeChange = (value, dateString) => {
        setDoctor({ ...doctor, timings: [...value] });
    };

    // This is to update the doctor data
    const handleUpdateDoctorData = async () => {
        const { data } = await axios.post(
            UpdateDoctorDataRoute,
            {
                ...doctor,
                timings: [
                    dayjs(doctor.timings[0]).format("HH:mm"),
                    dayjs(doctor.timings[1]).format("HH:mm"),
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (data.success) {
            navigate("/");
        }
    };

    useEffect(() => {
        GetDoctorData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                {doctor && (
                    <div>
                        <h1 className="profile-heading">Manage Profile</h1>
                        <div className="form-section">
                            <h2 className="section-heading">
                                Personal Details:
                            </h2>
                            <div className="form row">
                                <div className="col-md-4 input-block">
                                    <label htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input
                                        className="input-field"
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="Your First Name"
                                        value={doctor.firstName}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="col-md-4 input-block">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Your Last Name"
                                        value={doctor.lastName}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="col-md-4 input-block">
                                    <label htmlFor="phone">Phone number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="Your Phone Number"
                                        value={doctor.phone}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="col-md-4 input-block">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"
                                        value={doctor.email}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="col-md-4 input-block">
                                    <label htmlFor="website">Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        value={doctor.website}
                                        placeholder="Your Website"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="col-md-4 input-block">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={doctor.address}
                                        placeholder="Your Address"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-section">
                            <h2>Professional Details:</h2>
                            <div className="form row">
                                <div className="col-md-4 input-block">
                                    <label htmlFor="specialization">
                                        Specialization
                                    </label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        id="specialization"
                                        value={doctor.specialization}
                                        placeholder="Your Specialization"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="col-md-4 input-block">
                                    <label htmlFor="experience">
                                        Experience
                                    </label>
                                    <input
                                        type="text"
                                        name="experience"
                                        id="experience"
                                        value={doctor.experience}
                                        placeholder="Your Experience"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="col-md-4 input-block">
                                    <label htmlFor="feesPerCustomer">
                                        Fees Per Customer
                                    </label>
                                    <input
                                        type="text"
                                        name="feesPerCustomer"
                                        id="feesPerCustomer"
                                        value={doctor.feesPerCustomer}
                                        placeholder="Your Fees Per Customer"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="col-md-4 input-block">
                                    <label htmlFor="timings">Timings</label>
                                    <TimePicker.RangePicker
                                        format={"HH:mm"}
                                        defaultValue={[
                                            dayjs(doctor.timings[0], "HH:mm"),
                                            dayjs(doctor.timings[1], "HH:mm"),
                                        ]}
                                        onChange={handleTimeChange}
                                        showTime={{
                                            format: "HH:mm",
                                        }}
                                        onOk={handleTimeChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end button-container">
                            <button
                                className="app-button submit-button"
                                onClick={handleUpdateDoctorData}
                            >
                                Sumbit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Profile;
