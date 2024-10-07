const mongoose = require('mongoose');
const Allusers = require("../models/usersModel");
const jwt = require('jsonwebtoken');
const Transaction = require("../models/TransactionModel");

// Refactored transfermoney function
const performTransaction = async (transactionData) => {
    try {
        // Fetch the sender's current balance
        const sender = await Allusers.findById(transactionData.sender);
        if (!sender) {
            throw new Error("Sender not found");
        }

        // Check if the sender's balance is less than the transaction amount
        if (sender.balance < transactionData.amount) {
            throw new Error("Insufficient balance");
        }

        // Save the transaction
        const newTransaction = new Transaction(transactionData);
        await newTransaction.save();

        // Decrease the amount of the sender
        await Allusers.findByIdAndUpdate(transactionData.sender, {
            $inc: { balance: -transactionData.amount },
        });

        // Increase the amount of the receiver
        const receiver = await Allusers.findById(transactionData.receiver);
        if (!receiver) {
            throw new Error("Receiver not found");
        }
        await Allusers.findByIdAndUpdate(transactionData.receiver, {
            $inc: { balance: transactionData.amount },
        });

        return {
            message: "Transaction successful",
            data: newTransaction,
            success: true,
        };
    } catch (error) {
        return {
            message: error.message,
            success: false,
        };
    }
};

// Get all transactions for a user
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
        });

        res.send({
            message: "Transactions retrieved successfully",
            success: true,
            data: transactions,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            data: error.message,
        });
    }
};
const getUserBalance = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json({ success: false, message: 'Authorization header not found' });
        }
    
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId; // Extract userId from the decoded token
        console.log('Authenticated userId:', userId); // Add logging
    
        const user = await Allusers.findById(userId);
        console.log('Found user:', user); // Add logging
    
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
    
        res.json({ success: true, data: { balance: user.balance.toFixed(2) } });
      } catch (error) {
        console.error('Error fetching user balance:', error); // Add logging
        res.status(500).json({ success: false, message: error.message });
      }
};



module.exports = {
    performTransaction,
    getTransactions,
    getUserBalance,
};
