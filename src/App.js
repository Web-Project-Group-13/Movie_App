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
  const [currentUser,setCurrentUser] = useState(() => {
    return sessionStorage.getItem('currentUser') || null
  })

  
  const [groups, setGroups] = useState([
    {
      id: '2',
      name: 'Testiryhmä',
      owner: 'testi7',
      members: ['testi3@oamk.fi'],
    },
  ]); // Ryhmädata

  const handleLogin = (username) => {
    setCurrentUser(username);
    sessionStorage.setItem('currentUser', username)
  };

  const username = 'testi7'; // Hae tämä myöhemmin kirjautuneen käyttäjän tiedoista

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


        
        <Route 
          path="/profile" 
          element={user ? <Profile username={username} setUser={setUser}/>: <Navigate to="/login" /> } />

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
         // Käyttäjätieto
          />
        }
      />
    </Routes>
  );
}

export default App;