const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const express = require('express');
const Allusers = require('../models/usersModel.js');
const { performTransaction } = require('../controllers/transaction.controller.js');
const Rooms = require("../models/HouseModel.js");
const House = require("../models/HouseModel");

dotenv.config();
const app = express();


// Middleware to validate the token
const commisionfeeMIddleware = async (req, res, next) => {
    try {
        // Access the user ID from the request object
        const userId = req.user.userId;
        const {houseId}=req.params;
        const adminpayment = 300;
        // Fetch the room by ID
        const room = await House.findById(houseId);
        if (!room) {
            return res.status(400).json({
                message: "Room not found",
                success: false,
                data: null
            });
        }
       
        const commission = room.adminPrice; // Ensure adminPrice is the correct property
        console.log("this is a commison value" +commission);
        
        

        const receiver = await Allusers.findOne({isAdmin:true, Auditor:true});
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
            amount: commission,
            type: "book commision from person who book the room"
            // Add other necessary fields...
        };

        // Call the performTransaction function to perform the transaction
        const response = await performTransaction(transactionData);

        // Proceed to the next middleware function or the route handler
        next();

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            data: error.message,
        });
    }
};
module.exports = commisionfeeMIddleware;