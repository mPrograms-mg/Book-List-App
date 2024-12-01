const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, //Automatically add createdAt and updatedAt fields
})



//Create Book Modal
const User = mongoose.model("User", userSchema);
module.exports = User;