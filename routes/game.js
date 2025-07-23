import { Router } from 'express';
const router = Router();
import db from './db';

// Enregistrer le score
router.post('/save', (req, res) => {
  const { userId, score } = req.body;

  db.run(
    `INSERT OR REPLACE INTO saves (id, user_id, score, last_update)
     VALUES ((SELECT id FROM saves WHERE user_id = ?), ?, ?, datetime('now'))`,
    [userId, userId, score],
    function (err) {
      if (err) return res.status(500).json({ error: "Erreur lors de la sauvegarde." });
      res.json({ success: true });
    }
  );
});

// Charger le score
router.get('/load', (req, res) => {
  const userId = req.query.userId;

  db.get(
    `SELECT score FROM saves WHERE user_id = ?`,
    [userId],
    (err, row) => {
      if (err || !row) return res.json({ score: 0 });
      res.json({ score: row.score });
    }
  );
});

export default router;
