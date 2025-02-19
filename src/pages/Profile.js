import React, { useEffect } from 'react';
import './profile.css';
import axios from 'axios';
import { useState } from 'react';
import News from '../components/news.js';
import { Link, } from 'react-router-dom';

function Profile({ user,onLogout }) {
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    //const [user, setUser] = useState(null)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    
    const API_KEY ='775c0d7ee555978a2f19d45471ffa589'
    const baseURL = 'https://api.themoviedb.org/3'

  
    
    // Poistetaan käyttäjätili
    const handleDelete = async () => {
    const confirmDelete = window.confirm('Haluatko varmasti poistaa tilisi? Tätä toimintoa ei voi perua.');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/user/delete/${user.username}`, {
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
    useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (!user || !user.username) {
        console.log('Käyttäjää ei ole kirjautunut sisään')
        return
      }
      try {
        const response = await axios.get(`http://localhost:3001/favorites/${user.username}`)
        setFavoriteMovies(response.data)
      } catch (error) {
        console.error('Virhe suosikkielokuvien hakemisessa:', error)
      }
      }

      
        fetchFavoriteMovies()
      
    }, [user])

    // Lisää elokuva suosikkeihin
    const addToFavorite =async (movie) => { 
      if (!user || !user.username) {
        console.log('Käyttäjää ei ole kirjautunut sisään')
        return
      }
      try {
        const response = await axios.post('http://localhost:3001/favorites/add', {
          username:user.username,
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
    const removeFromFavorites = async (movieId,username) => {
      try {
        const response=await axios.delete(`http://localhost:3001/favorites/${movieId}`, {
          data:{username}
        })
        
        setFavoriteMovies((prevFavorites) => 
          prevFavorites.filter((movie) => movie.id !== movieId)
      )
      console.log(response.data.message)
      } catch (error) {
        console.error('Virhe suosikkielokuvan poistamisessa:', error)
      }
    }

    /*useEffect(() => {
      fetchFavoriteMovies()
    },[])*/

        
  return (
    <div>
      <nav className = "navbar">
        <div className="nav-links">
          <Link to="/home" className="nav-link">Etusivu</Link>
          <Link to="/reviews" className="nav-link">Arvostelut</Link>
          <Link to="/groups" className="nav-link">Ryhmät</Link>
          <button onClick={onLogout} className="logout-button">Kirjaudu ulos</button>
        </div>
        <div className="nav-actions">
        <button type="submit" className="delete-button" onClick={handleDelete}>
        Poista tili </button>
        </div>
        
      </nav>
    <div className='profile-container'>
      <h1>Profiilisivu</h1>
      <h2> Tervetuloa {user.username} takaisin!</h2>
      
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