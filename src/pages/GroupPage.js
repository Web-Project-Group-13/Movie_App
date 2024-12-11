import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GroupPage = ({ groups, currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const group = groups.find((g) => g.id === id);

  if (!group) {
    return <p>Ryhmää ei löydy.</p>;
  }

  // Käyttöoikeustarkistus
  if (!group.members.includes(currentUser)) {
    return <p>Sinulla ei ole oikeutta nähdä tämän ryhmän sisältöä.</p>;
  }

  return (
    <div>
      <h1>{group.name}</h1>
      <p>Omistaja: {group.owner}</p>
      <h2>Jäsenet</h2>
      <ul>
        {group.members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/groups')}>Takaisin ryhmiin</button>
    </div>
  );
};

export default GroupPage;