const axios = require("axios");
require("dotenv").config();

let cachedNews = {};
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes cache

const getNews = async (req, res) => {
    try {
        console.log("Fetching Business News...");

        const apiKey = "XUNGC9L3WGTR0ANU"; // Directly using your API key
        const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=business&apikey=${apiKey}`;
        
        // Check cache
        if (cachedNews["business"] && Date.now() - cachedNews["business"].timestamp < CACHE_DURATION) {
            console.log("Serving cached Business News");
            return res.json(cachedNews["business"].data);
        }

        const response = await axios.get(url);
        const articles = response.data.feed || [];

        // Cache the response
        cachedNews["business"] = {
            data: articles,
            timestamp: Date.now(),
        };

        res.json(articles);
    } catch (error) {
        console.error("Error fetching news:", error.message);
        res.status(500).json({ message: "Error fetching news", error: error.message });
    }
};

module.exports = { getNews };
