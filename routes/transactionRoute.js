const express = require("express");
const transactionRoute = express.Router();
const { getTransactions,getUserBalance } = require("../controllers/transaction.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const {handlePaymentSuccess ,getUserDepositHistory} = require("../controllers/addDepositController");

// Get all transactions for a user
transactionRoute.get("/get-all-transactions-by-user", authMiddleware, getTransactions);

// Route to get user balance
transactionRoute.get('/balance', authMiddleware, getUserBalance);

transactionRoute.post('/addbalance', authMiddleware, handlePaymentSuccess);  // the route for the deposit balance

// get the deposit history
transactionRoute.get('/deposit-history', authMiddleware, getUserDepositHistory);

module.exports = transactionRoute;