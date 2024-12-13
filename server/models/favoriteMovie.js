import { pool } from '../helpers/db.js';

const addFavoriteMovie = async (userId, tmdbId, title, posterPath) => {
    try {
      const result = await pool.query(
        `INSERT INTO public.favorite_movies (user_id, tmdb_id, title, poster_path) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [userId, tmdbId, title, posterPath]
      );
      return result.rows[0]; // Palautetaan lisätty suosikkielokuva
    } catch (error) {
      throw new Error('Virhe lisättäessä suosikkielokuvaa: ' + error.message);
    }
  };
  
  const getFavoriteMoviesByUserId = async (userId) => {
    try {
      const result = await pool.query(
        `SELECT * FROM public.favorite_movies WHERE user_id = $1 ORDER BY created_at DESC`,
        [userId]
      );
      return result.rows; // Palautetaan käyttäjän suosikkielokuvat
    } catch (error) {
      throw new Error('Virhe suosikkielokuvien hakemisessa: ' + error.message);
    }
  };
  
  const deleteFavoriteMovie = async (userId, movieId) => {
    try {
      const result = await pool.query(
        `DELETE FROM public.favorite_movies WHERE user_id = $1 AND id = $2 RETURNING *`,
        [userId, movieId]
      );
      return result.rows[0]; // Palautetaan poistettu elokuva
    } catch (error) {
      throw new Error('Virhe suosikkielokuvan poistamisessa: ' + error.message);
    }
  };
  
  export { addFavoriteMovie, getFavoriteMoviesByUserId, deleteFavoriteMovie };