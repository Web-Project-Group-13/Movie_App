import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Muutetaan navigointi Link-komponentiksi
import './Groups.css';

const Groups = ({ groups, setGroups, currentUser }) => {
  const [newGroupName, setNewGroupName] = useState('');

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      alert('Anna ryhmälle nimi!');
      return;
    }
    const newGroup = {
      id: Date.now().toString(),
      name: newGroupName,
      owner: currentUser,
      members: [currentUser],
    };
    setGroups([...groups, newGroup]);
    setNewGroupName('');
  };

  const handleDeleteGroup = (id) => {
    const groupToDelete = groups.find((group) => group.id === id);
    if (groupToDelete.owner !== currentUser) {
      alert('Vain ryhmän omistaja voi poistaa tämän ryhmän.');
      return;
    }
    setGroups(groups.filter((group) => group.id !== id));
  };

  const handleViewGroup = (id) => {
    const group = groups.find((group) => group.id === id);
    if (!group.members.includes(currentUser)) {
      alert('Vain ryhmän jäsenet voivat tarkastella sisältöä.');
      return;
    }
    // Navigoi ryhmän sivulle
    window.location.href = `/groups/${id}`;
  };

  return (
    <div className="groups">
      <nav className="navbar">
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li><Link to="/home">Home</Link></li>
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
            <button onClick={() => handleViewGroup(group.id)}>Näytä</button>
            {group.owner === currentUser && (
              <button onClick={() => handleDeleteGroup(group.id)}>Poista</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;