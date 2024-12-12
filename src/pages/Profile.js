import React, { useEffect } from 'react';
import './profile.css';
import axios from 'axios';
import { useState } from 'react';
import News from '../components/news.js';
import { Link, useNavigate } from 'react-router-dom';

function Profile({ username }) {
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const [user, setUser] = useState(null)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const navigate = useNavigate()
    
    const API_KEY ='775c0d7ee555978a2f19d45471ffa589'
    const baseURL = 'https://api.themoviedb.org/3'

    

    const handleLogout = () => {
      try {
        // Hae token sessionStoragesta
        const token = sessionStorage.getItem('token')
        console.log('Token:', token)

        // Poista token sessionStoragesta
        sessionStorage.removeItem('token')

        //Nollaa käyttäjä
        setUser(null)
        sessionStorage.removeItem('currentUser')
        
        //Ohjaa käyttäjä Home-sivulle
        navigate('/')
    } catch (error) {
        console.error('Virhe kirjauduttaessa ulos:', error)
        alert('Kirjauduttaessa ulos tapahtui virhe.')
    }
  }
    
    // Poistetaan käyttäjätili
    const handleDelete = async () => {
    const confirmDelete = window.confirm('Haluatko varmasti poistaa tilisi? Tätä toimintoa ei voi perua.');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/user/delete/${username}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Tili poistettu onnistuneesti.');
        // Ohjaa käyttäjä home-sivulle
        window.location.href = '/home';
      } else {
        const data = await response.json();
        alert(`Virhe: ${data.message}`);
      }
    } catch (error) {
      console.error('Virhe:', error);
      alert('Tilin poistamisessa tapahtui virhe.');
    }
  };
  
    // Elokuvien hakeminen API:sta
    useEffect(() => {
        const genreQuery = selectedGenre === 'all' ? '' : `&with_genres=${selectedGenre}`
        // Haetaan elokuvat valitun genren mukaan
        axios.get(`${baseURL}/discover/movie?api_key=${API_KEY}&language=en-US&page=1${genreQuery}`)
        .then(response => {
            setMovies(response.data.results)
        })
        .catch(error => {
            console.error('Virhe elokuvien hakemisessa:',error)
        })
    },[selectedGenre])

    //Hae suosikkielokuvat tietokannasta
    const fetchFavoriteMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/favorites')
        setFavoriteMovies(response.data)
      } catch (error) {
        console.error('Virhe suosikkielokuvien hakemisessa:', error)
      }
      }

    // Lisää elokuva suosikkeihin
    const addToFavorite =async (movie) => { 
      try {
        const response = await axios.post('http://localhost:3001/favorites/add', {
          tmdbId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path
        })
        setFavoriteMovies((prevFavorites) => [response.data,...prevFavorites])

        } catch (error) {
          console.error('Virhe suosikkielokuvan lisäämisessä:', error)
        }
            //return prevFavorites // Ei lisätä, jos elokuva on jo listalla
    }

     // Poista elokuva suosikeista
    const removeFromFavorites = async (movieId) => {
      try {
        await axios.delete(`http://localhost:3001/favorites/${movieId}`)
        setFavoriteMovies((prevFavorites) => 
          prevFavorites.filter((movie) => movie.id !== movieId)
      )
      } catch (error) {
        console.error('Virhe suosikkielokuvan poistamisessa:', error)
      }
    }

    useEffect(() => {
      fetchFavoriteMovies()
    },[])

        
  return (
    <div>
      <nav className = "navbar">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/reviews" className="nav-link">Reviews</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
    <div className='profile-container'>
      <h1>Profiili</h1>
      <h2> Tervetuloa {username}!</h2>
      <button type="submit" className="delete-button" onClick={handleDelete}>
        Poista tili
      </button>
    </div>
    <News />
    <button onClick={toggleMenu} className="toggle-menu-button">
          {isMenuOpen ? 'Sulje valikko' : 'Näytä elokuvat'}
    </button>
    
    {isMenuOpen && (
    <div className={`movie-container ${isMenuOpen ? 'open' : ''}`}>
        <h2>Valitse genre</h2>
      <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
        <option value="27">Kauhu</option>
        <option value="28">Toiminta</option>
        <option value="35">Komedia</option>
        <option value="18">Draama</option>
        <option value="878">Sci-Fi</option>
        {/* Lisää muita genrejä tarpeen mukaan */}
      </select>

      <h2>Elokuvat genrestä {selectedGenre}</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} className="movie-item">
            <img 
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
              alt={movie.title} 
            />
            <p>{movie.title}</p>
            <button onClick={() => addToFavorite(movie)}>Lisää suosikiksi</button>
          </li>
        ))}
      </ul>
      </div>
    )}

      <h2>Top 5 leffat</h2>
      <div className="favorite-list">
        {favoriteMovies.slice(0, 5).map(movie => (
          <div key={movie.id} className="movie-item">
            <img 
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
              alt={movie.title} 
            />
            <p>{movie.title}</p>
            <button onClick={() => removeFromFavorites(movie.id)}>Poista</button>
          </div>
        ))}
        </div>
    </div>
    
  );
}




export default Profile