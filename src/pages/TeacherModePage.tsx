import React, { useState } from 'react';
import { additionStrategies, subtractionStrategies, validateExercise } from '../App';
import { StrategyCard } from '../components/StrategyCard';

type OperationType = 'addition' | 'subtraction';

interface Exercise {
  num1: number;
  num2: number;
  result: number;
  strategy: string;
}

interface ExerciseHistory extends Exercise {
  timestamp: string;
}

export const TeacherModePage: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
  const [operation, setOperation] = useState<OperationType>('addition');
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ExerciseHistory[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const strategies = operation === 'addition' ? additionStrategies : subtractionStrategies;

  const handleGenerate = () => {
    const n1 = parseInt(num1) || 0;
    const n2 = parseInt(num2) || 0;
    const validation = validateExercise(n1, n2, operation);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }
    setError(null);
    if (!selectedStrategy) {
      setError('Por favor, escolha uma estratégia!');
      return;
    }
    const newExercise: Exercise = {
      num1: n1,
      num2: n2,
      result: operation === 'addition' ? n1 + n2 : n1 - n2,
      strategy: selectedStrategy
    };
    setExercise(newExercise);
    setHistory([...history, { ...newExercise, timestamp: new Date().toLocaleString('pt-BR') }]);
  };

  const clearHistory = () => setHistory([]);

  return (
    <div>
      <div className="controls">
        <button onClick={onBack} style={{ background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)', color: 'white' }}>
          Voltar
        </button>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: 'Fredoka One', textAlign: 'center', color: '#673AB7', marginBottom: '20px' }}>
          Modo Professor
        </h2>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
          <button onClick={() => setOperation('addition')} style={{
            background: operation === 'addition' ? '#4CAF50' : '#E0E0E0',
            color: operation === 'addition' ? 'white' : '#333',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px'
          }}>
            Adição
          </button>
          <button onClick={() => setOperation('subtraction')} style={{
            background: operation === 'subtraction' ? '#FF9800' : '#E0E0E0',
            color: operation === 'subtraction' ? 'white' : '#333',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px'
          }}>
            Subtração
          </button>
        </div>

        <div className="card">
          <h3 style={{ textAlign: 'center', color: '#673AB7', marginBottom: '15px' }}>
            Escolha uma Estratégia
          </h3>
          <div className="strategy-grid">
            {strategies.map((strategy) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy}
                onSelect={(id) => setSelectedStrategy(id)}
                isSelected={selectedStrategy === strategy.id}
              />
            ))}
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="Número 1" style={{
              fontSize: '18px',
              padding: '10px',
              width: '120px',
              border: '2px solid #673AB7',
              borderRadius: '8px',
              textAlign: 'center'
            }} min="0" max="100" />
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {operation === 'addition' ? '+' : '-'}
            </span>
            <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="Número 2" style={{
              fontSize: '18px',
              padding: '10px',
              width: '120px',
              border: '2px solid #673AB7',
              borderRadius: '8px',
              textAlign: 'center'
            }} min="0" max="100" />
          </div>
          <button type="submit" style={{ background: 'linear-gradient(135deg, #673AB7 0%, #5E35B1 100%)', color: 'white' }}>
            Gerar Exercício
          </button>
        </form>

        {error && <div style={{ background: '#FFEBEE', color: '#C62828', padding: '10px', borderRadius: '8px', margin: '20px 0', textAlign: 'center' }}>{error}</div>}

        {exercise && (
          <div style={{ background: '#F5F5F5', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
            <h3>Exercício Gerado:</h3>
            <p style={{ fontSize: '24px', textAlign: 'center' }}>
              {exercise.num1} {operation === 'addition' ? '+' : '-'} {exercise.num2} = {exercise.result}
            </p>
            <p style={{ textAlign: 'center', color: '#673AB7' }}>
              Estratégia: {strategies.find(s => s.id === exercise.strategy)?.name}
            </p>
          </div>
        )}

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3>Histórico de Exercícios</h3>
            <button onClick={clearHistory} style={{ background: '#F44336', color: 'white', padding: '8px 16px', fontSize: '14px' }}>
              Limpar Histórico
            </button>
          </div>
          {history.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999' }}>Nenhum exercício gerado ainda.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#673AB7', color: 'white' }}>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Data/Hora</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Operação</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Número 1</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Número 2</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Resultado</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Estratégia</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice().reverse().map((ex, index) => (
                    <tr key={index} style={{ background: index % 2 === 0 ? '#F5F5F5' : 'white' }}>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ex.timestamp}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                        {operation === 'addition' ? '+' : '-'}
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{ex.num1}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{ex.num2}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{ex.result}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                        {strategies.find(s => s.id === ex.strategy)?.name || ex.strategy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
