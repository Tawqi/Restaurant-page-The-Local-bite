const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    category: {
      type: [String], // e.g. "food", "drink"
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ingredients : {
      type: [String],
      required: true,
    },
    image: String, // optional image URL
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodItem", foodItemSchema);
