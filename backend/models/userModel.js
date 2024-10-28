// backend/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  role: { type: String, enum: ['admin', 'regular'], required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;