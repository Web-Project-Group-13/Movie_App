import React, { useState } from "react";
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);
    } else {
      alert("Täytä molemmat kentät!");
    }
  };

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
          <button type="submit" className="login-button">
            Kirjaudu sisään
          </button>
        </form>

        {/* Linkit rekisteröitymiseen ja kirjautumiseen ilman tiliä */}
        <div className="login-links">
          <a href="#" className="login-link">Ei tiliä? Rekisteröidy palveluun</a>
          <br />
          <a href="#" className="login-link">Kirjaudu sisään ilman tiliä</a>
        </div>
      </div>
    </div>
  );
};

export default Login;