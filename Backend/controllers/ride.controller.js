const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickupLocation, destination, serviceType , hoursWorked} = req.body;

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickupLocation,
            destination,
            serviceType,
            hoursWorked
        });

        return res.status(201).json({
            success: true,
            message: 'Ride created successfully',
            data: ride,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to create ride',
        });
    }
};

module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { serviceType, hoursWorked } = req.query;
    try {
        const fare = await rideService.getFare(serviceType, hoursWorked);
        return res.status(200).json({
            success: true,
            message: 'Fare calculated successfully',
            data: fare,
        });
    } catch (error) {
        console.error(error); // Add this line for debugging
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to calculate fare',
        });
    }
    };
