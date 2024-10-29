// frontend/src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState('');

  return (
    <div className="App">
      {role ? (
        <Dashboard role={role} />
      ) : (
        <Login setRole={setRole} setToken={setToken} />
      )}
    </div>
  );
}

export default App;