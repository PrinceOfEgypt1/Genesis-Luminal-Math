import React, { useState } from 'react';

type OperationType = 'addition' | 'subtraction';

interface ManualExerciseInputProps {
  operation: OperationType;
  onGenerate: (num1: number, num2: number) => void;
  error: string | null;
}

export const ManualExerciseInput: React.FC<ManualExerciseInputProps> = ({ operation, onGenerate, error }) => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n1 = parseInt(num1) || 0;
    const n2 = parseInt(num2) || 0;
    onGenerate(n1, n2);
  };

  return (
    <div className="card">
      <h2 style={{ fontFamily: 'Fredoka One', textAlign: 'center', color: '#673AB7', marginBottom: '20px' }}>
        Criar Exercício Manual
      </h2>

      {error && (
        <div style={{
          background: '#FFEBEE',
          color: '#C62828',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Primeiro número"
            style={{
              fontSize: '18px',
              padding: '10px',
              width: '120px',
              border: '2px solid #673AB7',
              borderRadius: '8px',
              textAlign: 'center'
            }}
            min="0"
            max="100"
          />
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {operation === 'addition' ? '+' : '-'}
          </span>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Segundo número"
            style={{
              fontSize: '18px',
              padding: '10px',
              width: '120px',
              border: '2px solid #673AB7',
              borderRadius: '8px',
              textAlign: 'center'
            }}
            min="0"
            max="100"
          />
        </div>
        <button type="submit" style={{ background: 'linear-gradient(135deg, #673AB7 0%, #5E35B1 100%)', color: 'white' }}>
          Gerar Exercício
        </button>
      </form>
    </div>
  );
};
