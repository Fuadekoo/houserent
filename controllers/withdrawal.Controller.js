const express = require('express');
const Withdrawal = require('../models/WithdrawalModel');
const User = require('../models/usersModel'); // Assuming you have a User model

// Withdraw route
const withdrew = async (req, res) => {
    const { userId: user } = req.user;
    const {amount, withdrawOption, withdrewAccount } = req.body;

    // Validate request
    if (!user || !amount || !withdrawOption || !withdrewAccount) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find the user the role is landloards 
        const user = await User.findOne({ _id: user, role: "landloard" });
        if (!user) {
            return res.status(404).json({ message: 'User not found or you are not a landloard' });
        }

        // Check if the user has sufficient balance
        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Create a withdrawal record
        const withdrawal = new Withdrawal({
            ownerUser: user,
            withdrawalAmount: amount,
            withdrawOption,
            withdrewAccount
        });

        await withdrawal.save();

        // Deduct the amount from the user's balance
        user.balance -= amount;
        await user.save();

        res.status(200).json({ message: 'Withdrawal in progress', balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    withdrew
};