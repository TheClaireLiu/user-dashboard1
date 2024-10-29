// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ role, token }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'regular' });

  useEffect(() => {
    if (role === 'admin') {
      console.log("Admin role detected, loading users...");
      loadUsers();
    }
  }, [role]);

  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Users loaded: ", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password || !newUser.role) {
      alert("Please enter a valid username, password, and role.");
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/users', newUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewUser({ username: '', password: '', role: 'regular' });
      loadUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async (userId) => {
    const updatedUsername = prompt('Enter new username:');
    if (updatedUsername) {
      try {
        await axios.put(`http://localhost:5000/api/users/${userId}`, { username: updatedUsername, role: 'regular' }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        loadUsers();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      loadUsers(); // Reload users after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600">Dashboard</h2>
        {role === 'admin' ? (
          <div className="w-full space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Total Users: {users.length}</h3>
            <div className="flex items-center mb-4 space-x-2">
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="Enter new username"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Enter password"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="regular">Regular User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-200"
              >
                Add User
              </button>
            </div>
            {users.length > 0 ? (
              <table className="w-full table-auto bg-white border border-gray-300 rounded-lg">
                <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left text-gray-700">Username</th>
                  <th className="px-4 py-2 text-left text-gray-700">Role</th>
                  <th className="px-4 py-2 text-left text-gray-700">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{user.username}</td>
                    <td className="px-4 py-2 border-b">{user.role}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleEditUser(user._id)}
                        className="mr-2 px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-700">No users found.</p>
            )}
          </div>
        ) : (
          <div className="w-full text-center">
            <h3 className="text-xl font-semibold text-gray-700">Welcome, {role} user!</h3>
            <p className="text-gray-600">You do not have admin privileges.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
