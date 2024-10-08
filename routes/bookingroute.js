const express = require("express")
const bookingRouter=express.Router();
const {bookingRoom,myBookings ,getBookedUsersForRoom, getAllBookedRooms ,getOwnerBookedRoomsCurrent } =require('../controllers/booking.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const bookingfeeMiddleware = require("../middlewares/bookfeeMiddleware");
const commisionfeeMIddleware = require("../middlewares/commisionfeeMIddleware");






// add booking route
bookingRouter.post('/booking/:houseId',authMiddleware,bookingfeeMiddleware,commisionfeeMIddleware,bookingRoom);

// get my bookings route
bookingRouter.get('/mybookings',authMiddleware,myBookings);

bookingRouter.get('/getBookedRooms',getAllBookedRooms);

bookingRouter.get('/getOwnerCurrentBookedRooms',authMiddleware, getOwnerBookedRoomsCurrent);

bookingRouter.get('/roomsBookedUser/:houseId',authMiddleware,getBookedUsersForRoom);



module.exports=bookingRouter;