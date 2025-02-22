const express = require("express");
const Portfolio = require("../models/Portfolio");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch portfolio
router.get("/", protect, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const portfolio = await Portfolio.find({ userId: req.user.id });

    res.json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Add investment
router.post("/add", protect, async (req, res) => {
  try {
    const { assetName, assetType, investmentAmount } = req.body;

    if (!assetName || !assetType || investmentAmount === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      return res.status(400).json({ message: "Investment amount must be a valid positive number" });
    }

    const newInvestment = new Portfolio({
      userId: req.user.id,
      assetName,
      assetType,
      investmentAmount: Number(investmentAmount), // Ensuring it's stored as a number
    });

    await newInvestment.save();
    res.status(201).json(newInvestment);
  } catch (error) {
    console.error("Error adding investment:", error.message);
    res.status(500).json({ message: "Failed to add investment" });
  }
});

// Delete investment
router.delete("/:id", protect, async (req, res) => {
  try {
    const investment = await Portfolio.findById(req.params.id);

    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    if (investment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this investment" });
    }

    await investment.deleteOne();
    res.json({ message: "Investment removed successfully" });
  } catch (error) {
    console.error("Error deleting investment:", error.message);
    res.status(500).json({ message: "Error deleting investment" });
  }
});

module.exports = router;
