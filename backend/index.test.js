const request = require('supertest');
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// User data (mocked for tests)
let users = [
  { id: 1, username: 'Alice', role: 'admin' },
];

// Create endpoint (example)
app.post('/api/users', (req, res) => {
  const { username, role } = req.body;
  if (!username || !role) {
    return res.status(400).json({ message: 'Username and role are required.' });
  }
  const newUser = { id: users.length + 1, username, role };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Test case
describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'Bob', role: 'regular' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username', 'Bob');
  });
});