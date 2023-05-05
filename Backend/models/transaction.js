const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transaction_id: { type: String },
    name: { type: String },
    email: { type: String },
    total_amount: { type: Number },
    currency: { type: String },
    createdAt: { type: Date },
    status: { type: String },
});


module.exports = mongoose.model('Transaction', transactionSchema);