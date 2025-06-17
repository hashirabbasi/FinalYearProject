const express = require("express");
const router = express.Router();
const { body , query} = require("express-validator");
const authorizationMiddleware = require('../middlewares/auth.middleware');
const rideController = require("../controllers/ride.controller");

router.post(
  "/create",
  authorizationMiddleware.authUser,
  body("pickupLocation").isString().withMessage("Pickup location is required"),
  body("destination").optional().isString().withMessage("Destination must be a string"),
  body("serviceType").isString().isLength({ min: 3 }).withMessage("Service type is required"),
  body("hoursWorked").isNumeric().withMessage("Hours worked must be a number"), // ✅ Add this
  rideController.createRide
);

router.get("/get-Fare", authorizationMiddleware.authUser, 
   

  
  rideController.getFare);




module.exports = router;