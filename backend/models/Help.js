const mongoose = require('mongoose');

const helpSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Help", helpSchema);