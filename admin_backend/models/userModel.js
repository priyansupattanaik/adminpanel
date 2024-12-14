const pool = require("../config/db"); // Path to the connection.js file
const mysql = require("mysql");

// Function to get user by username from the user_admin table
const getUserByUsername = (username, callback) => {
  const query = "SELECT * FROM user_admin WHERE username = ?"; // Using the user_admin table
  pool.query(query, [username], (error, results) => {
    if (error) {
      return callback(error);
    }
    callback(null, results);
  });
};

module.exports = { getUserByUsername };
