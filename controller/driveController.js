const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
require("dotenv").config();

// Load the service account key JSON file
const keyFilePath = path.join(process.env.APIKEY_PATH);

// Create an instance of Google Drive API with service account credentials
const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

// Create an instance of the Google Drive API
const drive = google.drive({
  version: "v3",
  auth: auth,
});

const driveController = {
  // Function to upload a file to Google Drive
  uploadFile: async (req, res) => {
    // const { filePath, mimeType, fileName } = req.body;

    const filePath = path.join(
      "/home/nishaltaylor/workspace/projects/node-google-drive-file-upload/download.png"  // path of the file that we upload 
    );
    const mimeType = "image/jpeg"; // Change according to the file type (e.g., 'image/jpeg' for images)
    const fileName = "test.jpg"; // Name the file as we want to upload on drive 

    const fileMetadata = {
      name: fileName,
      // parents: ['']   // paste here folder id if want to upload file in a folder
    };

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath),
    };

    try {
      const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id",
      });

      res.json({
        message: "File uploaded successfully.",
        fileId: response.data.id,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Error uploading file" });
    }
  },
};

module.exports = driveController;
