const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House',
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