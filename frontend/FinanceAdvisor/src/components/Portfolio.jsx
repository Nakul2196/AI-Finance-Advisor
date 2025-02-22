import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Portfolio.css";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [newInvestment, setNewInvestment] = useState({
    assetName: "",
    assetType: "",
    investmentAmount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/portfolio", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPortfolio(response.data);
      calculateTotalInvestment(response.data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      setError("Failed to fetch portfolio data.");
    }
  };

  const calculateTotalInvestment = (data) => {
    const total = data.reduce((acc, item) => acc + item.investmentAmount, 0);
    setTotalInvestment(total);
  };

  const handleAddInvestment = async (e) => {
    e.preventDefault();
    if (!newInvestment.assetName || !newInvestment.assetType || !newInvestment.investmentAmount) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:8001/api/portfolio/add",
        newInvestment,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchPortfolio(); // Refresh portfolio
      setNewInvestment({ assetName: "", assetType: "", investmentAmount: "" });
    } catch (error) {
      console.error("Error adding investment:", error);
      setError("Failed to add investment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInvestment = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/portfolio/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchPortfolio(); // Refresh portfolio
    } catch (error) {
      console.error("Error deleting investment:", error);
      setError("Failed to delete investment.");
    }
  };

  return (
    <div className="portfolio-container">
      <h2>My Investment Portfolio</h2>
      <div className="portfolio-summary">
        <p>Total Investment: <span>${totalInvestment.toFixed(2)}</span></p>
      </div>

      {/* Add Investment Form */}
      <form onSubmit={handleAddInvestment} className="add-investment-form">
        <input
          type="text"
          placeholder="Asset Name"
          value={newInvestment.assetName}
          onChange={(e) => setNewInvestment({ ...newInvestment, assetName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Asset Type"
          value={newInvestment.assetType}
          onChange={(e) => setNewInvestment({ ...newInvestment, assetType: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Investment Amount"
          value={newInvestment.investmentAmount}
          onChange={(e) => setNewInvestment({ ...newInvestment, investmentAmount: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Investment"}
        </button>
      </form>

      {/* Error Message */}
      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

      {/* Portfolio Table */}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Type</th>
            <th>Invested Amount</th>
            <th>Current Value</th>
            <th>Returns</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((item) => (
            <tr key={item._id}>
              <td>{item.assetName}</td>
              <td>{item.assetType}</td>
              <td>${item.investmentAmount.toFixed(2)}</td>
              <td>${item.currentValue.toFixed(2)}</td>
              <td className={item.returns >= 0 ? "positive" : "negative"}>
                {item.returns.toFixed(2)}%
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteInvestment(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;