const mongoose = require('mongoose');
const users = require("../models/usersModel");
const classModel = require("../models/HouseModel");

const addRoom = async (req, res) => {
    // Access the user ID from the request object
    const { userId: ownerUser } = req.user;
    const {image, address, floorLevel, houseNumber, rentPerMonth} = req.body;
  try {
      // Check if the owner user exists
      const checkUser = await users.findOne({ _id: ownerUser ,role:"landlord"});
      // const checkUser = await users.findOne({ _id: ownerUser});
      if (!checkUser) {
          return res.status(400).json({ message: "The user does not exist or you are not 'landlord'", success: false, data: null });
      }

      // assign to admin price 10% of the price of the room
      const AdminPrice = rentPerMonth * 0.02 * 6;
       const data  = {
           image:image,
            address:address,
             floorLevel:floorLevel, 
             houseNumber:houseNumber, 
             rentPerMonth:rentPerMonth,
          AdminPrice: AdminPrice,
          ownerUser: ownerUser
      };
          try {
    const check = await classModel.findOne({ image: image });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await classModel.insertMany([data]);  // Save to the "allclass" collection
    }
  } catch (e) {
    res.json("fail");
  }

     // res.status(200).json({ message: "Room created successfully", success: true, data: data });
  } catch (error) {
      res.status(500).json({ message: error.message, success: false, data: null });
  }
};

const getHouses = async (req, res) => {
  try {
    const houses = await classModel.find();
    res.status(200).json({ message: "Houses retrieved successfully", success: true, data: houses });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false, data: null });
  }
}

const getSingleHouse = async (req, res) => {
  const { id } = req.params;
  try {
    const house = await classModel.findById(id);
    if (!house) {
      return res.status(404).json({ message: "House not found", success: false, data: null });
    }
    res.status(200).json({ message: "House retrieved successfully", success: true, data: house });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false, data: null });
  }
}

module.exports = { addRoom,getHouses,getSingleHouse };