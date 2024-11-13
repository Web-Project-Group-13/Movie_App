import { useEffect, useState } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import './App.css';

function App() {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState('');
  const [movies, setMovies] = useState([]);

  // Hakee teatterit
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get('https://www.finnkino.fi/xml/TheatreAreas/');
        const parser = new XMLParser();
        const json = parser.parse(response.data);
        setCinemas(json.TheatreAreas.TheatreArea);
      } catch (error) {
        console.error('Error fetching cinemas:', error);
      }
    };
    fetchCinemas();
  }, []);

  // Hakee elokuvat valitusta teatterista
  const fetchMovies = async (cinemaId) => {
    try {
      const response = await axios.get(`https://www.finnkino.fi/xml/Schedule/?area=${cinemaId}`);
      const parser = new XMLParser();
      const json = parser.parse(response.data);
      setMovies(json.Schedule.Shows.Show || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Käsittelee teatterin valinnan
  const handleCinemaChange = (e) => {
    const cinemaId = e.target.value;
    setSelectedCinema(cinemaId);
    fetchMovies(cinemaId);
  };

  return (
    <div>
      <h1>Valitse elokuvateatteri</h1>
      <select value={selectedCinema} onChange={handleCinemaChange}>
        <option value="">Valitse teatteri</option>
        {cinemas.map(cinema => (
          <option key={cinema.ID} value={cinema.ID}>
            {cinema.Name}
          </option>
        ))}
      </select>

      <h2>Elokuvat</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
      {movies.map(movie => (
  <li key={movie.ShowID} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
    <img 
      src={movie.Images.EventSmallImagePortrait} 
      alt={movie.Title} 
      style={{ width: '50px', height: '75px', marginRight: '10px' }} 
    />
    <div>
      <h3>{movie.Title}</h3>
      <p>Alkaa: {new Date(movie.dttmShowStart).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}</p>
      <p>Sali: {movie.TheatreAuditorium}</p>

      {/* Ikärajan kuva */}
      {movie.RatingImageUrl && (
        <img 
          src={movie.RatingImageUrl} 
          alt="Ikäraja" 
          style={{ width: '30px', height: '30px', marginRight: '10px' }} 
        />
      )}
      

    </div>
  </li>
))}


        
      </ul>
    </div>
  );
};

export default App;
