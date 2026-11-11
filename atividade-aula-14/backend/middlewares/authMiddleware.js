import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // 4. Extraindo header e validando token
  const authHeader = req.headers.authorization;
  
  if (!authHeader) return res.status(401).send('Token não fornecido');
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).send('Erro no formato do token');
  
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).send('Token mal formatado');
  
  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) return res.status(401).send('Token inválido ou expirado');
    
    req.userId = decoded.id;
    return next();
  });
};
