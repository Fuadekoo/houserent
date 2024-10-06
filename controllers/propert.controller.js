const mongoose = require('mongoose');
const users = require("../models/usersModel");
const classModel = require("../models/HouseModel");

const addRoom = async (req, res) => {
  // Access the user ID from the request object
  const { userId: ownerUser } = req.user;
  const { image, address, floorLevel, houseNumber, housecategory, description, rentPerMonth, bathrooms, bedrooms, parking } = req.body;

  try {
      // Check if the owner user exists
      const checkUser = await users.findOne({ _id: ownerUser, role: "landlord" });
      if (!checkUser) {
          return res.status(400).json({ message: "You are not a landlord", success: false, data: null });
      }

      if (description.length > 50) {
          return res.status(400).json({ message: "Description is too long", success: false, data: null });
      }

      // Admin price calculation
      const AdminPrice = rentPerMonth * 0.02 * 6;
      const data = {
          image,
          address,
          floorLevel,
          houseNumber,
          rentPerMonth,
          AdminPrice,
          housecategory,
          description,
          ownerUser,
          bathrooms,
          bedrooms,
          parking,
      };

      const check = await classModel.findOne({ image: image });

      if (check) {
          return res.status(400).json({ message: "Room with this image already exists", success: false });
      } else {
          await classModel.insertMany([data]);  // Save to the database
          return res.status(200).json({ message: "Room created successfully", success: true, data: data });
      }
  } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
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
///////////////////////////
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


const ownerEditRoom = async (req, res) => {
  const { id } = req.params;
  const {rentPerMonth }= req.body

  try {
    const updatehouse = await classModel.findOne({ _id: id});
    if (!updatehouse) {
      return res.status(404).json({ message: 'Class not found' });
    }
    updatehouse.rentPerMonth = rentPerMonth;

    await updatehouse.save();
    res.send("The Class information is successfully updated");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating class information' });
  }
};

const searchHouses = async (req, res) => {
  const {
    address,
    housecategory,
    parking,
    minRent,
    maxRent,
    searchTerm,
  } = req.query;

  let query = { active: true }; // Fetch only active houses
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;

  // Build query based on filters
  if (address) {
    query.address = { $regex: address, $options: 'i' }; // Case-insensitive search for address
  }
  if (housecategory && housecategory !== 'all') {
    query.housecategory = housecategory; // Exact match for house category
  }
  if (parking) {
    query.parking = parking === 'true'; // Convert parking string to boolean
  }
  if (minRent) {
    query.rentPerMonth = { ...(query.rentPerMonth || {}), $gte: parseInt(minRent) }; // Minimum rent filter
  }
  if (maxRent) {
    query.rentPerMonth = { ...(query.rentPerMonth || {}), $lte: parseInt(maxRent) }; // Maximum rent filter
  }

  if (searchTerm) {
    query.$or = [
      { housecategory: { $regex: searchTerm, $options: 'i' } },
      { address: { $regex: searchTerm, $options: 'i' } },
    ]; // Allows searching across multiple fields
  }

  try {
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const houses = await classModel.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    if (!houses || houses.length === 0) {
      return res.status(404).json({ message: "No houses found with the provided filters", success: false, data: null });
    }

    res.status(200).json({ message: "Houses retrieved successfully", success: true, data: houses });
  } catch (error) {
    console.error(error); // Log errors for debugging
    res.status(500).json({ message: error.message, success: false, data: null });
  }
};


module.exports = { addRoom,
                    getBlockHouse,
                    getSingleHouse,
                    ownerRoom ,
                    getActiveHouse , 
                    blockRoom,
                    deleteRoom,
                    usergetHouses,
                    ownerEditRoom,
                    searchHouses};