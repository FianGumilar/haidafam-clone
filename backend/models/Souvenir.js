const mongoose = require('mongoose');

const souvenirSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    photos: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Souvenir", souvenirSchema);