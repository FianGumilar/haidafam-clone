const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    identifyNumber: {
        type: Number,
        required: true,
    },
    imageIdentifyNumber: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
}, {timestamps: true} );

module.exports = mongoose.model("User", userSchema);