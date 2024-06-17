import React, { useState } from 'react';
import './ProfessorDashboard.css';

const ProfessorDashboard = ({ alunos, setAlunos, onLogout }) => {
  const [mostrarFormularioAluno, setMostrarFormularioAluno] = useState(false);
  const [mostrarFormularioTreino, setMostrarFormularioTreino] = useState(false);
  const [novoAluno, setNovoAluno] = useState({ nome: '', senha: '', treino: '' });
  const [novoTreino, setNovoTreino] = useState({ aluno: '', descricao: '' });
  const [mostrarListaAlunos, setMostrarListaAlunos] = useState(false);
  const [busca, setBusca] = useState('');

  const handleAdicionarAluno = (event) => {
    event.preventDefault();
    setAlunos([...alunos, novoAluno]);
    setNovoAluno({ nome: '', senha: '', treino: '' });
    setMostrarFormularioAluno(false);
  };

  const handleAdicionarTreino = (event) => {
    event.preventDefault();

    const alunoIndex = alunos.findIndex(aluno => aluno.nome === novoTreino.aluno);

    if (alunoIndex !== -1) {
      const novosAlunos = [...alunos];
      novosAlunos[alunoIndex].treino = novoTreino.descricao;
      setAlunos(novosAlunos);
    } else {
      alert('Por favor, selecione um aluno.');
    }

    setNovoTreino({ aluno: '', descricao: '' });
    setMostrarFormularioTreino(false);
  };

  const handleExcluirAluno = (alunoNome) => {
    if (window.confirm(`Deseja mesmo excluir o aluno ${alunoNome}?`)) {
      setAlunos(alunos.filter(aluno => aluno.nome !== alunoNome));
    }
  };

  const alunosFiltrados = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="professor-dashboard">
      {/* Container para os botões */}
      {!mostrarFormularioAluno && !mostrarFormularioTreino && !mostrarListaAlunos && (
        <div className="button-container">
          <button onClick={() => setMostrarFormularioAluno(true)}>Adicionar Aluno +</button>
          <button onClick={() => setMostrarFormularioTreino(true)}>Adicionar Treino</button>
          <button onClick={() => setMostrarListaAlunos(true)}>Ver Alunos</button>
          <button onClick={onLogout}>Sair</button>
        </div>
      )}

      {/* Lista de alunos (apenas quando o botão "Ver Alunos" for clicado) */}
      {mostrarListaAlunos && (
        <div>
          <h2>Lista de Alunos</h2>
          <input
            type="text"
            placeholder="Buscar aluno..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <ul>
            {alunosFiltrados.map((aluno, index) => (
              <li key={index}>
                {aluno.nome}
                <button onClick={() => handleExcluirAluno(aluno.nome)}>Excluir</button>
              </li>
            ))}
          </ul>
          <button onClick={() => {
            setMostrarFormularioAluno(true);
            setMostrarListaAlunos(false); 
          }}>Adicionar Aluno +</button>

          <button type="button" onClick={() => setMostrarListaAlunos(false)}>Voltar</button> 
        </div>
      )}

      {/* Formulário de adicionar aluno */}
      {mostrarFormularioAluno && (
        <form onSubmit={handleAdicionarAluno}>
          <h2>Adicionar Novo Aluno</h2>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" value={novoAluno.nome} onChange={(e) => setNovoAluno({ ...novoAluno, nome: e.target.value })}/>

          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha"  value={novoAluno.senha} onChange={(e) => setNovoAluno({ ...novoAluno, senha: e.target.value })} />

          <div className="form-buttons">
            <button type="submit">Adicionar Aluno</button>
            <button type="button" onClick={() => setMostrarFormularioAluno(false)}>Voltar</button> 
          </div>
        </form>
      )}

      {/* Formulário de adicionar treino */}
      {mostrarFormularioTreino && (
        <form onSubmit={handleAdicionarTreino}>
          <h2>Adicionar Treino</h2>
          <label htmlFor="aluno">Aluno:</label>
          <select id="aluno" value={novoTreino.aluno} onChange={(e) => setNovoTreino({ ...novoTreino, aluno: e.target.value })}>
            <option value="">Selecione um aluno</option>
            {alunos.map((aluno, index) => (
              <option key={index} value={aluno.nome}>{aluno.nome}</option>
            ))}
          </select>

          <label htmlFor="descricao">Descrição do Treino:</label>
          <textarea id="descricao" value={novoTreino.descricao} onChange={(e) => setNovoTreino({ ...novoTreino, descricao: e.target.value })} />

          <div className="form-buttons">
            <button type="submit">Adicionar Treino</button>
            <button type="button" onClick={() => setMostrarFormularioTreino(false)}>Voltar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfessorDashboard;
