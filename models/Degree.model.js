const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const DegreeSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = Mongoose.model('Degree', DegreeSchema);