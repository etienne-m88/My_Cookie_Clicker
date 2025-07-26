import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.post('/collect', (req, res) => {
  const { userId, score, autoClickers } = req.body;

  if (!userId || score === undefined || autoClickers === undefined)
    return res.status(400).json({ error: "Missing data" });

  db.run(
    `INSERT OR REPLACE INTO saves (id, user_id, score, auto_clickers, last_update)
     VALUES ((SELECT id FROM saves WHERE user_id = ?), ?, ?, ?, datetime('now'))`,
    [userId, userId, score, autoClickers],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Erreur lors de la sauvegarde." });
      }
      res.json({ success: true });
    }
  );
});

router.get('/load', (req, res) => {
  const userId = req.query.userId;

  db.get(
    `SELECT score, auto_clickers FROM saves WHERE user_id = ?`,
    [userId],
    (err, row) => {
      if (err || !row) 
        return res.json({ score: 0, autoClickers: 0 });
      res.json({ score: row.score, autoClickers: row.auto_clickers });
    }
  );
});

export default router;
