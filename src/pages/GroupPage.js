import React, {useState,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FinnkinoSearch from '../components/FinnkinoSearch';

const GroupPage = ({currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState(null);
  const [tmdbQuery, setTmdbQuery] = useState('');
  const [tmdbResults, setTmdbResults] = useState([]);
  const [groupMovies, setGroupMovies] = useState([]);
  const [showResults, setShowResults] = useState(false);

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
    setShowResults(true);
  } catch (error) {
    alert('Virhe TMDb-haussa: ' + error.message);
  }
};

// Lisää elokuva ryhmään
const handleAddMovie = async (movie) => {
  if (groupMovies.some((m) => m.movieId === movie.id)) {
    alert('Elokuva on jo lisätty tähän ryhmään.');
    return;
  }

  const newMovie = {
    movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      //userId: currentUser.id,
  }

  try {
    const response = await axios.post(`http://localhost:3001/groups/${id}/movies`,newMovie) 
    setGroupMovies([...groupMovies, response.data]);

    setTmdbQuery('');
    setShowResults(false);
  } catch (error) {
    alert('Virhe elokuvaa lisättäessä: ' + error.message);
  }
};

  if (!group) {
    return <p>Ryhmää ei löydy.</p>;
  }

  return (
    <div>
      <nav className="navbar">
      <button onClick={() => navigate('/groups')}>Takaisin ryhmiin</button>
      </nav>

      <h1>{group.name}</h1>
      <p>Omistaja: {group.owner}</p>
      <h2>Jäsenet</h2>
      <ul>
        {group.members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
      
      <h2>Hae elokuvia</h2>
      <p>Voit lisätä ryhmään elokuvia TMDb-haun kautta.</p>
      <input
        type="text"
        placeholder="Hae elokuvia..."
        value={tmdbQuery}
        onChange={(e) => setTmdbQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Hae</button>

      {showResults && (
      <div className="tmdb-results">
        {tmdbResults.map((movie) => (
          <div key={movie.id} className="movie-item">
            <h3>{movie.title}</h3>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <p>Ei kuvaa</p>
            )}
            <button onClick={() => handleAddMovie(movie)}>Lisää ryhmään</button>
          </div>
        ))}
        <button onClick={() => setShowResults(false)} classname="close-results">Sulje hakutulokset</button>
      </div>
      )}

      

      <h2>Ryhmän elokuvasuositukset</h2>
      
      <div className="group-movies">
        {groupMovies.map((movie, index) => (
          <div key={index} className="movie-item">
            <p>{movie.title}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            )}
          </div>
        ))}
      </div>
      <FinnkinoSearch />
    </div>
  );
};

export default GroupPage;