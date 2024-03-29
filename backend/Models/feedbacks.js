const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: false
    },
    appointmentDate: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        minimum: 0,
        maximum: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});

const Feedback = mongoose.model("feedbacks", feedbackSchema);

module.exports = Feedback;
