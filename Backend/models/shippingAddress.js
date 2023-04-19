const mongoose = require('mongoose');

const shippingAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    }
});



module.exports = mongoose.model('ShippingAddress', shippingAddressSchema);