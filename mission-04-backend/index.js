// Azure Computer Vision AI
// Code snippets from https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vision/ai-vision-image-analysis-rest/samples/javascript/analyzeImageFromLocalFile.js

const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const Car = require("./Car");

mongoose.connect('mongodb://localhost:27017/mission-ready', {
})
.then(() => {
    console.log('Connected to MongoDB!');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use(cors());
app.use(express.json());

require("dotenv").config();

// Resource Endpoint and Key Info
const endpoint = process.env['VISION_ENDPOINT']
const key = process.env['VISION_KEY']
const credential = new AzureKeyCredential(key);

const client = createClient (endpoint, credential);

// Desired Features from Image
const feature = [
  'Caption',
  'DenseCaptions',
  'Objects',
  // 'People',
  // 'Read',
  // 'SmartCrops',
  'Tags'
];

// Listen at Port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Post Request
app.post('/upload', (req, res) => {
  console.log(req.body.imageName);
  const imagePath = `../mission-04-frontend/public/${req.body.imageName}`;

  async function analyzeImageFromFile() {
    const imageBuffer = fs.readFileSync(imagePath);

    const result = await client.path('/imageanalysis:analyze').post({
      body: imageBuffer,
      queryParameters: {
        features: feature
      },
      contentType: 'application/octet-stream'
    });

    const iaResult = result.body;
    console.log(iaResult);

    let colour;

    // Log the response using more of the API's object model
    if (iaResult.captionResult) {
      console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
      const words = iaResult.captionResult.text.split(" ")
      colour = words[1];
      console.log(`Colour: ${colour}`);
    }

    run()
    async function run() {
        try {
            const cars = await Car.where("colour").equals(`${colour}`).select("model").select("colour").select("year")
            console.log(cars.map(car => car.model));
            res.send(cars);
        } catch (e) {
            console.log(e.message)
        }
    }
  }

  analyzeImageFromFile();

});

