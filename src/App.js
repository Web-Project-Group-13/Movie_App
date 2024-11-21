import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Kirjautumissivu */}
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          } 
        />
        {/* Home-sivu */}
        <Route 
          path="/" 
          element={
            user ? <Home /> : <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;