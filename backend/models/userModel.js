const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is reuired and should be unique"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
},
    { timestamps: true } // when we add a new record time will also be recorded
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;