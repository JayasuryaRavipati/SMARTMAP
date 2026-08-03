const Delivery = require("../models/Delivery");

// =========================
// Create Delivery
// =========================
const createDelivery = async (req, res) => {
  try {
    const {
  customerName,
  phone,
  address,
  priority,
  latitude,
  longitude,
} = req.body;

    const delivery = await Delivery.create({
  customerName,
  phone,
  address,
  priority,
  latitude,
  longitude,
  driver: req.user.id,
});

    res.status(201).json({
      success: true,
      message: "Delivery Created",
      delivery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Deliveries
// =========================
const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      driver: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      deliveries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Single Delivery
// =========================
const getDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findOne({
      _id: req.params.id,
      driver: req.user._id,
    });

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    res.json({
      success: true,
      delivery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Update Delivery
// =========================
const updateDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findOneAndUpdate(
      {
        _id: req.params.id,
        driver: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    res.json({
      success: true,
      message: "Delivery Updated",
      delivery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Delete Delivery
// =========================
const deleteDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findOne({
      _id: req.params.id,
      driver: req.user._id,
    });

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    await delivery.deleteOne();

    res.json({
      success: true,
      message: "Delivery Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDelivery,
  getDeliveries,
  getDelivery,
  updateDelivery,
  deleteDelivery,
};