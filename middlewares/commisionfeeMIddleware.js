// import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';
// import express from 'express';
// import Allusers from '../model/userModel.js';
// import { performTransaction } from '../controllers/transaction.controller.js';
// import Rooms from "../model/houseModel.js";

// dotenv.config();
// const app = express();


// // Middleware to validate the token
// export default async (req, res, next) => {
//     try {
//         // Access the user ID from the request object
//         const userId = req.user.userId;
//         const {id}=req.params

//         const room = await Rooms.findById(id);
//         console.log(room);
//         const owner = room.ownerUser.toString();  
//         // const bookPrice = room.price;
//         const comision = room.AdminPrice;
//         console.log(owner);
        

//         const receiver = await Allusers.findOne({isAdmin:true, Auditor:true});
//         if (!receiver) {
//             return res.status(400).json({
//                 message: "The receiver does not exist",
//                 success: false,
//                 data: null
                
//             });
//         }

//         // Get the receiver ID from the receiver object
//         const receiverId = receiver._id;

//         // Prepare the transaction data
//         const transactionData = {
//             sender: userId,
//             receiver: receiverId,
//             amount: comision,
//             type: "book commision from person who book the room"
//             // Add other necessary fields...
//         };

//         // Call the performTransaction function to perform the transaction
//         const response = await performTransaction(transactionData);

//         // Proceed to the next middleware function or the route handler
//         next();

//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             data: error.message,
//         });
//     }
// };