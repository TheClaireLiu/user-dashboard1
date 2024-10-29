// backend/models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'regular'], required: true }
});

// 在保存用户之前自动加密密码
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // 如果密码没有修改，则跳过加密
  try {
    const salt = await bcrypt.genSalt(10); // 生成盐
    this.password = await bcrypt.hash(this.password, salt); // 使用盐加密密码
    next();
  } catch (error) {
    next(error); // 出错时跳转到错误处理
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;