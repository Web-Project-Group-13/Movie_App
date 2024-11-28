import { Router } from "express";
import { hash } from "bcrypt";
import { insertUser,deleteUser } from "../models/User.js";

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

// Poista käyttäjä tietokannasta
router.delete('/delete/:username', async (req, res) => {
    try {
      const { username } = req.params;

      // Kutsutaan deleteUser-funktiota, joka poistaa käyttäjän tietokannasta
      const result = await deleteUser(username);
  
       // Jos käyttäjää ei löydy tietokannasta, palautetaan virhe
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Käyttäjää ei löytynyt.' });
      }
  
      res.status(200).json({ message: 'Käyttäjä poistettu onnistuneesti.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Virhe käyttäjän poistamisessa.' });
    }
  });

export default router;
