import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/Financelist.css";

const Financelist = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/stocks`, {
          headers: { "Cache-Control": "no-cache" }
        });

        if (Array.isArray(response.data)) {
          setStocks(response.data);
        } else {
          console.error("Invalid API response format:", response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="finance--list">
      <div className="list--header">
        <h2>Stocks</h2>
      </div>
      <div className="list--container">
        {loading ? (
          <p>Loading stock data...</p>
        ) : stocks.length > 0 ? (
          stocks.map((stock, index) => (
            <div className="list" key={index}>
              <div className="stock--details">
                <h2>{stock.name || "Unknown"}</h2>
              </div>
              <span>${stock.price || "N/A"}</span>
              <span>{stock.change || "N/A"}</span>
              <span>{stock.marketCap || "N/A"}</span>
            </div>
          ))
        ) : (
          <p>No stock data available.</p>
        )}
      </div>
    </div>
  );
};

export default Financelist;
