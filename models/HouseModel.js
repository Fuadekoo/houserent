const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  image:[
    {
    type: String,
    required: true
  },
  ] ,
  address: {
    type: String,
    required: true
  },
  floorLevel: {
    type: String,
    required: true
  },
  houseNumber: {
    type: String,
    required: true
  },
  rentPerMonth: {
    type: String,
    required: true
  },
  adminPrice: {
    type: Number,
    default: 0 // Initial value set to 0
  },
  ownerUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Reference to the User model
    required: true
  }
});

const HouseModel = mongoose.model("allclass", houseSchema);

module.exports = HouseModel;
