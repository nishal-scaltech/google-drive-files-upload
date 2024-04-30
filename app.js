const express = require("express");
const driveRoutes = require("./router/driveRoutes");
require("dotenv").config();
const cron = require("node-cron");
const driveController = require("./controller/driveController");

const app = express();
const port = process.env.NODE_PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the drive routes
app.use("/drive", driveRoutes);


//cron-job for every saturday and sunday at 10AM 
cron.schedule("0 10 * * 6,0", driveController.uploadFile, {
  timezone: "Asia/Kolkata",
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//"0 10 * * 6,0"
