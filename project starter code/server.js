import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util.js'; // Import the functions

// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

/**
 * GET /filteredimage
 * Filters an image from a public URL
 * Query Params:
 * - image_url: URL of the image to filter
 * Returns:
 * - Filtered image in the response
 */
app.get('/filteredimage', async (req, res) => {
  const { image_url } = req.query;

  if (!image_url) {
    return res.status(400).send('image_url is required.');
  }

  try {
    // Call filterImageFromURL to process the image from the URL
    const filteredImagePath = await filterImageFromURL(image_url);

    // Send the filtered image in the response
    res.sendFile(filteredImagePath, async (err) => {
      if (err) {
        return res.status(500).send(`An error occurred while sending the image: ${err.message}`);
      }

      // Delete the local file after sending it
      await deleteLocalFiles([filteredImagePath]);
    });
  } catch (error) {
    res.status(500).send(`An error occurred: ${error.message}`);
  }
});

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}");
});

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
