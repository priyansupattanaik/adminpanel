const express = require("express");
const multer = require("multer");
const path = require("path");
const { addEvent } = require("../controllers/eventController");
const db = require("../config/db"); // Import the db connection pool

const router = express.Router();

// Set up multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); // Ensure the correct path for uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define route for adding an event
router.post("/add-event", upload.single("eventImage"), addEvent);

// Define route for fetching all events
router.get("/all-events", (req, res) => {
  console.log("Received request for all events");

  const query = "SELECT * FROM upcoming_events"; // SQL query to fetch events

  // Execute the query using the db pool
  db.execute(query, (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ message: "Error fetching events" });
    }
    res.status(200).json(results); // Send events data as JSON response
  });
});

module.exports = router;
