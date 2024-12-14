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
  const query = "SELECT * FROM upcoming_events"; // SQL query to fetch events

  db.execute(query, (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ message: "Error fetching events" });
    }
    res.status(200).json(results); // Send events data as JSON response
  });
});

// Move an event to completed
router.put("/complete-event/:id", (req, res) => {
  const eventId = req.params.id;

  // Update the event status to 'completed' in the database
  const query = "UPDATE upcoming_events SET status = 'completed' WHERE id = ?";
  db.execute(query, [eventId], (err, results) => {
    if (err) {
      console.error("Error updating event status:", err);
      return res.status(500).json({ message: "Error completing event" });
    }
    res.status(200).json({ message: "Event completed successfully" });
  });
});

// Fetch all completed events
router.get("/completed-events", (req, res) => {
  const query = "SELECT * FROM upcoming_events WHERE status = 'completed'";

  db.execute(query, (err, results) => {
    if (err) {
      console.error("Error fetching completed events:", err);
      return res
        .status(500)
        .json({ message: "Error fetching completed events" });
    }
    res.status(200).json(results);
  });
});

router.delete("/delete-completed-event/:id", (req, res) => {
  const eventId = req.params.id;

  // Update the query to delete from upcoming_events if that's where the events are stored
  const query =
    "DELETE FROM upcoming_events WHERE id = ? AND status = 'completed'";

  db.execute(query, [eventId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting event", error: err });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Event not found or not completed" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  });
});

module.exports = router;
