import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appointments.css";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import {
    GetAllDoctorsRoute,
} from "../Utilities/API-Routes";
// import { useSelector } from "react-redux";

const AppointmentForm = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reason, setReason] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [data, setData] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    // States
    // const [doctors, setDoctors] = useState([]);


    async function submit(event) {
        event.preventDefault();
        try {
            await axios
                .post("http://localhost:8000/bookAppointment", {
                    date,
                    time,
                    selectedDoctor,
                    phoneNumber,
                    reason,
                })
                .then((res) => {
                    if (res) {
                        toast.success(
                            "Your appointment has been booked succesfully!"
                        );
                        setSelectedDoctor("");
                        setReason("");
                        setTime("");
                        setDate("");
                        setPhoneNumber("");
                    }
                })
                .catch((err) => {
                    alert(err);
                    console.log(err);
                });
        } catch (error) {
            console.error(error);
            alert("Failed to create appointment");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // try {
        //     const response = await axios.get(
        //         "http://localhost:8000/getDocList"
        //     );
        //     console.log(response);
        //     setData(response.data);
        // } catch (error) {
        //     console.error("Error fetching data:", error);
        // }

        try {
            const { data } = await axios.get(GetAllDoctorsRoute, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (data?.success) {
                console.log(data?.doctors);
                setData(data?.doctors);
                // setDoctors(data?.doctors);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        setSelectedDoctor(event.target.value);
        const selectedItem = data.find(
            (item) => item.name === event.target.value
        );
        console.log("Selected Doctor ID:", selectedItem._id);
    };

    const handleSubmit = {};

    return (
        <div>
            <Navbar />
            <div className="appointment-form-container">
                <form className="appointment-form" onSubmit={handleSubmit}>
                    <div>
                        <p>Book a Doctor's Appointment</p>
                    </div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />

                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />

                    <label htmlFor="doctor">Doctor:</label>
                    <select value={selectedDoctor} onChange={handleChange}>
                        <option value="">Select a doctor</option>
                        {data.map((item) => (
                            <option key={item.userId} value={item.firstName}>
                                {item.firstName}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="Format: 123-456-7890"
                    />

                    <label htmlFor="reason">Reason:</label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    ></textarea>

                    <input
                        type="submit"
                        value="Appoinment"
                        onClick={submit}
                        className="reg-submit-button"
                    />
                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;
