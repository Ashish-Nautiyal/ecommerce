const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.Mixed,
        ref:'User',
        required: true,
    },
    products: [{ variant_id: { type: String }, quantity: { type: Number }, price: { type: Number } }],
    total: { type: Number }
});


module.exports = mongoose.model('Order', orderSchema); 