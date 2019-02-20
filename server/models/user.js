const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    position: String,
    name: String,
});

module.exports = mongoose.model('User', userSchema);