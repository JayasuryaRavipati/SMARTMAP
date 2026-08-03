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

    priority: {
      type: String,
      enum: ["Normal", "High", "Super"],
      default: "Normal",
    },

    status: {
      type: String,
      enum: ["Pending", "On Route", "Delivered"],
      default: "Pending",
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    latitude: Number,

    longitude: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Delivery", deliverySchema);