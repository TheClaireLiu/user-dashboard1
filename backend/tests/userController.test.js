// backend/tests/userController.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/userModel');
const userRoutes = require('../routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const newUser = {
      username: 'testUser',
      password: 'testPassword',
      role: 'regular',
    };

    const response = await request(app)
      .post('/api/users/register') // 确保路径与路由定义匹配
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.role).toBe(newUser.role);
  });
});
