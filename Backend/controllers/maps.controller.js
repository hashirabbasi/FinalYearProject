const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const { address } = req.query;
  try {
    const coordinates = await mapsService.getAddressCordinator(address);
    return res.status(200).json({
      success: true,
      message: "Coordinates fetched successfully",
      data: coordinates,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || "Failed to fetch coordinates",
    });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: error.array()[0].msg,
    });
  }

  try {
    const { origin, destination } = req.query;
    const distanceTime = await mapsService.getDistanceTime(origin, destination);

    return res.status(200).json({
      success: true,
      message: "Distance and time fetched successfully",
      data: distanceTime,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch distance and time",
    });
  }
};



module.exports.getCompleteSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const { query } = req.query;
    const suggestions = await mapsService.getCompleteSuggestions(query);
    return res.status(200).json({
      success: true,
      message: "Suggestions fetched successfully",
      data: suggestions,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || "Failed to fetch suggestions",
    });
  }
}
