const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuidv4');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0, max: 5
    },
    rooms: {
        type: [String],
        required: true,
    },
    cheapestPrice: {
        type: Number,
        required: true,
    },
    facilities: {
        type: [String], 
        default: false
    }
})

module.exports = mongoose.model("Hotel", hotelSchema);