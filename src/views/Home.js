import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";
import "./auth/Login.css";
import Navbar from './Navbar';
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [] // Initialize appointments state to hold the fetched data
    };
  }

  componentDidMount() {
    this.fetchAppointments();
  }

  async fetchAppointments() {
    try {
      const userId = localStorage.getItem('patId');
      const response = await axios.post("http://localhost:8000/getAppointmentList", { userId });
      console.log(response.data);
      this.setState({ appointments: response.data }); // Update appointments state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="patient-portal-container">
          <header>
            <h1>Welcome to Patient Portal</h1>
          </header>
          <section className="content">
            <h2>Recent Appointments</h2>
            <div className="appointment-list">
              {this.state.appointments.map((appointment, index) => (
                <div key={index} className="appointment-item">
                  <p>Date: {new Date(appointment.date).toString()}</p>
                  <p>Doctor: {appointment.doctor}</p>
                  <p>Time: {appointment.time}</p>
                  <p>Reason: {appointment.reason}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Home;
