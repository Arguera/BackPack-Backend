const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const DocumentSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  topics: {
    type: [String],
    required: true,
  },
  url: {
    type: String,
    required: true
  },
  publication_year: {
    type: Number,
    required: true
  },	
  publication_cycle: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    required: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = Mongoose.model('Document', DocumentSchema);