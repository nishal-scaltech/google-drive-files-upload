const express = require("express");
const driveController = require("../controller/driveController");

const router = express.Router();

// Route for uploading a file
router.post("/upload", driveController.uploadFileThroughApi);

module.exports = router;
