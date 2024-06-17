import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import AlunoDashboard from './components/AlunoDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';
import './App.css';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const professor = { nome: 'professor', senha: '123' }; 
  const navigate = useNavigate();

  const handleLogin = (login, senha) => {
    if (login === professor.nome && senha === professor.senha) {
      setUsuarioLogado(professor);
      navigate('/professor-dashboard');
    } else {
      const usuario = alunos.find(aluno => aluno.nome === login && aluno.senha === senha);
      if (usuario) {
        setUsuarioLogado(usuario);
        navigate('/aluno-dashboard');
      } else {
        alert('Usuário ou senha incorretos');
      }
    }
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    navigate('/'); 
  };

  return ( 
    <div className="app-container">
      {!usuarioLogado ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <Routes>
            {usuarioLogado.nome === 'professor' ? (
              <Route
                path="/professor-dashboard"
                element={<ProfessorDashboard alunos={alunos} setAlunos={setAlunos} onLogout={handleLogout} />}
              />
            ) : (
              <Route
                path="/aluno-dashboard"
                element={<AlunoDashboard aluno={usuarioLogado} onLogout={handleLogout} />}
              />
            )}
          </Routes>
          
        </div>
      )}
    </div>
  ); 
}

export default App;
