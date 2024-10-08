const mongoose = require('mongoose');
const users = require("../models/usersModel");
const House = require("../models/HouseModel");
const Booking = require("../models/bookingmodel");
const moment = require('moment'); // Install moment.js for time comparison



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

        const commission = checkHouse.adminPrice;
        const totalpay =totalPaymentAmount + commission;
        
        // Check if the user has enough balance by check the sum of commission and total payment is less than user balance
        if (userBalance < (totalPaymentAmount + commission)) {
            return res.status(400).json({ message: "Insufficient balance aditional commison is : "+commission + "total : "+ totalpay, success: false, data: null });
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


// Fetch all users who booked a particular room
const getBookedUsersForRoom = async (req, res) => {
  const { houseId } = req.params;

  try {
    // Find bookings for the given houseId and populate the user information
    const bookings = await Booking.find({ house: houseId }).populate('user'); // Fetch user details

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({ message: 'No bookings found for this house.', success: true, data: [] });
    }

    res.status(200).json({ message: 'Bookings retrieved successfully', success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bookings', success: false, error: error.message });
  }
};


const getAllBookedRooms = async (req, res) => {
  try {
    const bookedClasses = await Booking.find().populate('house'); // Populate the house field
    res.json(bookedClasses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching booked classes' });
  }
};





// Fetch rooms currently booked (based on time interval)
const getOwnerBookedRoomsCurrent = async (req, res) => {
  const { userId } = req.user; // Assuming req.user is set by your auth middleware
  try {
    const now = moment(); // Get the current time

    // Find bookings for rooms owned by the current user (ownerUser)
    const bookings = await Booking.find()
      .populate({
        path: 'house', // Populate house details
        match: {ownerUser: userId }, // Only return houses where the current user is the owner
      })
      .populate('user'); // Populate the user who booked the room

    // Filter bookings to only include ones where the booking time is currently active
    const currentlyBooked = bookings.filter((booking) => {
      const fromTime = moment(booking.bookedTime.fromTime);
      const toTime = moment(booking.bookedTime.toTime);
      return now.isBetween(fromTime, toTime, null, '[]') && booking.house !== null; // Ensure house exists
    });

    if (!currentlyBooked || currentlyBooked.length === 0) {
      return res.status(200).json({ message: 'No currently booked rooms found for the owner.', success: true, data: [] });
    }

    // Send response with currently booked rooms
    res.status(200).json({ message: 'Currently booked rooms retrieved successfully', success: true, data: currentlyBooked });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving booked rooms', success: false, error: error.message });
  }
};




module.exports = { bookingRoom,myBookings ,getBookedUsersForRoom ,getAllBookedRooms, getOwnerBookedRoomsCurrent};


