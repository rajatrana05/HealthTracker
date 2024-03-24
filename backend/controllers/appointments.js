const express = require("express");
const user = require("../models/user");
const Appointment = require("../models/appointments");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const aptRouter = express.Router();

console.log("Appointment router working successfully.");


/*authRouter.post("/registration", async (req, res) => {
    const { name, email, Pass, confPass, isAdmin, isDoc } = req.body;
    const data = {
        name: name,
        email: email,
        password: Pass,
        isAdmin: false,
        isDoc: false
    };
    try {
        const item = await user.findOne({ email: email });
        if (item) {
            res.json("exist");
        } else {
            res.json("notexist");
            console.log(data);
            await user.insertMany([data]);
        }
    } catch (e) {
        res.json("notexist");
    }
});*/

aptRouter.post("/bookAppointment", async (req, res) => {
    try {
        //const appointment = new Appointment(req.body);
        const { date, time, selectedDoctor,patientId, docId, phoneNumber, reason} = req.body;
        const data = {
            date: date,
            time: time,
            doctor: selectedDoctor,
            patientId: patientId,
            docId: docId,
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
        const users = await user.find({ isDoc: true });
        res.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });


  aptRouter.post('/getAppointmentList', async (req, res) => {
    try {
        console.log(76);
        const { userId } = req.body;
        
        const users = await Appointment.find({ patientId: userId });
        console.log(users);
        res.json(users);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });


module.exports = aptRouter;