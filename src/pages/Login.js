import React, { useState } from "react";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");  // Käyttäjätunnus
  const [password, setPassword] = useState("");  // Salasana
  const [errorMessage, setErrorMessage] = useState("");  // Virheilmoitus
  const [loading, setLoading] = useState(false);  // Lataus-indikaattori
  const navigate = useNavigate();  // Navigointi onnistuneen kirjautumisen jälkeen
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (username && password) {
      setLoading(true);
      try {
        // Lähetetään kirjautumistiedot backendille axiosilla
        const response = await axios.post('http://localhost:3001/user/login', {
          username,
          password
        });

        // Tarkistetaan, että palvelin vastasi oikein
        if (response.data.token) {
          // Tallenna token localStorageen tai sessionStorageen
          sessionStorage.setItem('authToken', response.data.token);

          // Jos kirjautuminen onnistui, kutsutaan onLogin-funktiota
          onLogin(username);
          setUsername('');
          setPassword('');
          navigate('/home');  // Siirrytään etusivulle
        } else {
          setErrorMessage("Virheellinen käyttäjätunnus tai salasana");
        }
      } catch (error) {
        // Tarkistetaan, onko virheessä vastaus palvelimelta
        if (error.response) {
          setErrorMessage(error.response.data.message || "Palvelinvirhe, yritä myöhemmin uudelleen");
        } else {
          setErrorMessage("Yhteysvirhe, tarkista verkkoyhteytesi");
        }
      } finally {
        setLoading(false);
      }
    } else {
      alert("Täytä molemmat kentät!");
    }

    try {
      const response = await axios.post('http://localhost:3001/login', {username,password,})

      sessionStorage.setItem('token', response.data.token)
      onLogin(username)

      setUsername('')
      setPassword('')
      setError(null)
  }catch (error) {
      console.error('Virhe kirjautumisessa:', error.message)
      setError('Kirjautuminen epäonnistui. Tarkista käyttäjätunnus ja salasana')
      }
    }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Kirjaudu sisään</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Sähköposti"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Salasana"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Ladataan...' : 'Kirjaudu sisään'}
          </button>
        </form>

        {/* Virheilmoituksen näyttäminen */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Linkit rekisteröitymiseen ja kirjautumiseen ilman tiliä */}
        <div className="login-links">
          <Link to="/register" className="login-link">Ei tiliä? Rekisteröidy palveluun</Link>
          <br />
          <Link to="/home" className="login-link">Kirjaudu sisään ilman tiliä</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;