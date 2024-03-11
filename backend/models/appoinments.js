const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    doctor: { type: String, required: true },
    phoneNumber: { type: String, require: true },
    reason: { type: String, required: true },
});
const appoinments = mongoose.model("Appointment", appointmentSchema);

module.exports = appoinments;
