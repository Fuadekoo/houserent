const express = require("express")
const bookingRouter=express.Router();
const {bookingRoom,myBookings } =require('../controllers/booking.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const bookingfeeMiddleware = require("../middlewares/bookfeeMiddleware");
const commisionfeeMIddleware = require("../middlewares/commisionfeeMIddleware");



// add booking route
bookingRouter.post('/booking/:houseId',authMiddleware,bookingRoom);

// get my bookings route
bookingRouter.get('/mybookings',authMiddleware,myBookings);

module.exports=bookingRouter;