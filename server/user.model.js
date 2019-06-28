const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    author: String,
    roles: String
});
module.exports = mongoose.model('users',userSchema); //('document name, Schema name')