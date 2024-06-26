const { uploadFile } = require('../utils/cloudinary.tools');
const fs = require('fs');
debug = require('debug')('app:general.service');

const services = {};

services.uploadAndDeleteFile = async (file) => {
  try {
    const document = await uploadFile(file.path, file.filename);
    fs.unlinkSync(file.path), (error) => {
      if(error) {
        console.error(error);
        return;
      }
    };
    return document ? document.secure_url : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = services;