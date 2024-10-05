const mongoose = require('mongoose');
const Withdrawal = require('../models/WithdrawalModel'); // Assuming you have a Withdrawal model
const users = require("../models/usersModel"); 
// const Withdrawal = require('../models/Withdrawal');
const User = require('../models/usersModel');// Assuming you have a User model

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

const withdrewfetch = async (req, res) => {
    try {
        const { userId: ownerUser } = req.user; // Get the userId from the authentication middleware

        // Find the user with the role of landlord
        const checkUser = await users.findOne({ _id: ownerUser ,role:"landlord"});
        console.log(checkUser);
        if (!checkUser) {
            return res.status(404).json({ message: 'User not found or you are not a landlord' });
        }

        const withdrawals = await Withdrawal.find({ ownerUser: checkUser._id });

        res.status(200).json({ withdrawals });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const withdrewConfirm = async (req, res) => {
    try {
        const {withdrawalId} = req.params;
        const { status } = req.body;
        const { userId: adminUser } = req.user;

        // Validate request
        if (!status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            // Find the admin user
            const admin = await users.findOne({ _id: adminUser, isAdmin: true });
            if (!admin) {
                return res.status(403).json({ message: 'Permission denied' });
            }

            // Find the withdrawal record
            const withdrawal = await Withdrawal.findById(withdrawalId);
            if (!withdrawal) {
                return res.status(404).json({ message: 'Withdrawal not found' });
            }

            // Update the status
            withdrawal.withdrewStatus = status;
            await withdrawal.save();

            res.status(200).json({ message: 'Withdrawal status updated', withdrawal });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
};



// Fetch all withdrew data  with optional search functionality
 const getWithdrawals = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const query = searchTerm
            ? {
                $or: [
                    { withdrawalAmount: { $regex: searchTerm, $options: 'i' } },
                    { withdrawOption: { $regex: searchTerm, $options: 'i' } },
                    { withdrewAccount: { $regex: searchTerm, $options: 'i' } }
                ]
            }
            : {};

        const withdrawals = await Withdrawal.find(query).populate('ownerUser');
        res.status(200).json(withdrawals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
 };
//  pending or done the payment
const withdrawalapprove =  async (req, res) => {
    const { withdrawalId } = req.params;
    const { withdrewStatus } = req.body;

    try {
        const withdrawal = await Withdrawal.findByIdAndUpdate(
            withdrawalId,
            { withdrewStatus },
            { new: true }
        );

        if (!withdrawal) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }

        res.status(200).json({ message: 'Withdrawal status updated', withdrawal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    withdrew,
    withdrewConfirm,
    withdrewfetch,
    getWithdrawals,
    withdrawalapprove
};