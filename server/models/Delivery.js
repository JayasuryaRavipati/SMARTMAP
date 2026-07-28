const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    latitude: Number,

    longitude: Number,

    status: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Out for Delivery",
        "Delivered",
      ],
    },

    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Delivery", deliverySchema);