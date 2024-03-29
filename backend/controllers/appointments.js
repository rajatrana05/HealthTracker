const express = require("express");
const user = require("../Models/userModel");
const Appointment = require("../Models/AppointmentsModel");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const aptRouter = express.Router();

console.log("Appointment router working successfully.");



aptRouter.post("/bookAppointment", async (req, res) => {
    try {
        //const appointment = new Appointment(req.body);
        const { date, time, selectedDoctor, phoneNumber, reason} = req.body;
        const data = {
            date: date,
            time: time,
            doctor: selectedDoctor,
            email: phoneNumber,
            reason: reason
    };
        await Appointment.insertMany([data]);
        res.status(201).json(data);
    } catch (error) {
        // Handle error response
    if (error.response) {
        console.log('Server responded with:', error.response.data);
      } else {
        console.error('Error occurred:', error.message);
      }
    }
});

aptRouter.get('/getDocList', async (req, res) => {
    try {
        const users = await user.find({ isDoctor: true });
        console.log(users);
        res.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });

module.exports = aptRouter;