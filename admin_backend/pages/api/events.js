const express = require("express");
const multer = require("multer");
const { addEvent } = require("../../controllers/eventController");

const router = express.Router();

// Set up multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define the POST route for event creation
router.post("/add-event", upload.single("eventImage"), addEvent);

module.exports = router;
