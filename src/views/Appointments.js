import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Appointments.css";
import { toast } from "react-toastify";

var docId;

const AppointmentForm = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [doctor, setDoctor] = useState("");
    const [reason, setReason] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [data, setData] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");

 const patientId = localStorage.getItem('patId');
    async function submit(event) {
        event.preventDefault();
        try {
            await axios
                .post("http://localhost:8000/bookAppointment", {
                    date,
                    time,
                    selectedDoctor,
                    patientId,
                    docId,
                    phoneNumber,
                    reason,
                })
                .then((res) => {
                    if (res) {
                        toast.success("Your appointment has been booked succesfully!")
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
    };

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/getDocList');
          console.log(response);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const handleChange = (event) => {
        setSelectedDoctor(event.target.value);
        const selectedItem = data.find(item => item.name === event.target.value);
        console.log("Selected Doctor ID:", selectedItem._id); 
        docId= selectedItem._id;
        console.log(docId);
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
                   value={selectedDoctor} onChange={handleChange}
                >
                    <option value="">Select a doctor</option>
                    {/*<option value="Dr. Smith">Dr. Smith</option>
                    <option value="Dr. Johnson">Dr. Johnson</option>*/}
                    {data.map((item) => (
                <option 
                key={item._id} 
                value={item.name}>{item.name}</option>
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
    );
};

export default AppointmentForm;
