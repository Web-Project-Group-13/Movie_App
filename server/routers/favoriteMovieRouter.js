import express from 'express';
//import { auth } from '../helpers/auth.js';
import {
  addFavoriteMovie,
  getFavoriteMoviesByUserId,
  deleteFavoriteMovie,
} from '../models/favoriteMovie.js';

const router = express.Router();

// Lisää suosikkielokuva
router.post('/add', async (req, res) => {
  const { tmdbId, title, posterPath } = req.body;
  const userId = 6

  try {
    const favorite = await addFavoriteMovie(userId, tmdbId, title, posterPath);
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hae käyttäjän suosikkielokuvat
router.get('/', async (req, res) => {
  const userId = 6;

  try {
    const favorites = await getFavoriteMoviesByUserId(userId);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Poista suosikkielokuva
router.delete('/:id', async (req, res) => {
  const userId = 6;
  const movieId = req.params.id;

  try {
    const deletedMovie = await deleteFavoriteMovie(userId, movieId);
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
