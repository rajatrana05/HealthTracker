import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

function Home() {
    const location = useLocation();

    return (
        <div className="homepage">
            <h1>Hello {location.state.id}, will implement Home Page in next sprint</h1>
        </div>
    )
}

export default Home;
