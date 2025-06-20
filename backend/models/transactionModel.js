const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    userid: {
        type: String,
        required: [true, 'userId is required'],
    },
    amount: {
        type: Number,
        required: [true, 'amount is required'],
    },
    type: {
        type: String,
        required: [true, 'type is required'],
    },
    category: {
        type: String,
        required: [true, 'category is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    reference: {
        type: String,
    },
    date: {
        type: Date,
        required: [true, 'date is required'],
    },
}, { timestamps: true });

const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;