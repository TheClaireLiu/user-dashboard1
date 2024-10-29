const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany(); // 清空用户集合

    const users = [
      {
        username: 'adminUser',
        password: await bcrypt.hash('admin123', 10), // 加密密码
        role: 'admin',
      },
      {
        username: 'regularUser1',
        password: await bcrypt.hash('user123', 10), // 加密密码
        role: 'regular',
      },
      {
        username: 'regularUser2',
        password: await bcrypt.hash('user123', 10), // 加密密码
        role: 'regular',
      },
    ];

    await User.insertMany(users); // 批量插入用户
    console.log('Default users added successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
