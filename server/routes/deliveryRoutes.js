const express = require("express");
const router = express.Router();

const {
  createDelivery,
  getDeliveries,
  getDelivery,
  updateDelivery,
  deleteDelivery,
  updateDeliveryStatus,
  getMyDeliveries,
} = require("../controllers/deliveryController");

const protect = require("../middleware/authMiddleware");

// Create Delivery
router.post("/", protect, createDelivery);

// Get All Deliveries
router.get("/", protect, getDeliveries);

// Get Single Delivery
// router.get("/:id", protect, getDelivery);

// Update Delivery
router.put(
  "/status/:id",
  protect,
  updateDeliveryStatus
);
router.put("/:id", protect, updateDelivery);


// Delete Delivery
router.delete("/:id", protect, deleteDelivery);
router.get(
  "/my-deliveries",
  protect,
  getMyDeliveries
);

module.exports = router;