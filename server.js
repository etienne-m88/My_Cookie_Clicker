import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
