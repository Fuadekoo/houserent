const express = require('express');

const withdrawalRoute = express.Router();
const {withdrew,withdrewConfirm,withdrewfetch,getWithdrawals,
    withdrawalapprove} = require('../controllers/withdrawal.Controller');
const authMiddleware = require('../middlewares/authMiddleware');


// Routes for withdrawal
withdrawalRoute.post('/withdrawal', authMiddleware, withdrew);

// route for withdrawalconfirmation
withdrawalRoute.post('/withdrawalconfirm/:withdrawalId', authMiddleware, withdrewConfirm);

// route for fetch my withdrawal
withdrawalRoute.get('/withdrewfetch', authMiddleware, withdrewfetch);

// Fetch all withdrew data  with optional search functionality
withdrawalRoute.get("/getWithdrawals", getWithdrawals);

    //  pending or done the payment
withdrawalRoute.put("/toggleBlockWithdrawal/:withdrawalId/block", withdrawalapprove);

module.exports = withdrawalRoute;