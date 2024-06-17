import React, { useState } from 'react';
import './ProfessorDashboard.css';

const ProfessorDashboard = ({ alunos, setAlunos, onLogout }) => {
  const [mostrarFormularioAluno, setMostrarFormularioAluno] = useState(false);
  const [mostrarFormularioTreino, setMostrarFormularioTreino] = useState(false);
  const [novoAluno, setNovoAluno] = useState({ nome: '', senha: '', treino: { A: [], B: [], C: [], D: [], E: [] } });
  const [novoTreino, setNovoTreino] = useState({
    aluno: '',
    formato: 'AB',
    treinos: { A: [], B: [], C: [], D: [], E: [] }, 
  });
  const [novoMovimento, setNovoMovimento] = useState({ nome: '', repeticoes: '', obs: '' });
  const [mostrarListaAlunos, setMostrarListaAlunos] = useState(false);
  const [busca, setBusca] = useState('');

  // Função para adicionar um novo aluno
  const handleAdicionarAluno = (event) => {
    event.preventDefault();

    // Validação básica dos campos
    if (novoAluno.nome.trim() === '' || novoAluno.senha.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setAlunos([...alunos, novoAluno]);
    setNovoAluno({ nome: '', senha: '', treino: { A: [], B: [], C: [], D: [], E: [] } });
    setMostrarFormularioAluno(false);
  };

  // Função para adicionar um novo treino
  const handleAdicionarTreino = (event) => {
    event.preventDefault();

    const alunoIndex = alunos.findIndex(aluno => aluno.nome === novoTreino.aluno);

    if (alunoIndex !== -1) {
      const novosAlunos = [...alunos];
      novosAlunos[alunoIndex].treino = novoTreino.treinos;
      setAlunos(novosAlunos);
    } else {
      alert('Por favor, selecione um aluno.');
    }

    setNovoTreino({ aluno: '', formato: 'AB', treinos: { A: [], B: [], C: [], D: [], E: [] } });
    setMostrarFormularioTreino(false);
  };

  // Função para adicionar um novo movimento ao treino
  const handleAdicionarMovimento = (dia) => {
    setNovoTreino(prevTreino => ({
      ...prevTreino,
      treinos: {
        ...prevTreino.treinos,
        [dia]: [...prevTreino.treinos[dia], novoMovimento]
      }
    }));
    setNovoMovimento({ nome: '', repeticoes: '', obs: '' });
  };

  // Função para remover um movimento do treino
  const handleRemoverMovimento = (dia, index) => {
    setNovoTreino(prevTreino => ({
      ...prevTreino,
      treinos: {
        ...prevTreino.treinos,
        [dia]: prevTreino.treinos[dia].filter((_, i) => i !== index)
      }
    }));
  };

  // Função para excluir um aluno
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
        <form onSubmit={handleAdicionarTreino}> {/* Início do form */}
          <h2>Adicionar Treino</h2>
          <label htmlFor="aluno">Aluno:</label>
          <select id="aluno" value={novoTreino.aluno} onChange={(e) => setNovoTreino({ ...novoTreino, aluno: e.target.value })}>
            <option value="">Selecione um aluno</option>
            {alunos.map((aluno, index) => (
              <option key={index} value={aluno.nome}>{aluno.nome}</option>
            ))}
          </select>

          {/* Tabela para adicionar movimentos */}
          <table>
            <thead>
              <tr>
                <th>Movimento</th>
                <th>Repetições</th>
                <th>Observações</th>
                <th>Ações</th> 
              </tr>
            </thead>
            <tbody>
              {novoTreino.treinos[novoTreino.formato[0]].map((movimento, index) => (
                <tr key={index}>
                  <td>{movimento.nome}</td>
                  <td>{movimento.repeticoes}</td>
                  <td>{movimento.obs}</td>
                  <td>
                    <button type="button" onClick={() => handleRemoverMovimento(novoTreino.formato[0], index)}>Remover</button>
                  </td>
                </tr>
              ))}
              <tr> {/* Linha para adicionar novo movimento */}
                <td><input type="text" value={novoMovimento.nome} onChange={(e) => setNovoMovimento({ ...novoMovimento, nome: e.target.value })} /></td>
                <td><input type="text" value={novoMovimento.repeticoes} onChange={(e) => setNovoMovimento({ ...novoMovimento, repeticoes: e.target.value })} /></td>
                <td><input type="text" value={novoMovimento.obs} onChange={(e) => setNovoMovimento({ ...novoMovimento, obs: e.target.value })} /></td>
                <td><button type="button" onClick={() => handleAdicionarMovimento(novoTreino.formato[0])}>Adicionar</button></td>
              </tr>
            </tbody>
          </table>

          <div className="form-buttons">
            <button type="submit">Adicionar Treino</button>
            <button type="button" onClick={() => setMostrarFormularioTreino(false)}>Voltar</button>
          </div>
        </form> /* Fechamento da tag form */
      )}
    </div>
  );
};

export default ProfessorDashboard;
