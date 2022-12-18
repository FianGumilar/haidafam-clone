const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    hotel: {
        type: String,
        required: true,
    },
    checkIn: {
        type: String,
        required: true,
    },
    checkOut: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    guest: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    identifyNumber: {
        type: Number,
        required: true,
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
    },
    notes: {
        type: String,
        required: false,
    },
    paymentMethod: {
        type: String,
        required: false
    },
    promoCode: {
        type: String,
        required: false
    },
    response_midtrans: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);