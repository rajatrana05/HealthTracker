const express = require("express");
const Feedback = require("../Models/feedbacks");
const user = require("../Models/userModel");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const feedbackRouter = express.Router();
console.log("feedback router working successfully");
feedbackRouter.post("/feedbacks", async (req, res) => {
    try {
        const { doctorName, appointmentDate, rating, comment } = req.body;
        const data = {
            doctorName: doctorName,
            appointmentDate: appointmentDate,
            rating: rating,
            comment: comment,
        };
        await Feedback.insertMany([data]);
        res.status(201).json(data);
    } catch (error) {
        // Handle error response
        if (error.response) {
            console.log("Server responded with:", error.response.data);
        } else {
            console.error("Error occurred:", error.message);
        }
    }
});

feedbackRouter.get("/getDocList", async (req, res) => {
    try {
        const users = await user.find({ isDoc: true });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

feedbackRouter.get("/feedbacks", async (req, res) => {
    try {
        console.log('test');
        const users = await user.find({ isDoc: true });
        res.json(users);
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = feedbackRouter;
