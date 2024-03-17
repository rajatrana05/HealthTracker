const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: "boolean",
      },
    isDoc: {
        type: "boolean"
      },
});

const user = mongoose.model("user", userSchema)

module.exports = user;