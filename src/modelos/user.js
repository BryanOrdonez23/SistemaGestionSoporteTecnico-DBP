const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

var userSchema = new Schema({
    user:  String,
    password: String,
    date: { type: Date, default: Date.now },
  })
  
  
  var user = mongoose.model('user', userSchema)
  module.exports = userSchema