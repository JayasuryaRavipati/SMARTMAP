const express = require("express");
const router = express.Router();

const { getDrivers } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// Get all drivers
router.get("/drivers", protect, getDrivers);

module.exports = router;