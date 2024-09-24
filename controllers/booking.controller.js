const mongoose = require('mongoose');
const users = require("../models/usersModel");
const classModel = require("../models/HouseModel");

const bookingRoom = async (req, res) => {
    // Access the user ID from the request object
    const { userId: user } = req.user;
    const { houseId } = req.params;

    try {
        // Check if the owner user exists
        const checkUser = await users.findOne({ _id: user, role: "tenant" });
        if (!checkUser) {
            return res.status(400).json({ message: "The user does not exist or you are not 'tenant'", success: false, data: null });
        }

        // Check if the house exists
        const checkHouse = await classModel.findOne({ _id: houseId });
        if (!checkHouse) {
            return res.status(400).json({ message: "The house does not exist", success: false, data: null });
        }

        // Check if the house is already booked
        const isBooked = await classModel.findOne({ _id: houseId, bookedBy: { $exists: true } });
        if (isBooked) {
            return res.status(400).json({ message: "The house is already booked", success: false, data: null });
        }

        // Book the house
        checkHouse.bookedBy = user;
        await checkHouse.save();

        res.status(200).json({ message: "House booked successfully", success: true, data: checkHouse });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false, data: error.message });
    }
};

module.exports = { bookingRoom };