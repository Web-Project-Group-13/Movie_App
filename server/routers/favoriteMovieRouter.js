import express from 'express';
//import { auth } from '../helpers/auth.js';
import {
  addFavoriteMovie,
  getFavoriteMoviesByUsername,
  deleteFavoriteMovie,
} from '../models/favoriteMovie.js';

const router = express.Router();

// Lisää suosikkielokuva
router.post('/add', async (req, res) => {
  const { username,tmdbId, title, posterPath } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Käyttäjä ei ole kirjautunut' });
  }
 //const userId = 5

  try {
    const favorite = await addFavoriteMovie(username, tmdbId, title, posterPath);
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hae käyttäjän suosikkielokuvat
router.get('/:username', async (req, res) => {
  const {username} = req.params

  console.log(`${username}`)

  try {
    const favorites = await getFavoriteMoviesByUsername(username);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Poista suosikkielokuva
router.delete('/:id', async (req, res) => {
  const {username} = req.body
  const movieId = req.params.id;

  console.log('Käyttäjänimi:', username)

  if (!username) {
    return res.status(400).json({ message: 'Käyttäjänimi puuttuu' });
  }
    
  try {
    const deletedMovie = await deleteFavoriteMovie(username, movieId);
    if (deletedMovie) {
      res.status(200).json({ message: 'Suosikkielokuva poistettu onnistuneesti', movie: deletedMovie });
    } else {
      res.status(404).json({ message: 'Elokuvaa ei löytynyt' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
