const express = require("express")
const houseRouter=express.Router();
<<<<<<< HEAD
const {addRoom,getHouses, getBookedHouses } =require('../controllers/propert.controller');
=======
const {addRoom,getHouses,getSingleHouse,ownerRoom } =require('../controllers/propert.controller');
>>>>>>> dev
const authMiddleware = require("../middlewares/authMiddleware");
const roomPostFeeMiddleware = require("../middlewares/roomPostFeeMiddleware");


// add house route
houseRouter.post('/addroom',authMiddleware,roomPostFeeMiddleware, addRoom);

// get all houses route
houseRouter.get('/allroom', getHouses);

<<<<<<< HEAD
houseRouter.get('/allbookedroom', getBookedHouses);
=======
// get single house route
houseRouter.get('/singlehouse/:id',authMiddleware, getSingleHouse);

// a house the landloard is posting
houseRouter.get('/myaddroom',authMiddleware,ownerRoom);

>>>>>>> dev

module.exports=houseRouter;