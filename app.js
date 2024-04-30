const express = require("express");
const driveRoutes = require("./router/driveRoutes");
require("dotenv").config();

const app = express();
const port = process.env.NODE_PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the drive routes
app.use("/drive", driveRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
