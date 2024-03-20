const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    model: String,
    year: String,
    colour: String
})

module.exports = mongoose.model("Car", carSchema);