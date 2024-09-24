const express = require("express")
const houseRouter=express.Router();
const {addRoom,getHouses,getSingleHouse } =require('../controllers/propert.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const roomPostFeeMiddleware = require("../middlewares/roomPostFeeMiddleware");


// add house route
houseRouter.post('/addroom',authMiddleware,roomPostFeeMiddleware, addRoom);

// get all houses route
houseRouter.get('/allroom', getHouses);

// get single house route
houseRouter.get('/singlehouse/:id',authMiddleware, getSingleHouse);

module.exports=houseRouter;