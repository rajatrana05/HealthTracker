const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "UserId is Required"],
    },
    doctorId: {
        type: String,
        required: [true, "DoctorId Is Required"],
    },
    doctorInfo: {
        type: Object,
        required: true,
    },
    userInfo: {
        type: Object,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    time: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    reason: {
        type: String,
        default: "Normal Checkup",
    },
},{ timestamps: true });
const appointments = mongoose.model("Appointment", appointmentSchema);

module.exports = appointments;
