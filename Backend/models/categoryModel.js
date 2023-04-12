const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});


module.exports = mongoose.model('Category', categorySchema); 