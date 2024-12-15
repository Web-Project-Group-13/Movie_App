import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FinnkinoSearch.css';

const FinnkinoSearch = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [showtimes, setShowtimes] = useState([]); // Tulokset haulle
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]); // Kaikki elokuvat (karuselli)

  const finnkinoApiUrl = 'https://www.finnkino.fi/xml/Schedule/?area=1018'; // Oulu Plaza alue (ID: 1018)

  // Haetaan kaikki elokuvat karusellia varten
  const fetchMovies = async () => {
    try {
      setError(null); // Nollataan aiemmat virheet
      const response = await axios.get(finnkinoApiUrl);
      const parser = new DOMParser();
      const xml = parser.parseFromString(response.data, 'application/xml');
      const shows = Array.from(xml.getElementsByTagName('Show'));

      // Suodatetaan uniikit elokuvat
      const uniqueMovies = new Map();
      shows.forEach((show) => {
        const title = show.getElementsByTagName('Title')[0].textContent;
        const imageTag = show.getElementsByTagName('EventMediumImagePortrait')[0];
        const posterUrl = imageTag ? imageTag.textContent : null;

        if (!uniqueMovies.has(title)) {
          uniqueMovies.set(title, { title, posterUrl });
        }
      });

      setMovies(Array.from(uniqueMovies.values())); // Tallennetaan kaikki elokuvat
    } catch (err) {
      console.error('Virhe haettaessa elokuvia:', err);
      setError('Virhe haettaessa elokuvia. Yritä myöhemmin uudelleen.');
    }
  };

  // Haetaan elokuvia nimen perusteella
  const fetchShowtimes = async () => {
    try {
      setError(null); // Nollataan aiemmat virheet
      const response = await axios.get(finnkinoApiUrl);
      const parser = new DOMParser();
      const xml = parser.parseFromString(response.data, 'application/xml');
      const shows = Array.from(xml.getElementsByTagName('Show'));

      // Suodatetaan näytökset käyttäjän antaman nimen perusteella
      const filteredShows = shows.filter((show) =>
        show.getElementsByTagName('Title')[0].textContent
          .toLowerCase()
          .includes(movieTitle.toLowerCase())
      );

      const results = filteredShows.map((show) => ({
        title: show.getElementsByTagName('Title')[0].textContent,
        startTime: show.getElementsByTagName('dttmShowStart')[0].textContent,
        endTime: show.getElementsByTagName('dttmShowEnd')[0].textContent,
        theater: show.getElementsByTagName('TheatreAndAuditorium')[0].textContent,
        posterUrl: show.getElementsByTagName('EventMediumImagePortrait')[0]?.textContent || null,
      }));

      setShowtimes(results); // Tallennetaan hakutulokset
    } catch (err) {
      setError('Virhe haettaessa elokuvia. Yritä myöhemmin uudelleen.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies(); // Ladataan karusellin elokuvat heti
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchShowtimes(); // Haetaan elokuvat nimen perusteella
  };

  return (
    <div className="finnkino-search">
      <h2>Finnkino Plaza</h2>
      <p>Tarkista elokuvien esitysajat</p>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Syötä elokuvan nimi"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <button type="submit">Hae</button>
      </form>

      {error && <p className="error">{error}</p>}

      {/* Näytä hakutulokset */}
      {showtimes.length > 0 && (
        <div>
          <h3>Hakutulokset:</h3>
          <div className="movie-container">
            {showtimes.map((show, index) => (
              <div key={index} className="movie-item">
                <img
                  src={show.posterUrl || 'https://via.placeholder.com/150'}
                  alt={show.title}
                  className="movie-image"
                />
                <h3>{show.title}</h3>
                <p>Alkaa: {new Date(show.startTime).toLocaleString()}</p>
                <p>Päättyy: {new Date(show.endTime).toLocaleString()}</p>
                <p>Teatteri: {show.theater}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Näytä kaikki elokuvat (karuselli) */}
      {movies.length > 0 && (
        <div>
          <h3>Tällä hetkellä pyörivät elokuvat:</h3>
          <div className="movie-container">
            {movies.map((movie, index) => (
              <div key={index} className="movie-item">
                <img
                  src={movie.posterUrl || 'https://via.placeholder.com/150'}
                  alt={movie.title}
                  className="movie-image"
                />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinnkinoSearch;
