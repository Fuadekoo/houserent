const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  image:[ {
    type: String,
    required: true
  },
],
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
  housecategory:{
    type:String,
    enum: ['Apartama', 'Villa', 'Condominium','compound_house','single_house'],
    required:true
  },
  description:{
    type:String,
    required:true
  },
  rentPerMonth: {
    type: Number, // Change from String to Number
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
  },
  bathrooms:{
    type:Number,
    required:true,
},
bedrooms :{
    type:Number,
    required:true,
},
parking:{
    type:Boolean,
    required:true,
},
  active:{
    type:Boolean,
    default:false
  }
});

const HouseModel = mongoose.model("allclass", houseSchema);

module.exports = HouseModel;
