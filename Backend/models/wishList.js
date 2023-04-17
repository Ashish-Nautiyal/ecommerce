const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    product_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});


module.exports = mongoose.model('Wishlist', wishListSchema); 