import React from 'react';

interface DifficultySelectorProps {
  onSelect: (difficulty: number) => void;
  selectedDifficulty: number;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect, selectedDifficulty }) => {
  const difficulties = [
    { level: 1, label: 'Fácil (0-10)', color: '#4CAF50' },
    { level: 2, label: 'Médio (0-20)', color: '#FF9800' },
    { level: 3, label: 'Difícil (0-50)', color: '#FF5722' },
    { level: 4, label: 'Avançado (0-100)', color: '#E91E63' },
  ];

  return (
    <div className="card">
      <h2 style={{ fontFamily: 'Fredoka One', textAlign: 'center', color: '#673AB7', marginBottom: '20px' }}>
        Escolha a Dificuldade
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
        {difficulties.map((diff) => (
          <button
            key={diff.level}
            onClick={() => onSelect(diff.level)}
            style={{
              background: selectedDifficulty === diff.level ? diff.color : 'white',
              color: selectedDifficulty === diff.level ? 'white' : diff.color,
              border: `2px solid ${diff.color}`,
              padding: '12px 24px',
              borderRadius: '12px',
              fontFamily: 'Fredoka One',
              fontSize: '16px'
            }}
          >
            {diff.label}
          </button>
        ))}
      </div>
    </div>
  );
};
