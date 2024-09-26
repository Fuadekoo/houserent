const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'allclass',
    required: true
  },
  bookedTime: {
    fromTime: { 
      type: String,
      required: true
    },
    toTime: { 
      type: String,
      required: true
    }
  }
}, {
  timestamps: true, // This will automatically add `createdAt` and `updatedAt` fields
  versionKey: false
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
