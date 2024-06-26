const Post = require('../models/Post.model');
const { uploadAndDeleteFile } = require('./general.service');
const debug = require('debug')('app:post.service');
const httpError = require('http-errors');

const service = {};

service.save = async (req) => {

  const {
    title, 
    topics,
    publication_year, 
    publication_cycle,
    category,
    subject
  } = req.body;

  const file = req.file;

  const { identifier } = req.params;
  const { user } = req;

  let post = await Post.findById(identifier);

  if(!post) {
    post = new Post();
    post['user'] = user._id;
  } 

  if(!post['user'].equals(user._id)) throw httpError(403, 'This is not your post')
  
  const document = await uploadAndDeleteFile(file);

  if(!document) throw httpError(409, 'Error uploading document')

  post['title'] = title;
  post['topics'] = topics;
  post['document'] = document;
  post['publication_year'] = publication_year;
  post['publication_cycle'] = publication_cycle;
  post['category'] = category;
  post['subject'] = subject;

  const postSaved = await post.save();

  if(!postSaved) throw httpError(409, 'Error saving post')

  return { message : "Ok" };
}

module.exports = service;