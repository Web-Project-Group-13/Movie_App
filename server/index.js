import express from 'express';
import cors from 'cors';
import UserRouter from './routers/UserRouter.js';
import reviewRouter from './routers/reviewRouter.js';
import favoriteMovieRouter from './routers/favoriteMovieRouter.js';

const port = 3001;

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', UserRouter);
app.use('/user', UserRouter);
app.use('/reviews', reviewRouter);
app.use('/favorites', favoriteMovieRouter);

app.use((err,req, res,next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ error: err.message });
});

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Serveri toimii!' });
});


app.post('/login', (req, res) => {
    const {username,password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Täytä molemmat kentät!' });
    }

    if (username === 'username' && password === 'password') {
        return res.status(200).json({ token: 'mockToken123' });  // Palautetaan token
    } else {
        return res.status(400).json({ message: 'Virheellinen käyttäjätunnus tai salasana' });
    }

})

app.listen (port, () => {
    console.log(`Server running on port ${port}`);
});