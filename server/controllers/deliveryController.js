const Delivery = require("../models/Delivery");

// Create Delivery
exports.createDelivery = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      latitude,
      longitude,
      assignedDriver,
    } = req.body;

    const delivery = await Delivery.create({
      customerName,
      phone,
      address,
      latitude,
      longitude,
      assignedDriver,
    });

    res.status(201).json({
      success: true,
      message: "Delivery Created Successfully",
      delivery,
    });

  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

// Get All Deliveries
exports.getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate("assignedDriver", "name email");

    res.status(200).json({
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

// Get Single Delivery
exports.getDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    res.status(200).json({
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

// Update Delivery
exports.updateDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
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

// Delete Delivery
exports.deleteDelivery = async (req, res) => {
  try {
    await Delivery.findByIdAndDelete(req.params.id);

    res.status(200).json({
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

exports.getMyDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      assignedDriver: req.user.id,
    });

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
exports.getDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);

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

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    res.json({
      success: true,
      message: "Status Updated",
      delivery,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};