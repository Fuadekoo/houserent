const express = require("express");
const transactionRoute = express.Router();
const { getTransactions,getUserBalance } = require("../controllers/transaction.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const handlePaymentSuccess = require("../controllers/addDepositController");

// Get all transactions for a user
transactionRoute.get("/get-all-transactions-by-user", authMiddleware, getTransactions);

// Route to get user balance
transactionRoute.get('/balance', authMiddleware, getUserBalance);

transactionRoute.post('/addbalance', authMiddleware, handlePaymentSuccess);  // the route for the deposit balance

module.exports = transactionRoute;