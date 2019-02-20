const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: String,
    model: String,
    userId: String,
});

module.exports = mongoose.model('Device', deviceSchema);