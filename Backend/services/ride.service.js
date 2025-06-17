const rideModel = require('../models/ride.model');
const userModel = require('../models/user.model');
const crypto = require('crypto');

// Calculate fare based on service type and hours worked
async function getFare(serviceType, hoursWorked) {
  const rates = {
    plumber: 500,
    electrician: 500,
    carpenter: 500,
    cleaner: 500,
    painter: 500,
  };
  const hourlyRate = rates[serviceType] || 500; // default rate

  if (!hoursWorked || isNaN(hoursWorked)) {
    throw new Error('Hours worked must be a valid number');
  }

  return Number((hoursWorked * hourlyRate).toFixed(2));
}

module.exports.getFare = getFare;
// Generate OTP
function getOtp(num) {
  const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
  return otp;
}

// Create ride
module.exports.createRide = async ({ user, pickupLocation, serviceType, hoursWorked }) => {
  if (!user || !pickupLocation || !serviceType || !hoursWorked) {
    throw new Error('User, pickup location, service type, and hours worked are required');
  }

  const hourlyRate = getHourlyRate(serviceType);
  const fare = calculateFare(hoursWorked, hourlyRate);
  const otp = getOtp(6);

  const ride = await rideModel.create({
    user,
    pickupLocation,
    serviceType,
    hoursBooked: hoursWorked,
    fare,
    otp,
    status: 'pending',
  });

  return ride;
};
