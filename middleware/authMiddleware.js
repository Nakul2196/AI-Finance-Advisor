const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if the token is in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Debug: Log the token and secret
      console.log("Token:", token);
      console.log("JWT Secret:", process.env.JWT_SECRET);

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      // Find the user by ID and exclude the password
      req.user = await User.findById(decoded.id).select("-password");

      // Check if the user exists
      if (!req.user) {
        return res.status(401).json({ message: "User not found, token invalid" });
      }

      // Proceed to the next middleware/route
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return res.status(401).json({ message: "Not authorized, invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };