const express = require('express');

const withdrawalRoute = express.Router();
const {withdrew,withdrewConfirm,withdrewfetch} = require('../controllers/withdrawal.Controller');
const authMiddleware = require('../middlewares/authMiddleware');


// Routes for withdrawal
withdrawalRoute.post('/withdrawal', authMiddleware, withdrew);

// route for withdrawalconfirmation
withdrawalRoute.post('/withdrawalconfirm/:withdrawalId', authMiddleware, withdrewConfirm);

// route for fetch my withdrawal
withdrawalRoute.get('/withdrewfetch', authMiddleware, withdrewfetch);

module.exports = withdrawalRoute;