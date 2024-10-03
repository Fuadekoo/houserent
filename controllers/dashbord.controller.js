const mongoose = require('mongoose');
const users = require("../models/usersModel");
const classModel = require("../models/HouseModel");
const booking = require("../models/bookingmodel");
const transaction = require("../models/TransactionModel");
const deposit =require("../models/AccoutnDeposit");
const withdrawal = require("../models/WithdrawalModel")

const getcount = async (req, res) => {
    try {
        const userCount = await users.countDocuments();
        const houseCount = await classModel.countDocuments();
        const bookingCount = await booking.countDocuments();
        const transactionCount = await transaction.countDocuments();
        const depositCount = await deposit.countDocuments();
        const withdrawalCount = await withdrawal.countDocuments();

        res.status(200).json({
            userCount,
            houseCount,
            bookingCount,
            transactionCount,
            depositCount,
            withdrawalCount
            
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving counts', error });
    }
}


module.exports = { getcount};