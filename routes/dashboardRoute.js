const express = require("express")
const dashbordRoute=express.Router();
const { getcount } =require('../controllers/dashbord.controller');
const authMiddleware = require("../middlewares/authMiddleware");


dashbordRoute.get('/counts',authMiddleware,getcount);



module.exports=dashbordRoute;