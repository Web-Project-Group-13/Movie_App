import { useEffect, useState } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import './App.css';

function App() {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

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

  // Muuttaa päivämäärän oikeaan formaattiin (dd.mm.yyyy)
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Hakee elokuvat valitusta teatterista ja päivämäärästä
  useEffect(() => {
    const fetchMovies = async () => {
      if (!selectedCinema || !selectedDate) return;

      try {
        const formattedDate = formatDate(selectedDate);
        const response = await axios.get(`https://www.finnkino.fi/xml/Schedule/?area=${selectedCinema}&dt=${formattedDate}`);
        const parser = new XMLParser();
        const json = parser.parse(response.data);
        
        setMovies(json.Schedule.Shows.Show || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies(); // Käynnistetään elokuvahaku, kun `selectedCinema` tai `selectedDate` muuttuu
  }, [selectedCinema, selectedDate]);

  const handleCinemaChange = (e) => {
    setSelectedCinema(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <h1>Finnkinon elokuvateattereiden näytösajat</h1>
      
      <select value={selectedCinema} onChange={handleCinemaChange}>
        <option value="">Valitse teatteri</option>
        {cinemas.map(cinema => (
          <option key={cinema.ID} value={cinema.ID}>
            {cinema.Name}
          </option>
        ))}
      </select>

      <div>
        <label htmlFor="date">Valitse päivä: </label>
        <input 
          type="date" 
          id="date" 
          value={selectedDate} 
          onChange={handleDateChange} 
        />
      </div>

      {selectedCinema && selectedDate && (
        <>
          <h2>Elokuvat</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {movies.length === 0 ? (
              <li>Ei elokuvia valitulle päivälle.</li>
            ) : (
              movies.map(movie => (
                <li key={movie.ID} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <img 
                    src={movie.Images.EventSmallImagePortrait} 
                    alt={movie.Title} 
                    style={{ width: '50px', height: '75px', marginRight: '10px' }} 
                  />
                  <div>
                    <h3>{movie.Title}</h3>
                    <p>Alkaa: {new Date(movie.dttmShowStart).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>Sali: {movie.TheatreAuditorium}</p>
                    
                    {movie.RatingImageUrl && (
                      <img 
                        src={movie.RatingImageUrl} 
                        alt="Ikäraja" 
                        style={{ width: '30px', height: '30px', marginRight: '10px' }} 
                      />
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;