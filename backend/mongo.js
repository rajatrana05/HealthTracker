const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/e-health-tracker")
    .then(() => {
        console.log("db connected");
    })
    .catch(() => {
        console.log("failed");
    });

