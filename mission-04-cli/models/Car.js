const mongoose = require('mongoose');

// Car Schema
const carSchema = mongoose.Schema({
    model: String,
    year: Number,
    colour: String
});

module.exports = mongoose.model('Car', carSchema);