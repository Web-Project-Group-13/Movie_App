import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import Groups from './pages/Groups';
import GroupPage from './pages/GroupPage';

function App() {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([
    {
      id: '123',
      name: 'Testiryhmä',
      owner: 'testi3@oamk.fi',
      members: ['testi3@oamk.fi'],
    },
  ]); // Ryhmädata

  const handleLogin = (username) => {
    setUser(username);
  };

  const username = 'testi3@oamk.fi'; // Hae tämä myöhemmin kirjautuneen käyttäjän tiedoista

  return (
    <Routes>
      {/* Kirjautumissivu */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
      />

      {/* Rekisteröintisivu */}
      <Route path="/register" element={<Register />} />

      {/* Home-sivu */}
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

      {/* Julkinen Home ilman kirjautumista */}
      <Route path="/home" element={<Home />} />

      {/* Profiilisivu */}
      <Route path="/profile" element={<Profile username={username} />} />

      {/* Reviews-sivu */}
      <Route path="/reviews" element={<Reviews />} />

      {/* Ryhmät-sivu */}
      <Route
        path="/groups"
        element={
          <Groups
            groups={groups}
            setGroups={setGroups}
            currentUser={username} // Käyttäjätieto
          />
        }
      />

      {/* Yksittäisen ryhmän sivu */}
      <Route
        path="/groups/:id"
        element={
          <GroupPage
            groups={groups}
            currentUser={username} // Käyttäjätieto
          />
        }
      />
    </Routes>
  );
}

export default App;