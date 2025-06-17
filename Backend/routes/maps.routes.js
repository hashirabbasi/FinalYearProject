const express = require("express");
const router = express.Router();
const authorizationMiddleware = require('../middlewares/auth.middleware');
const { getAddressCordinator } = require("../services/maps.service");
const mapsController = require("../controllers/maps.controller");
const { query } = require("express-validator");

// Route to get coordinates
router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }).withMessage("Address is required"),
  authorizationMiddleware.authUser,
  mapsController.getCoordinates
);

// ✅ Route to get distance and time
router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }).withMessage("Origin is required"),
  query("destination").isString().isLength({ min: 3 }).withMessage("Destination is required"),
  authorizationMiddleware.authUser,
  mapsController.getDistanceTime
);


router.get(
    "/get-suggestions",
    query("query").isString().isLength({ min: 3 }).withMessage("Query is required"),
    authorizationMiddleware.authUser,
    mapsController.getCompleteSuggestions
)

module.exports = router;
