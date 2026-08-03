const express = require("express");
const router = express.Router();

const {
  createDelivery,
  getDeliveries,
  getDelivery,
  updateDelivery,
  deleteDelivery,
} = require("../controllers/deliveryController");

const protect = require("../middleware/authMiddleware");

// Protect all delivery routes
router.use(protect);

// Create Delivery
router.post("/", createDelivery);

// Get All Deliveries
router.get("/", getDeliveries);

// Get Single Delivery
router.get("/:id", getDelivery);

// Update Delivery
router.put("/:id", updateDelivery);

// Delete Delivery
router.delete("/:id", deleteDelivery);

module.exports = router;