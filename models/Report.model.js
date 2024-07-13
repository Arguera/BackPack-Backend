const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ReportSchema = new Schema({
    reportCause: {
        type: [String],
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = Mongoose.model('Report', ReportSchema);