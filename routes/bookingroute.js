const express = require("express")
const bookingRouter=express.Router();
const {bookingRoom} =require('../controllers/booking.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const bookingfeeMiddleware = require("../middlewares/bookfeeMiddleware");
const commisionfeeMIddleware = require("../middlewares/commisionfeeMIddleware");



// add booking route
bookingRouter.post('/booking/:houseId',authMiddleware,bookingRoom);

// get my bookings route

module.exports=bookingRouter;