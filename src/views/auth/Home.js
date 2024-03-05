import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";


class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <h1 className="headerText">Patient Portal</h1>
        </header>

        <div className="content">
          <h2 className="welcomeText">Welcome, [Patient Name]</h2>
          <p>This is your personalized patient portal.</p>

          {/* Patient Information */}
          <div className="infoContainer">
            <h3 className="sectionTitle">Patient Information</h3>
            <ul>
              <li><strong>Name:</strong> [Patient Name]</li>
              <li><strong>Date of Birth:</strong> [Date of Birth]</li>
              <li><strong>Address:</strong> [Address]</li>
              <li><strong>Email:</strong> [Email]</li>
              <li><strong>Phone:</strong> [Phone]</li>
              {/* Add more patient information as needed */}
            </ul>
          </div>

          {/* Logout Button */}
          <button className="logoutButton">Logout</button>
        </div>

        <footer className="footer">
          <p className="footerText">&copy; 2024 Patient Portal. All rights reserved.</p>
        </footer>
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
