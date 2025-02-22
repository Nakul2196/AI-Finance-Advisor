const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const apiKey = process.env.TWELVE_DATA_API_KEY;
    const symbols = "AAPL,MSFT,TSLA,AMZN,GOOGL"; // Stock symbols
    const response = await axios.get(
      `https://api.twelvedata.com/quote?symbol=${symbols}&apikey=${apiKey}`
    );

    if (response.data && !response.data.code) {
      // Convert response object to an array
      const stockData = Object.values(response.data).map((stock) => ({
        name: stock.name || "Unknown",
        price: stock.close || "N/A",
        change: stock.percent_change ? stock.percent_change + "%" : "N/A",
        marketCap: stock.market_cap || "N/A",
      }));

      res.json(stockData);
    } else {
      console.error("Invalid API response:", response.data);
      return res.status(500).json({ message: "Error fetching stock data" });
    }
  } catch (error) {
    console.error("Stock API error:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Failed to fetch stock data" });
  }
});

module.exports = router;
