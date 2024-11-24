import express from 'express';
import cors from 'cors';

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Serveri toimii!' });
});

app.post('/login', (req, res) => {
    const {username,password} = req.body;

    if (username ==='username' && password === 'password') {
        return res.status(200).json({ message: 'Kirjautuminen onnistui!' });
    } else {
        return res.status(400).json({ message: 'Täytä molemmat kentät!' });
    }

})
app.listen (port);