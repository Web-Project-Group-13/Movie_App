import { pool } from '../helpers/db.js'

// Luo uusi ryhmä
const createGroup = async ({ name, owner, members }) => {
  try {
    const query = `
      INSERT INTO groups (name, owner, members)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, owner, members];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
      console.error("Virhe ryhmän luomisessa:", error.message);
      throw new Error("Virhe ryhmän luomisessa");
  }
};

// Hae kaikki ryhmät
const getAllGroups = async () => {
  const query = 
  `SELECT g.id, g.name, g.members, u.username AS owner
    FROM groups g
    JOIN "User" u ON g.owner = u.username;`;
  const result = await pool.query(query);
  return result.rows;
};

// Hae ryhmä ID:llä
const getGroupById = async (id) => {
  const query = `
      SELECT g.id, g.name, g.members, u.username AS owner
      FROM groups g
      JOIN "User" u ON g.owner = u.username
      WHERE g.id = $1;
    `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Poista ryhmä
const deleteGroup = async (id) => {
  const query = 'DELETE FROM groups WHERE id = $1;';
  await pool.query(query, [id]);
};

// Lisää elokuva ryhmään
const addMovieToGroup = async ({ groupId, movieId, title, posterPath }) => {
  const query = `
    INSERT INTO group_movies (group_id, movie_id, title, poster_path)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [groupId, movieId, title, posterPath];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Hae ryhmän elokuvasuositukset
const getMoviesByGroupId = async (groupId) => {
  const query = 'SELECT * FROM group_movies WHERE group_id = $1;';
  const result = await pool.query(query, [groupId]);
  return result.rows;
};

// Poista elokuva ryhmästä
const deleteMovieFromGroup = async (id) => {
  const query = 'DELETE FROM group_movies WHERE id = $1;';
  await pool.query(query, [id]);
};

export {
  createGroup,
  getAllGroups,
  getGroupById,
  deleteGroup,
  addMovieToGroup,
  getMoviesByGroupId,
  deleteMovieFromGroup
};
