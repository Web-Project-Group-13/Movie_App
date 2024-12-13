import React, {useState,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GroupPage = ({currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState(null);
  const [tmdbQuery, setTmdbQuery] = useState('');
  const [tmdbResults, setTmdbResults] = useState([]);
  const [groupMovies, setGroupMovies] = useState([]);

 // Hae ryhmä ja elokuvat
 useEffect(() => {
  const fetchGroup = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/groups/${id}`);
      console.log('Ryhmä:', response.data);
      setGroup(response.data);
    } catch (error) {
      alert('Virhe ryhmän tietojen haussa: ' + error.message);
    }
  };

  const fetchGroupMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/groups/${id}/movies`);
      setGroupMovies(response.data);
    } catch (error) {
      console.error('Virhe ryhmän elokuvien haussa:', error);
    }
  };

  fetchGroup();
  fetchGroupMovies();
}, [id]);

// TMDb-elokuvahaku
const handleSearch = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: '775c0d7ee555978a2f19d45471ffa589',
        query: tmdbQuery,
      },
    });
    setTmdbResults(response.data.results);
  } catch (error) {
    alert('Virhe TMDb-haussa: ' + error.message);
  }
};

// Lisää elokuva ryhmään
const handleAddMovie = async (movie) => {
  try {
    const response = await axios.post(`http://localhost:3001/groups/${id}/movies`, {
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
    });
    setGroupMovies([...groupMovies, response.data]);
  } catch (error) {
    alert('Virhe elokuvaa lisättäessä: ' + error.message);
  }
};

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
      <h2>TMDb-elokuvahaku</h2>
      <input
        type="text"
        placeholder="Hae elokuvia..."
        value={tmdbQuery}
        onChange={(e) => setTmdbQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Hae</button>
      <ul>
        {tmdbResults.map((movie) => (
          <li key={movie.id}>
            <p>{movie.title}</p>
            <button onClick={() => handleAddMovie(movie)}>Lisää ryhmään</button>
          </li>
        ))}
      </ul>

      <h2>Ryhmän elokuvasuositukset</h2>
      <ul>
        {groupMovies.map((movie, index) => (
          <li key={index}>
            <p>{movie.title}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupPage;