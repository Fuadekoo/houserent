const express = require('express');

const withdrawalRoute = express.Router();
const {withdrew} = require('../controllers/withdrawal.Controller');
const authMiddleware = require('../middlewares/authMiddleware');


// Routes for withdrawal
withdrawalRoute.post('/withdrawal', authMiddleware, withdrew);

module.exports = withdrawalRoute;