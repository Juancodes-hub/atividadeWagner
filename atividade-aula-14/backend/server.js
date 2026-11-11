import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config();
const app = express();

// 1. CORS configurado
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rotas públicas
app.use('/api/auth', authRoutes);

// 5. Rota sensível bloqueada
app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo ao dashboard protegido, usuário ${req.userId}!` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
