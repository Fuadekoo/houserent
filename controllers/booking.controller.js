const mongoose = require('mongoose');
const users = require("../models/usersModel");
const House = require("../models/HouseModel");
const Booking = require("../models/bookingmodel");

const bookingRoom = async (req, res) => {
    // Access the user ID from the request object
     const { totalPayment, totalDays, bookedTime } = req.body;
     console.log(" cont tot:", totalPayment);

    const { userId: user } = req.user;
    const { houseId } = req.params;
    

    try {
        // Check if the tenant user exists
        const checkUser = await users.findOne({ _id: user, role: "tenant" });
        if (!checkUser) {
            return res.status(400).json({ message: "The user does not exist or you are not 'tenant'", success: false, data: null });
        }

      // Check if the user has enough balance
       const userBalance = parseFloat(checkUser.balance);
       const totalPaymentAmount = parseFloat(totalPayment);


        // Check if the house exists
        const checkHouse = await House.findOne({ _id: houseId });
        if (!checkHouse) {
            return res.status(400).json({ message: "The house does not exist", success: false, data: null });
        }
       const newBooking = new Booking({
            user:user,
            house: houseId,
            bookedTime: bookedTime,
            TotalDays: totalDays,
            totalPayment:totalPaymentAmount
          });
         await newBooking.save();
         res.status(200).json({ message: "House booked successfully", success: true, data: newBooking });
        // if (userBalance >= totalPaymentAmount) {
        //      // Save the booking data to the Booking model
        //  const newBooking = new Booking({
        //     user:user,
        //     house: houseId,
        //     bookedTime: bookedTime,
        //     TotalDays: totalDays,
        //     totalPayment:totalPaymentAmount
        //   });
        //  await newBooking.save();

        //  checkUser.balance -= totalPaymentAmount;
        //  await checkUser.save();
        // res.status(200).json({ message: "House booked successfully", success: true, data: newBooking });
        // }else{
        //  return res.status(400).json({ message: 'Insufficient balance' });
        // }


    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false, data: error.message });
    }
};

// mybookings rooms from booking tables 
const myBookings = async (req, res) => {
    const { userId } = req.user;
    try {
        const bookings = await Booking.find({ user: userId }).populate("house");
        
        res.status(200).json({ message: "Bookings retrieved successfully", success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false, data: error.message });
    }
};




module.exports = { bookingRoom,myBookings };