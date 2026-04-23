const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  itemName: String,
  description: String,
  type: String, // Lost / Found
  location: String,
  date: String,
  contactInfo: String
});

module.exports = mongoose.model("Item", itemSchema);