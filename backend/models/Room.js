const mongoose = require('mongoose');

const hotelRoom = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    facilities: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    roomsNumber: [{number: Number, unavailableDates: [{ type: Date }]}]  
}, 
    { timestamps: true }
)

module.exports = mongoose.model("Room", hotelRoom);