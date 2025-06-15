const express = require('express');
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction } = require('../controllers/transactionController');

// router object
const router = express.Router();

// get all transactions
router.post('/get-transaction', getAllTransactions);
// add a transaction
router.post('/add-transaction', addTransaction);
// edit a transaction
router.post('/edit-transaction', editTransaction);
// delete a transaction
router.post('/delete-transaction', deleteTransaction);

module.exports = router;
