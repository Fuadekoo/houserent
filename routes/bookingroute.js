const express = require("express")
const bookingRouter=express.Router();
const {bookingRoom,myBookings ,getBookedUsersForRoom, getAllBookedRooms } =require('../controllers/booking.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const bookingfeeMiddleware = require("../middlewares/bookfeeMiddleware");
const commisionfeeMIddleware = require("../middlewares/commisionfeeMIddleware");
const bookfeeMiddleware = require("../middlewares/bookfeeMiddleware");



// add booking route
bookingRouter.post('/booking/:houseId',authMiddleware,bookfeeMiddleware,bookingRoom);

// get my bookings route
bookingRouter.get('/mybookings',authMiddleware,myBookings);

bookingRouter.get('/getBookedRooms',getAllBookedRooms);

bookingRouter.get('/roomsBookedUser/:houseId',authMiddleware,getBookedUsersForRoom);



module.exports=bookingRouter;