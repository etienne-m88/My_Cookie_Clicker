import jwt from 'jsonwebtoken';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../db.js';

const router = Router();
const SECRET_KEY = 'My_Secret_Key';

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ error: "Missing fields" });

  const hashed = await bcrypt.hash(password, 10);
  db.run(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, hashed],
    function (err) {
      if (err) 
        return res.status(500).json({ error: "Error" });

      const token = jwt.sign({ id: this.lastID, username }, SECRET_KEY, { expiresIn: '2h' });

      res.status(201).json({ success: true, userId: this.lastID, username, token });
    }
  );
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) 
    return res.status(400).json({ error: "Missing fields" });

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) 
      return res.status(400).json({ error: "User not found." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) 
      return res.status(401).json({ error: "Incorrect password." });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '2h' });

    res.json({ success: true, userId: user.id, username: user.username, token });
  });
});

export default router;
