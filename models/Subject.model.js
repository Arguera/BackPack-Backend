const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const SubjectSchema = new Schema({
  code: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true,
    required: true
  }
},{ timestamps: true });

module.exports = Mongoose.model('Subject', SubjectSchema);