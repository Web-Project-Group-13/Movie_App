import { pool } from '../helpers/db.js';

const addFavoriteMovie = async (username, tmdbId, title, posterPath) => {
    try {
      const result = await pool.query(
        `INSERT INTO public.favorite_movies (user_id, tmdb_id, title, poster_path)
             SELECT id, $2, $3, $4
             FROM public."User"
             WHERE username = $1 RETURNING *`,
        [username, tmdbId, title, posterPath]
      );
      return result.rows[0]; // Palautetaan lisätty suosikkielokuva
    } catch (error) {
      throw new Error('Virhe lisättäessä suosikkielokuvaa: ' + error.message);
    }
  };
  
  const getFavoriteMoviesByUsername = async (username) => {
    try {
      const result = await pool.query(
        `SELECT f.*
             FROM public.favorite_movies f
             JOIN public."User" u ON f.user_id = u.id
             WHERE u.username = $1
             ORDER BY f.created_at DESC`,
        [username]
      );
      return result.rows; // Palautetaan käyttäjän suosikkielokuvat
    } catch (error) {
      throw new Error('Virhe suosikkielokuvien hakemisessa: ' + error.message);
    }
  };
  
  const deleteFavoriteMovie = async (username, movieId) => {
    try {
      const result = await pool.query(
        `DELETE FROM public.favorite_movies
             WHERE user_id = (SELECT id FROM public."User" WHERE username = $1) AND tmdb_id = $2
             RETURNING *`,
        [username, movieId]
      );
      return result.rows[0]; // Palautetaan poistettu elokuva
    } catch (error) {
      throw new Error('Virhe suosikkielokuvan poistamisessa: ' + error.message);
    }
  };
  
  export { addFavoriteMovie, getFavoriteMoviesByUsername, deleteFavoriteMovie };