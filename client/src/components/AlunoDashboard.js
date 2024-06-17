import React, { useState } from 'react';

const AlunoDashboard = ({ aluno, onLogout }) => {
  const [diaSelecionado, setDiaSelecionado] = useState('A');
  const [tempoDescanso, setTempoDescanso] = useState(60); // Tempo de descanso em segundos
  const [cronometroAtivo, setCronometroAtivo] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(tempoDescanso);

  // ... (funções para controlar o cronômetro)

  return (
    <div>
      <h1>Bem-vindo, {aluno.nome}!</h1>
      {/* ... (botões para selecionar o dia do treino) ... */}
      <h2>Seu treino para o dia {diaSelecionado}:</h2>

      <table>
        {/* ... (cabeçalho da tabela) ... */}
        <tbody>
          {aluno.treino[diaSelecionado]?.map((movimento, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td> {/* Checkbox para marcar como concluído */}
              <td>{movimento.nome}</td>
              <td>{movimento.repeticoes}</td>
              <td>{movimento.obs}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cronômetro */}
      <div>
        <input type="number" value={tempoDescanso} onChange={(e) => setTempoDescanso(parseInt(e.target.value, 10))} />
        <button onClick={() => setCronometroAtivo(true)}>Iniciar</button>
        <button onClick={() => setCronometroAtivo(false)}>Pausar</button>
        <p>Tempo restante: {tempoRestante} segundos</p>
      </div>

      <button onClick={onLogout}>Sair</button>
    </div>
  );
};
export default AlunoDashboard;