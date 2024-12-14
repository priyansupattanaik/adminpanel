const express = require("express");
const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../models/userModel"); // Assuming you have this function

const router = express.Router();

// Login route
router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Fetch user from the database by username
  getUserByUsername(username, (error, results) => {
    if (error) {
      console.error("Database error:", error); // Log the actual error for debugging
      return res.status(500).json({ message: "Database error", error });
    }

    // Check if user exists
    if (results.length === 0) {
      console.warn(`Login failed for username: ${username}`); // Log invalid login attempt
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = results[0];

    // Directly compare password (no hashing required)
    if (password !== user.password) {
      console.warn(
        `Login failed for username: ${username} - Password mismatch`
      );
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET || "secret_key", // Use a proper secret key
      { expiresIn: "1h" }
    );

    console.log(`Login successful for username: ${username}`); // Log successful login

    return res.status(200).json({ message: "Login successful", token });
  });
});

module.exports = router;
