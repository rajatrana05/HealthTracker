import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Appoinments.css";

const AppointmentForm = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [doctor, setDoctor] = useState("");
    const [reason, setReason] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    async function submit(event) {
        event.preventDefault();
        try {
            await axios
                .post("http://localhost:8000/appoinments", {
                    date,
                    time,
                    doctor,
                    phoneNumber,
                    reason,
                })
                .then((res) => {
                    if (res) {
                        alert("Appointment created successfully");
                        setDoctor("");
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
    };

    const handleSubmit={

    }

    return (
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
                <select
                    id="doctor"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    required
                >
                    <option value="">Select a doctor</option>
                    <option value="Dr. Smith">Dr. Smith</option>
                    <option value="Dr. Johnson">Dr. Johnson</option>
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
    );
};

export default AppointmentForm;
