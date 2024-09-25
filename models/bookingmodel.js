<<<<<<< HEAD
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'allclass',
    required: true,
  },
  bookedTime: {
    fromTime: { 
      type: String,
      required: true,
    },
    toTime: { 
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
=======

const mongoose=require("mongoose")
const bookingSchema = new mongoose.Schema({
  house: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'allclass',
   required:true 
  },

  bookedUsername: { 
    type: String, 
    required:true 
  },

  bookedUserEmail: { 
    type: String, 
   required:true 
  },

  bookedUserPhone: { 
    type:String, 
   required:true 
  },

  houseOwner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users',
    required:true 
  },

  bookedUser:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users',
    required:true 
    },

  bookingId: {
     type: String ,
    required:true
    },

  totalPayment: { 
    type: Number ,
    required:true
  },
  bookedTime: {
    fromTime: { 
      type: String ,
     
    },
  toTime: { 
      type: String ,


    },
    
  },

  TotalDays: { 
    type: String ,
    required:true
  },

  isActive: { type: Boolean, default: true }, // New field for status
},

{timestamps:true}

);

const booking = mongoose.model('booked', bookingSchema);

module.exports = booking;





>>>>>>> dev
