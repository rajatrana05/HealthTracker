import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";
import { toast } from "react-toastify";
import "./Feedbackform.css";

const FeedbackForm = () => {
    const [appoinmentDate, setAppointmentDate] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");
    const [data, setData] = useState([]);

    async function submit(event) {
        event.preventDefault();
        try {
            await axios
                .post("http://localhost:8000/feedback", {
                    doctorName,
                    appoinmentDate,
                    rating,
                    comment,
                })
                .then((res) => {
                    if (res) {
                        toast.success(
                            "You have given your feedback successfully"
                        );
                        setAppointmentDate("");
                        setDoctorName("");
                        setComment("");
                        setRating("");

                    }
                })
                .catch((err) => {
                    alert(err);
                    console.log(err);
                });
        } catch (error) {
            console.error(error);
            alert("Failed to create feedback");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onStarClick = (nextValue) => {
        setData({ ...data, rating: nextValue });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/getDocList"
            );
            console.log(response);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChange = (event) => {
        setDoctorName(event.target.value);
        const selectedItem = data.find(
            (item) => item.name === event.target.value
        );
        console.log("Selected Doctor ID:", selectedItem._id);
    };

    const handleSubmit = {};

    return (
        <div>
            {/* <Navbar /> */}
            <div className="feedback-form-container">
                <form className="feedback-form" onSubmit={handleSubmit}>
                    <div>
                        <p>Feedback</p>
                    </div>
                    <label htmlFor="doctorName">Doctor:</label>
                    <select
                        value={doctorName}
                        onChange={handleChange}
                        className="feedback-form-select"
                    >
                        <option value="">Select a doctorName</option>
                        {data.map((item) => (
                            <option key={item._id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="appoinmentDate">Appoinment Date:</label>
                    <input
                        type="date"
                        id="appoinmentDate"
                        value={appoinmentDate}
                        className="feedback-form-input"
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                    />

                    <label>Rating:</label>
                    <br />
                    <div className="star-rating">
                        <StarRatingComponent
                            name="rating"
                            starCount={5} // 5 stars
                            value={data.rating}
                            onClick={onStarClick}
                            // onStarClick={(e) => setRating(e.target.value)}
                            className="feedback-form-rating"
                        />
                    </div>

                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="feedback-form-textarea"
                        required
                    ></textarea>

                    <input
                        type="submit"
                        value="Give Feedback"
                        onClick={submit}
                        className="reg-submit-button"
                    />
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
