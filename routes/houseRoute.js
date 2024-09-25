const express = require("express")
const houseRouter=express.Router();
const {addRoom,getHouses,getSingleHouse,ownerRoom } =require('../controllers/propert.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const roomPostFeeMiddleware = require("../middlewares/roomPostFeeMiddleware");


// add house route
houseRouter.post('/addroom',authMiddleware,roomPostFeeMiddleware, addRoom);

// get all houses route
houseRouter.get('/allroom', getHouses);

<<<<<<<<< Temporary merge branch 1
houseRouter.get('/allbookedroom', getBookedHouses);
=========
// get single house route
houseRouter.get('/singlehouse/:id',authMiddleware, getSingleHouse);

// a house the landloard is posting
houseRouter.get('/myaddroom',authMiddleware,ownerRoom);

>>>>>>>>> Temporary merge branch 2

module.exports=houseRouter;