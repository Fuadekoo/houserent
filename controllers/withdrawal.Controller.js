const mongoose = require('mongoose');
const Withdrawal = require('../models/WithdrawalModel'); // Assuming you have a Withdrawal model
const users = require("../models/usersModel"); // Assuming you have a User model

// Withdraw route
const withdrew = async (req, res) => {
    const { userId: ownerUser } = req.user; // Get the userId from the authentication middleware
    const { amount, withdrawOption, withdrewAccount } = req.body;

    // Validate request
    if (!ownerUser || !amount || !withdrawOption || !withdrewAccount) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find the user with the role of landlord
        const checkUser = await users.findOne({ _id: ownerUser ,role:"landlord"});
        console.log(checkUser);
        if (!checkUser) {
            return res.status(404).json({ message: 'User not found or you are not a landlord' });
        }

        // check the minimum withddrew is 1000 
        if(amount<1000){
            return res.status(404).json({ message: 'Minimum withdraw is 1000 ETB' });
        }

        // Check if the user has sufficient balance
        if (checkUser.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Create a withdrawal record
        const withdrawal = new Withdrawal({
            ownerUser: checkUser._id,
            withdrawalAmount: amount,
            withdrawOption,
            withdrewAccount
        });

        await withdrawal.save();

        // Deduct the amount from the user's balance
        checkUser.balance -= amount;
        await checkUser.save();

        res.status(200).json({ message: 'Withdrawal in progress', balance: checkUser.balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    withdrew
};