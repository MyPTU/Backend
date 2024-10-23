const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({

    place_id: { type: Number, required: true },
    name: { type: String, required: true },
    latitude: { type: Number, required: true },
    longtitude: { type: Number, required: true },
    status: { type: String, required: true },
    quantity: { type: Number, required: true },
    type: { type: [String], required: true }, // Array of strings
    description: { type: String, required: true },
    review: { type: Number, required: true },
    img: { type: [String], required: true } // Array of strings

})

module.exports = mongoose.model.place || mongoose.model('Places', PlaceSchema)