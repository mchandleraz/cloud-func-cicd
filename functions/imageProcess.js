const gm = require('gm').subClass({imageMagick: true});
const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
const vision = require('@google-cloud/vision');

const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const client = new vision.ImageAnnotatorClient();

const {BLURRED_BUCKET_NAME} = process.env;

exports.imageProcessor = async event => {
  const file = storage.bucket(event.bucket).file(event.name);
  const filePath = `gs://${event.bucket}/${event.name}`;

  console.log(`Analyzing ${file.name}.`);

  try {
    const [result] = await client.safeSearchDetection(filePath);
    const detections = result.safeSearchAnnotation || {};

    if (
      // Levels are defined in https://cloud.google.com/vision/docs/reference/rest/v1/AnnotateImageResponse#likelihood
      detections.adult === 'VERY_LIKELY' ||
      detections.violence === 'VERY_LIKELY'
    ) {
      console.log(`Detected ${file.name} as inappropriate.`);
    } else {
      console.log(`Detected ${file.name} as OK.`);
    }
  } catch (err) {
    console.error(`Failed to analyze ${file.name}.`, err);
    throw err;
  }
};