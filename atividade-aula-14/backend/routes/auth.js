import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Mock user para a atividade
const mockUser = {
  id: 1,
  email: 'aluno@unicatolica.edu.br',
  passwordHash: bcrypt.hashSync('senha123', 10)
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (email !== mockUser.email) return res.status(404).send('Usuário não encontrado');
  
  // 2. Senha validada com bcrypt
const isValid = await bcrypt.compare(password, mockUser.passwordHash);
if (!isValid) return res.status(401).send('Credenciais inválidas');

const token = jwt.sign(
  { id: mockUser.id },
  process.env.SECRET_JWT,
  { expiresIn: 86400 }
);

res.json({ token });});

export default router;
