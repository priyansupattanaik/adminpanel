const express = require("express");
const multer = require("multer");
const path = require("path");
const { addEvent } = require("../controllers/eventController");

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

module.exports = router;
