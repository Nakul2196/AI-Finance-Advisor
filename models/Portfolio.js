const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assetName: { type: String, required: true },
  assetType: { type: String, required: true },
  investmentAmount: { type: Number, required: true },
  currentValue: { type: Number, default: 0 },
  returns: { type: Number, default: 0 },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);