const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  topics: {
    type: [String],
    required: true,
  },
  document: {
    type: String,
    required: true
  },
  publication_year: {
    type: String,
    required: true
  },	
  publication_cycle: {
    type: String,
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
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  comments: {
    type: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        required: true
      },
      history: {
        type: [String],
        default: []
      }
    }],
    default: []
  }
}, { timestamps: true });

module.exports = Mongoose.model('Post', PostSchema);