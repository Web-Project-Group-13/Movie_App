import { Router } from "express";
import { hash } from "bcrypt";
import { insertUser } from "../models/User.js";

const router = Router();

router.post('/', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Käyttäjätunnus ja salasana ovat pakollisia.' });
    }

    try {
        // Salasanan hash
        const hashedPassword = await hash(password, 10);

        // Käyttäjän lisääminen tietokantaan
        const result = await insertUser(username, hashedPassword);

        res.status(201).json({
            id: result.rows[0].id,
            username: result.rows[0].username
        });
    } catch (error) {
        console.error('Virhe käyttäjän lisäämisessä:', error);
        next(error); // Lähetetään virhe ylempään virheenkäsittelijään
    }
});

export default router;
