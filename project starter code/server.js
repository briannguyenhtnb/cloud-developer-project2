import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import imageType from 'image-type';

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
    const imageResponse = await axios.get(image_url, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data);
    const { ext, mime } = imageType(imageBuffer) || { ext: 'jpg', mime: 'image/jpeg' };
    res.set('Content-Type', mime);
    res.status(200).send(imageBuffer);
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