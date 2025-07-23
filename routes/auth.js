import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../db.js';

const router = Router();

// Route d'inscription
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, hashed],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ success: true, userId: this.lastID });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route de connexion
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: "Server error" });
    if (!user) return res.status(404).json({ error: "User not found." });

    try {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Incorrect password." });

      res.json({ success: true, userId: user.id, username: user.username });
    } catch (e) {
      res.status(500).json({ error: "Password comparison failed" });
    }
  });
});

export default router;
