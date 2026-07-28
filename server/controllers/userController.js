const User = require("../models/User");

// Get all drivers
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await User.find(
      { role: "Driver" },
      "name email driverId"
    );

    res.status(200).json({
      success: true,
      drivers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};