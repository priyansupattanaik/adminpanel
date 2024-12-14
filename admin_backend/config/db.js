const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables

// Use the environment variables for the connection configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST, // E.g., localhost
  user: process.env.DB_USER, // E.g., 'root' or your MySQL username
  password: process.env.DB_PASSWORD, // Your MySQL password
  database: process.env.DB_NAME, // The database name you want to connect to
  waitForConnections: true, // Make sure connections are waiting for available slots
  connectionLimit: 10, // Limit to number of connections in the pool
  queueLimit: 0, // No queue limit
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed: ", err); // Log error
    return;
  }
  console.log("Database connected successfully");
  connection.release(); // Release connection after testing
});

// Export the pool for use in other modules
module.exports = pool;
