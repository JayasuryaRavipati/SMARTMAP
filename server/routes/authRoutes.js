const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
  getDrivers,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

router.get("/profile", protect, getProfile);
router.get("/drivers", protect, getDrivers);
router.post("/reset-password", resetPassword);

module.exports = router;