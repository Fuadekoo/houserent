const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const express = require('express');
const Allusers = require('../models/usersModel.js');
const { performTransaction } = require('../controllers/transaction.controller.js');
const HouseModel = require("../models/HouseModel.js");
const mongoose = require('mongoose'); 


dotenv.config();
const app = express();

// Middleware to validate the token
//const bookfeeMiddleware = async (req, res, next) => {
const bookfeeMiddleware = async (req, res, next) => {
    try {
        // Access the user ID from the request object
        const userId = req.user.userId;
        const { houseId } = req.params;
        // const { fromTime, toTime } = req.body;
     const { totalPayment } = req.body;


        // Log the room ID for debugging
        console.log(`House ID: ${houseId}`);

        // Find the room by ID
        const room = await HouseModel.findOne({ _id: houseId });
        

        // Log the room object for debugging
        console.log(`Room: ${JSON.stringify(room)}`);

        // Check if the room exists
        if (!room) {
            return res.status(404).json({
                message: "Room not found",
                success: false,
                data: null
            });
        }

        const commission = room.adminPrice;
        const totalpay =totalPayment + commission;

        // Find the user balance
        const user = await Allusers.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "The user does not exist",
                success: false,
                data: null
            });
        }
        const userBalance = parseFloat(user.balance);
        
        // Check if the user has enough balance by check the sum of commission and total payment is less than user balance
        if (userBalance < totalpay) {
            return res.status(400).json({ message: "Insufficient balance aditional commison is : "+commission + "total : "+ totalpay, success: false, data: null });
        }

        

        const owner = room.ownerUser.toString();


        console.log(`Owner: ${owner}`);

        // Find the receiver from userowner from rooms table column and id from allusers table is the same. whose role is landlord in alluser table
        const receiver = await Allusers.findOne({ _id: owner, role: "landlord" });

        if (!receiver) {
            return res.status(400).json({
                message: "The receiver does not exist",
                success: false,
                data: null
            });
        }

        // Get the receiver ID from the receiver object
        const receiverId = receiver._id;

        // Prepare the transaction data
        const transactionData = {
            sender: userId,
            receiver: receiverId,
            amount: totalPayment,
            type: "local Transfer from person who book the room to the landlord",
            // Add other necessary fields...
        };
      
        console.log(`Transaction Data: ${JSON.stringify(transactionData)}`);
         console.log(" cont tot:", totalPayment);


        // Call the performTransaction function to perform the transaction
        const response = await performTransaction(transactionData);

        console.log(`Transaction Response: ${JSON.stringify(response)}`);

        // Check if the transaction was successful
        if (!response || !response.success) {
            return res.status(500).json({
                message: "Transaction failed",
                success: false,
                data: response ? response.message : null
            });
        }

        console.log(`Transaction Response: ${JSON.stringify(response)}`);

        // Check if the transaction was successful
        if (!response || !response.success) {
            return res.status(500).json({
                message: "Transaction failed",
                success: false,
                data: response ? response.message : null
            });
        }

        // Proceed to the next middleware function or the route handler
        next();

    } catch (error) {
        console.error(`Error in bookfeeMiddleware: ${error.message}`);
        res.status(500).json({
            message: "Internal server error",
            message: "Internal server error",
            success: false,
            data: error.message,
        });
    }
};

module.exports = bookfeeMiddleware;