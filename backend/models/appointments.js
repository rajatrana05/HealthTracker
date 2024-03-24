const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },
    doctor: { 
        type: String, 
        required: true 
    },
    patientId: { 
        type: String, 
        required: true 
    },
    docId: { 
        type: String, 
        required: true 
    },
    phoneNumber: { 
        type: String, 
        require: true 
    },
    reason: { 
        type: String, 
        required: true 
    },
});
const appointments = mongoose.model("Appointment", appointmentSchema);

module.exports = appointments;


