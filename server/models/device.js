const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
});

module.exports = mongoose.model('Device', deviceSchema);