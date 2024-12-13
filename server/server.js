import express from 'express';
import bodyParser from 'body-parser';
import UserRouter from './routers/UserRouter.js';

// Määritellään suoraan koodissa JWT_SECRET ja PORT
const JWT_SECRET = '1234';
const PORT = 3001;

const app = express();
app.use(bodyParser.json());
app.use('/user', UserRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Jotain meni pieleen!',
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});