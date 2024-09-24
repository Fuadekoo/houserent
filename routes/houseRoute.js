const express = require("express")
const houseRouter=express.Router();
const {addRoom,getHouses, getBookedHouses } =require('../controllers/propert.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const roomPostFeeMiddleware = require("../middlewares/roomPostFeeMiddleware");


// add house route
houseRouter.post('/addroom',authMiddleware,roomPostFeeMiddleware, addRoom);

// get all houses route
houseRouter.get('/allroom', getHouses);

houseRouter.get('/allbookedroom', getBookedHouses);

module.exports=houseRouter;