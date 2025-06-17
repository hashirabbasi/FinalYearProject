const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  },
  pickupLocation: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    default: "User's Home"
  },
  hoursBooked: {
    type: Number,
    min: 1,
    required: true
  },
  fare: {
    type: Number,
    required: true
  },
  orderId: {
    type: String,
    default: null
  },
  paymentId: {
    type: String,
    default: null
  },
  signature: {
    type: String,
    default: null
  },

  otp: {
    type: String,
    select: false,
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
