const cloudinary = require('cloudinary').v2;
const debug = require('debug')('app:cloudinary.tools');
const tools = {};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

tools.uploadFile = async (file, fileName) => {
  try {
    const result = await cloudinary.uploader.upload(file, {public_id: fileName});
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = tools;