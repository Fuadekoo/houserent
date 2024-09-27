const express = require("express")
const houseRouter=express.Router();
const {addRoom,getHouses,getSingleHouse,ownerRoom ,blockRoom, getActiveHouse,usergetHouses} =require('../controllers/propert.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const roomPostFeeMiddleware = require("../middlewares/roomPostFeeMiddleware");


// add house route
houseRouter.post('/addroom',authMiddleware,roomPostFeeMiddleware, addRoom);

// get all houses route
houseRouter.get('/allroom', getHouses);

houseRouter.get('/userallroom', usergetHouses);

houseRouter.get('/active-rooms', getActiveHouse);

// get single house route
houseRouter.get('/singlehouse/:id',authMiddleware, getSingleHouse);

// a house the landloard is posting
houseRouter.get('/myaddroom',authMiddleware,ownerRoom);

houseRouter.patch('/blockRoom/:id' ,blockRoom);



module.exports=houseRouter;