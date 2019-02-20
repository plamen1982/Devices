const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    position: Number,
    name: String,
});

module.exports = mongoose.model('User', userSchema);