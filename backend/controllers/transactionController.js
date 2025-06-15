const transactionModel = require('../models/transactionModel');
const moment = require('moment');

const getAllTransactions = async (req, res) => {
    try {
        const { frequency } = req.body;
        const getTransactions = await transactionModel.find({
            userid: req.body.userid,
            date: {
                $gte: moment().subtract(Number(frequency), "d").toDate(),
            },
        });
        res.status(200).json(getTransactions);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const addTransaction = async (req, res) => {
    try {
        const { userid, amount, category, type, description, reference, date } = req.body;
        const newTransaction = new transactionModel({ userid, amount, category, type, description, reference, date });
        await newTransaction.save();
        res.status(200).send("Transaction created");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const editTransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndUpdate(
            { id: req.body.transactionId },
            req.body.payload
        );
        res.status(200).send('Edit successful');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteTransaction = async (req, res) => {
    try {
        await transactionModel.findByIdAndDelete(req.body.transactionId);
        res.status(200).send('Delete successful');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { addTransaction, getAllTransactions, editTransaction, deleteTransaction };