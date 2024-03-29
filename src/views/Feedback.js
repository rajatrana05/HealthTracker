import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./Feedback.css";

const Feedback = () => {
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/feedbacks");
            setFeedbackData(response.data);
        } catch (error) {
            console.error("Error fetching feedback data:", error);
        }
    };

    const fetchData1 = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/getDocList"
            );
            console.log(response);
            // setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Feedbacks</h1>
            <div class="feedback-card">
                <div class="feedback-row">
                    <p>Doctor Name:</p>
                    <p>Date:</p>
                    <p>Rating:</p>
                    <p>Comment:</p>
                </div>
                <div class="feedback-row">
                    <p>Prit</p>
                    <p>27 March, 2024</p>
                    <p>4⭐</p>
                    <p>excelent service</p>
                </div>
                <div class="feedback-divider"></div>

                <div class="feedback-divider"></div>
                {feedbackData.map((feedback) => (
                    <div key={feedback._id}>
                        <p>Doctor Name: {feedback.doctorName}</p>
                        <p>
                            Date: {new Date(feedback.date).toLocaleDateString()}
                        </p>
                        <p>Rating: {feedback.rating}</p>
                        <p>Comment: {feedback.comment}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;
