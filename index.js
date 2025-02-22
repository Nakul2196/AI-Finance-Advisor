const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoute = require("./routes/auth.js");
const newsRoutes = require("./routes/newsRoutes.js");
const portfolioRoutes = require("./routes/portfolio.js");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const FinanceBot = require("./routes/FinanceBot.js");
const stocksRoutes = require("./routes/stocks.js"); 


dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet()); 
app.use(morgan("dev"));

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/financebot", FinanceBot);
app.use("/api/stocks", stocksRoutes); 


app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.stack : {}, 
  });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
