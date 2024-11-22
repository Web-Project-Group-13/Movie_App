import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
    const [username, setUsername] = useState('username');
    const [password, setPassword] = useState('password');
    const navigate = useNavigate();

    const register = (e) =>{
        e.preventDefault();
        
        // Ei toimi vielä kun ei ole backendiä
        /*axios.post('http://localhost:3001/register', {
            username:username,
            password:password
        }).then (response => {
            console.log(response);
            navigate('/login');
        }).catch(error => {
            console.error(error);
        })

    }*/

    //Käytetään vain testaamiseen
    console.log('register:',{username,password});
    navigate('/login');
}

  return (
    <div className='register-container'>
        <div className='register-form'>
            <h2>Rekisteröityminen</h2>
            <form onSubmit={register}>
                
                <div className='username'>
                    <input 
                        type="text" 
                        placeholder='käyttäjätunnus'
                        value={username} 
                        onChange={e =>setUsername(e.target.value)}
                        className="register-input" />
                
                </div>
                 <div className='password'>   
                    <input 
                        type="password" 
                        placeholder='salasana'
                        value={password} 
                        onChange={e =>setPassword(e.target.value)}
                        className="register-input" />
                </div>
                    <button type="submit" className="register-button">
                        Rekisteröidy
                        </button>
                
            </form>
            </div>
    </div>
  )
}
