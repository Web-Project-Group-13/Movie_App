import express from 'express';
import { 
    createGroup,
    getAllGroups,
    getGroupById,
    deleteGroup,
    addMovieToGroup,
    getMoviesByGroupId,
    deleteMovieFromGroup } from '../models/groups.js';

const router = express.Router();

// Luo uusi ryhmä
router.post('/add', async (req, res) => {
  try {
    const {name,owner} = req.body;
    const group = await createGroup({
        name,
        owner,
        members: [owner],
    });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hae tietty ryhmä ID:llä
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const group = await getGroupById(id);
      console.log(group);
      if (!group) {
        return res.status(404).json({ error: 'Ryhmä ei löytynyt' });
      }
      res.json(group);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Hae kaikki ryhmät
router.get('/', async (req, res) => {
  try {
    const groups = await getAllGroups();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Poista ryhmä
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteGroup(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lisää elokuva ryhmään
router.post('/:id/movies', async (req, res) => {
  const { id } = req.params;
  const { movieId, title, posterPath } = req.body;
  try {
    const movie = await addMovieToGroup({
      groupId: id,
      movieId,
      title,
      posterPath,
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hae ryhmän elokuvasuositukset
router.get('/:id/movies', async (req, res) => {
  const { id } = req.params;
  try {
    const movies = await getMoviesByGroupId(id);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Poista elokuva ryhmästä
router.delete('/:groupId/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    await deleteMovieFromGroup(movieId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
