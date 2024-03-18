import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";
import "./auth/Login.css";
import Navbar from './Navbar';


class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
      <div className="patient-portal-container">
        <header>
          <h1>Welcome to Patient Portal</h1>
        </header>
        {/* <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Appointments</a></li>
            <li><a href="#">Medical Records</a></li>
            <li><a href="#">Billing</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </nav> */}
        <section className="content">
          <h2>Recent Appointments</h2>
          <div className="appointment-list">
            <div className="appointment-item">
              <p>Date: March 28, 2024</p>
              <p>Doctor: Dr. Smith</p>
              <p>Time: 9:30AM</p>
              <p>Reason: Routine Checkup</p>
            </div>
            <div className="appointment-item">
              <p>Date: March 15, 2024</p>
              <p>Doctor: Dr. Johnson</p>
              <p>Time: 10:30AM</p>
              <p>Reason: Follow-up</p>
            </div>
          </div>
        </section>
        {/* <footer>
          <p>&copy; 2024 Patient Portal</p>
        </footer> */}
      </div>
      </div>
    );
  }
}

export default Home;



/*function Home() {
    const location = useLocation();

    return (
        <div className="homepage">
            <h1>Hello {location.state.id}, will implement Home Page in next sprint</h1>
        </div>
    )
}
export default Home;*/
