import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(login, senha); 
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="login">Login:</label>
        <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />

        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
