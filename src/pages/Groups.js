import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Groups.css';
import axios from 'axios';

const Groups = ({ currentUser }) => {
  const [newGroupName, setNewGroupName] = useState('')
  const [groups, setGroups] = useState([])
  const navigate = useNavigate()

  // Hae ryhmät tietokannasta
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Virhe ryhmien haussa:', error);
      }
    };
    fetchGroups();
  }, []);


  const handleCreateGroup = async () => {
    if (!currentUser) {
      alert('Vain kirjautunut käyttäjä voi luoda ryhmän.');
      return;
    }
    if (!newGroupName.trim()) {
      alert('Anna ryhmälle nimi!');
      return;
    }
    try {

    const response =await axios.post('http://localhost:3001/groups/add', {
      name: newGroupName,
      owner: currentUser,
      members: [currentUser],
    });
    setGroups((prevGroups) => [...prevGroups, response.data]);
    setNewGroupName('');
  }catch (error) {
    console.error('Virhe ryhmän luomisessa:', error.message);
  }
}

  const handleDeleteGroup = async (id,owner) => {
    if (owner !== currentUser) {
      alert('Vain ryhmän omistaja voi poistaa tämän ryhmän');
      return;
    }
    try {
      await axios.delete(`http://localhost:3001/groups/${id}`);
      setGroups(groups.filter((group) => group.id !== id));
  }catch (error) {
    console.error('Virhe ryhmän poistamisessa:', error.message);
  }
}

  // Näytä ryhmän sisältö
  const handleViewGroup = (id,members = []) => {
    console.log('Ryhmän jäsenet:', members);
    console.log('Kirjautunut käyttäjä:', currentUser);

    // Tarkista onko käyttäjä ryhmän jäsen
    if (!Array.isArray(members)) {
      alert('Virhe ryhmän jäsenten haussa');
      return;
    }
    
    if (!members.includes(currentUser)) {
      alert('Vain ryhmän jäsenet voivat tarkastella sisältöä');
      return;
    }
    // Navigoi ryhmän sivulle
    navigate(`/groups/${id}`);
  };


  return (
    <div className="groups">
      <nav className="navbar">
        <ul>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/home">Home</Link>
        </ul>
      </nav>

      <h1>Ryhmät</h1>
      <div className="create-group">
        <input
          type="text"
          placeholder="Ryhmän nimi"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <button onClick={handleCreateGroup}>Luo ryhmä</button>
      </div>

      <h2>Luodut ryhmät</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id} className="group-item">
            <span>{group.name}</span>
            <button onClick={() => handleViewGroup(group.id, group.members)}>Näytä</button>
            {group.owner === currentUser && (
              <button onClick={() => handleDeleteGroup(group.id, group.owner)}>Poista</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;