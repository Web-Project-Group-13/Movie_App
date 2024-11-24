import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    //<Router>
      <Routes>
        {/* Kirjautumissivu */}
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          } 
        />

        {/* Rekisteröintisivu */}
        <Route 
          path="/register" 
          element={<Register />}
        />
        {/* Home-sivu */}
        <Route 
          path="/" 
          element={
            user ? <Home /> : <Navigate to="/login" />
          } 
        />

        {/* Julkinen Home ilman kirjautumista */}
        <Route 
          path="/home" 
          element={<Home />} />
      </Routes>
    //</Router>
  );
}

export default App;