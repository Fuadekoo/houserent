const mongoose = require('mongoose');
const users = require("../models/usersModel");
const classModel = require("../models/HouseModel");

const addRoom = async (req, res) => {
    // Access the user ID from the request object
    const { userId: ownerUser } = req.user;
    const {image, address, floorLevel, houseNumber,housecategory,description,rentPerMonth} = req.body;
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
          housecategory:housecategory,
          description:description,
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

const getBlockHouse = async (req, res) => {
  try {
    const houses = await classModel.find({ active: false  }); // Fetch blocked houses
    res.status(200).json({ message: "Blocked houses retrieved successfully", success: true, data: houses });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false, data: null });
  }
};

const usergetHouses = async (req, res) => {
  try {
    const houses = await classModel.find(); // Fetch blocked houses
    res.status(200).json({ message: "Blocked houses retrieved successfully", success: true, data: houses });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false, data: null });
  }
};


const getActiveHouse = async (req, res) => {
  try {
    const houses = await classModel.find({ active: true  }); // Fetch active houses
    res.status(200).json({ message: "Active houses retrieved successfully", success: true, data: houses });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false, data: null });
  }
};

////////////////////////////////////////////////////////////////////////
const blockRoom = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: "Invalid room ID" });

    try {
        // Find the room by ID
        const room = await classModel.findById(id);
        if (!room)
            return res.status(404).json({ error: "room not found" });

        // Toggle the blocked status
        const newBlockedStatus = !room.active; // Toggle blocked status (true -> false, false -> true)

        // Update the user with the new blocked status
        const updatedRoom = await classModel.findByIdAndUpdate(id, { active: newBlockedStatus }, { new: true });

        res.status(200).json({ message: "User status updated successfully", room: updatedRoom });
    } catch (error) {
        console.error("Error updating user status:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

////////////////////////////////////////////////////////


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

// room the landloard is posts
const ownerRoom = async (req, res) => {
  const { userId} = req.user; // Assuming req.user is set by your auth middleware
  
  try {
    // Find rooms where ownerUser matches the current logged-in user's id
    const myroom = await classModel.find({ ownerUser:userId });
    
    if (!myroom || myroom.length === 0) {
      return res.status(404).json({ message: "The current user has no rooms.", success: false, data: null });
    }

    // Send the found rooms
    res.status(200).json({ message: "Rooms retrieved successfully", success: true, data: myroom });
  } catch (error) {
    // Send error response in case of any issue
    res.status(500).json({ message: "Error retrieving rooms", success: false, error: error.message });
  }
};


// deleteRoom when only the active is false 
const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await classModel.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found", success: false, data: null });
    }
    if (room.active === true) {
      return res.status(400).json({ message: "Room is active, cannot delete", success: false, data: null });
    }
    await classModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Room deleted successfully", success: true, data: null });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false, data: null });
  }
}

module.exports = { addRoom,
                    getBlockHouse,
                    getSingleHouse,
                    ownerRoom ,
                    getActiveHouse , 
                    blockRoom,
                    deleteRoom,
                    usergetHouses};