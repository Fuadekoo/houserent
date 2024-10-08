const mongoose = require('mongoose');
const users = require("../models/usersModel");
const classModel = require("../models/HouseModel");
const roomPostFeeMiddleware = require('../middlewares/roomPostFeeMiddleware');

const addRoom = async (req, res) => {
  // Access the user ID from the request object
  const { userId: ownerUser } = req.user;
  const { parking, bathrooms, bedrooms ,image, RoomLocation, address, floorLevel, houseNumber, housecategory, description, rentPerMonth } = req.body;

  // Access the user ID from the request object
//   const { userId: ownerUser } = req.user;
//   const { parking, bathrooms, bedrooms ,image, RoomLocation, address, floorLevel, houseNumber, housecategory, description, rentPerMonth } = req.body;

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
    const AdminPrice = parseInt(rentPerMonth)* 0.02 * 6;
    const data = {
      image: image,
      address: address,
      floorLevel: floorLevel,
      houseNumber: houseNumber,
      rentPerMonth: rentPerMonth,
      adminPrice: AdminPrice,
      housecategory: housecategory,
      description: description,
      ownerUser: ownerUser,
      RoomLocation: RoomLocation,
      parking:parking,
      bedrooms:bedrooms,
      bathrooms:bathrooms
    };

    // Check if a room with the same image already exists
    const check = await classModel.findOne({ image: image });
    if (check) {
      return res.status(400).json({ message: "Room with this image already exists", success: false });
    } else {
      // Save the room data to the database
      const newRoom = await classModel.insertMany([data]);

            // Call the roomPostFeeMiddleware after the room is successfully added
            await roomPostFeeMiddleware(req, res, () => {
                return res.status(200).json({ message: "Room created successfully", success: true, data: newRoom });
            });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};


const getBlockHouse = async (req, res) => {
    try {
        const houses = await classModel.find({ active: false });
        res.status(200).json({ message: "Blocked houses retrieved successfully", success: true, data: houses });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, data: null });
    }
};

const usergetHouses = async (req, res) => {
    try {
        const houses = await classModel.find();
        res.status(200).json({ message: "Houses retrieved successfully", success: true, data: houses });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, data: null });
    }
};

const getActiveHouse = async (req, res) => {
    try {
        const houses = await classModel.find({ active: true });
        res.status(200).json({ message: "Active houses retrieved successfully", success: true, data: houses });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, data: null });
    }
};

const blockRoom = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: "Invalid room ID" });

    try {
        const room = await classModel.findById(id);
        if (!room)
            return res.status(404).json({ error: "Room not found" });

        const newBlockedStatus = !room.active;
        const updatedRoom = await classModel.findByIdAndUpdate(id, { active: newBlockedStatus }, { new: true });

        res.status(200).json({ message: "Room status updated successfully", room: updatedRoom });
    } catch (error) {
        console.error("Error updating room status:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getSingleHouse = async (req, res) => {
    const {id} = req.params;
    try {
        const house = await classModel.findById(id);
        if (!house) {
            return res.status(404).json({ message: "House not found", success: false, data: null });
        }
        res.status(200).json({ message: "House retrieved successfully", success: true, data: house });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, data: null });
    }
};

const ownerRoom = async (req, res) => {
    const { userId } = req.user;
    try {
        const myroom = await classModel.find({ ownerUser: userId });
        if (!myroom || myroom.length === 0) {
            return res.status(404).json({ message: "The current user has no rooms.", success: false, data: null });
        }
        res.status(200).json({ message: "Rooms retrieved successfully", success: true, data: myroom });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving rooms", success: false, error: error.message });
    }
};

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
};

const ownerEditRoomSS = async (req, res) => {
    const { id } = req.params;
    const { rentPerMonth } = req.body;

    try {
        const updatehouse = await classModel.findOne({ _id: id });
        if (!updatehouse) {
            return res.status(404).json({ message: 'Room not found' });
        }
        updatehouse.rentPerMonth = rentPerMonth;

        await updatehouse.save();
        res.send("The room information is successfully updated");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating room information' });
    }
};

const ownerEditRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedHouse = await classModel.findOneAndUpdate(
      { _id: id }, 
      { $set: { rentPerMonth: req.body.rentPerMonth } }, 
      { new: true, runValidators: true } // `runValidators` ensures the validation for updated fields
    );

    if (!updatedHouse) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json({ message: 'Class information updated successfully', data: updatedHouse });
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
        searchTerm,
    } = req.query;

    let query = { active: true };
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    if (address) {
        // Escape any special regex characters in the address input
        const escapedAddress = address.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        query.address = { $regex: `^${escapedAddress}`, $options: 'i' }; // Only match addresses starting with the given address string
    }

    if (housecategory && housecategory !== 'all') {
        query.housecategory = housecategory;
    }

    if (parking) {
        query.parking = parking === 'true';
    }

    if (searchTerm) {
        // Apply search to fields where they start with searchTerm
        const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        query.$or = [
            { housecategory: { $regex: `^${escapedSearchTerm}`, $options: 'i' } },
            { address: { $regex: `^${escapedSearchTerm}`, $options: 'i' } },
        ];
    }

    try {
        const houses = await classModel.find(query)
            .limit(limit)
            .skip(startIndex);

        if (!houses || houses.length === 0) {
            return res.status(404).json({ message: "No houses found with the provided filters", success: false, data: null });
        }

        res.status(200).json({ message: "Houses retrieved successfully", success: true, data: houses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false, data: null });
    }
};


// const searchHouses = async (req, res) => {
//     const {
//         address,
//         housecategory,
//         parking,
//         searchTerm,
//     } = req.query;

//     let query = { active: true };
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;

//     if (address) {
//         query.address = { $regex: `^${address}`, $options: 'i' };
//     }
//     if (housecategory && housecategory !== 'all') {
//         query.housecategory = housecategory;
//     }
//     if (parking) {
//         query.parking = parking === 'true';
//     }
//     if (searchTerm) {
//         query.$or = [
//             { housecategory: { $regex: searchTerm, $options: 'i' } },
//             { address: { $regex: searchTerm, $options: 'i' } },
//         ];
//     }

//     try {
//         const houses = await classModel.find(query)
//             .limit(limit)
//             .skip(startIndex);

//         if (!houses || houses.length === 0) {
//             return res.status(404).json({ message: "No houses found with the provided filters", success: false, data: null });
//         }

//         res.status(200).json({ message: "Houses retrieved successfully", success: true, data: houses });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: error.message, success: false, data: null });
//     }
// };

module.exports = {
    addRoom,
    getBlockHouse,
    getSingleHouse,
    ownerRoom,
    getActiveHouse,
    blockRoom,
    deleteRoom,
    usergetHouses,
    ownerEditRoom,
    searchHouses
};