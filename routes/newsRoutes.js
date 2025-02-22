const express = require("express");
const { getNews } = require("../controllers/newscontroller");

const router = express.Router();

// Validate category query parameter
router.get("/", (req, res, next) => {
  const validCategories = ["business", "technology", "sports", "entertainment"];
  const category = req.query.category;

  if (category && !validCategories.includes(category)) {
    return res.status(400).json({ message: "Invalid category" });
  }

  next();
}, getNews);

module.exports = router;