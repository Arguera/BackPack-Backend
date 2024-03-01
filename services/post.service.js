const Post = require('../models/Post.model');
const { uploadFile } = require('../utils/cloudinary.tools');
const fs = require('fs');

const service = {};

const uploadAndDeleteFile = async (file) => {
  try {
    const document = await uploadFile(file);
    fs.unlink(file.path);
    return document ? document.secure_url : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

service.savePost = async (user)