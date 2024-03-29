import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import {
    GetDoctorAppoinmentsRoute,
    UpdateAppoinmentStatusRoute,
} from "../../Utilities/API-Routes";
import styled from "styled-components";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../../views/Navbar";
import "./DoctorAppoinments.css";

const DoctorAppoinments = () => {
    // States
    const [appoinments, setAppoinments] = useState([]);
    const { user } = useSelector((state) => state.user);

    // This is to get all the user appoinments
    const getAllDoctorAppoinments = async () => {
        const { data } = await axios.post(
            GetDoctorAppoinmentsRoute,
            { userId: user?._id },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (data?.success) {
            setAppoinments(data.appoinments);
        }
        getAllDoctorAppoinments();
    };

    // This is to change the status of the Appoinment
    const handleChangeStatus = async (appoinmentId, status) => {
        const { data } = await axios.post(
            UpdateAppoinmentStatusRoute,
            { appoinmentId, status },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        getAllDoctorAppoinments();
    };

    useEffect(() => {
        getAllDoctorAppoinments();
    }, []);

    return (
        <div className="doctor_app_container">
            <Navbar />
            <h1 className="title">Doctor Appoinments</h1>
            <div className="appoinment-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Patient Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appoinments?.map((appoinment) => {
                            return (
                                <tr
                                    key={
                                        appoinment.doctorId + appoinment.userId
                                    }
                                >
                                    <td>{appoinment.doctorId}</td>
                                    <td>{appoinment.status}</td>
                                    <td>{appoinment.userInfo.name}</td>
                                    <td>
                                        {dayjs(appoinment.date).format(
                                            "DD-MM-YY"
                                        )}
                                    </td>
                                    <td>
                                        {dayjs(appoinment.time).format("HH:mm")}
                                    </td>
                                    <td>
                                        {appoinment.status === "Pending" && (
                                            <>
                                                <button
                                                    className="approve-btn"
                                                    onClick={() => {
                                                        handleChangeStatus(
                                                            appoinment._id,
                                                            "Approved"
                                                        );
                                                    }}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="reject-btn"
                                                    onClick={() => {
                                                        handleChangeStatus(
                                                            appoinment._id,
                                                            "Rejected"
                                                        );
                                                    }}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorAppoinments;
