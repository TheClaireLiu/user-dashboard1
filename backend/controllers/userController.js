// backend/controllers/userController.js
const User = require('../models/userModel');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  const { username, role } = req.body;
  if (!username || !role) {
    return res.status(400).json({ message: 'Username and role are required.' });
  }
  try {
    const user = new User({ username, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ message: 'Username and role are required.' });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { username, role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};