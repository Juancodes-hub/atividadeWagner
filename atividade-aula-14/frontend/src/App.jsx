import { useState } from 'react';
import api from './services/api';

function App() {
  const [email, setEmail] = useState('aluno@unicatolica.edu.br');
  const [password, setPassword] = useState('senha123');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [dashboardData, setDashboardData] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);

      // 6. Token salvo no localStorage
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      alert('Login com sucesso!');
    } catch (err) {
      alert('Falha no login');
    }
  };

  const handleFetchDashboard = async () => {
    try {
      const res = await api.get('/dashboard');
      setDashboardData(res.data.message);
    } catch (err) {
      setDashboardData('Acesso Negado ou Token Expirado');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
      setToken(null);
    setDashboardData('');
      };
  if (token) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Painel Protegido</h2>
        <button onClick={handleFetchDashboard}>Buscar Dados Sigilosos</button>
        <p>{dashboardData}</p>
        <hr />
        <button onClick={handleLogout}>Sair</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login MERN</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default App;
