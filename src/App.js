import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import './App.css';




function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState('')
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

  const searchMovie = async (query) => {
    const api_key = '5f648183b0ec81590193f7689d670ec0';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json();
      console.log(data.results)
      setResults(data.results)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') { 
      searchMovie(query); 
    }
  }


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

<div>
  <input 
  placeholder="Laita Teksti Tähän" 
  value={query}
  onChange={(e) => setQuery(e.target.value)} 
  onKeyDown={handleKeyPress}
  />
</div>

<div>
  <h2>Results:</h2>
  {results.length > 0 ? (
    <ul style={{ listStyleType: 'none', padding: 0}}>
      {results.map((movie) => (
        <li
          key={movie.id}
          style = {{
            border: '1px solid #ddd',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
          }}
          >
            <h3 style={{ margin: '0 0 10px' }}>{movie.title}</h3>
            <p style= {{ margin: 0 }}>
              {movie.overview
              ? movie.overview
              : 'No description available'}
            </p>
          </li>
      ))}
    </ul>
  ) : (
    <p>No movies found. Try searching for something else!</p>
  )}
</div>


        
      </ul>
    </div>
  );
};


export default App;
