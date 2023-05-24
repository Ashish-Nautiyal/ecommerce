const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    promoCode: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiry_date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Promocode', promoCodeSchema);