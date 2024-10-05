const express = require("express")
const houseRouter=express.Router();
const {addRoom,getSingleHouse,ownerRoom ,blockRoom, getActiveHouse,getBlockHouse,deleteRoom , ownerEditRoom, searchHouses} =require('../controllers/propert.controller');
const authMiddleware = require("../middlewares/authMiddleware");
const roomPostFeeMiddleware = require("../middlewares/roomPostFeeMiddleware");


// add house route
houseRouter.post('/addroom',authMiddleware,roomPostFeeMiddleware, addRoom);

// delete the post house route
houseRouter.delete('/deleteroom/:id',authMiddleware,deleteRoom);

// get all houses route bloch and unblock
houseRouter.get('/allroom', getActiveHouse);


// get all house that is not blocked
houseRouter.get('/userallroom', getBlockHouse);

// get all active houses
houseRouter.get('/active-rooms', getActiveHouse);

// get all blocked houses
houseRouter.get('/blocked-rooms', getBlockHouse);

// get single house route
houseRouter.get('/singlehouse/:id',authMiddleware, getSingleHouse);

// a house the landloard is posting
houseRouter.get('/myaddroom',authMiddleware,ownerRoom);

houseRouter.patch('/blockRoom/:id' ,blockRoom);

houseRouter.put('/owner-edit-room/:id', ownerEditRoom);
houseRouter.get('/activesearch', searchHouses)


module.exports=houseRouter;