import React from 'react';
import { OperationType } from '../App';

interface HomePageProps {
  onSelect: (operation: OperationType) => void;
  onTeacherMode: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelect, onTeacherMode }) => {
  return (
    <div className="card">
      <h1 style={{
        fontFamily: 'Fredoka One',
        textAlign: 'center',
        color: '#673AB7',
        marginBottom: '30px',
        fontSize: '48px'
      }}>
        Matemática Divertida!
      </h1>
      <p style={{
        textAlign: 'center',
        fontSize: '20px',
        marginBottom: '40px',
        color: '#555'
      }}>
        Aprenda a somar e subtrair de forma divertida!
      </p>
      <div className="strategy-grid">
        <button
          onClick={() => onSelect('addition')}
          style={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
            color: 'white',
            fontSize: '24px',
            padding: '30px',
            borderRadius: '16px'
          }}
        >
          🧮 Aprender Adição
        </button>
        <button
          onClick={() => onSelect('subtraction')}
          style={{
            background: 'linear-gradient(135deg, #FF9800 0%, #E65100 100%)',
            color: 'white',
            fontSize: '24px',
            padding: '30px',
            borderRadius: '16px'
          }}
        >
          🧮 Aprender Subtração
        </button>
        <button
          onClick={() => onSelect('addition')}
          style={{
            background: 'linear-gradient(135deg, #2196F3 0%, #0D47A1 100%)',
            color: 'white',
            fontSize: '24px',
            padding: '30px',
            borderRadius: '16px'
          }}
        >
          🎯 Praticar Adição
        </button>
        <button
          onClick={() => onSelect('subtraction')}
          style={{
            background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
            color: 'white',
            fontSize: '24px',
            padding: '30px',
            borderRadius: '16px'
          }}
        >
          🎯 Praticar Subtração
        </button>
        <button
          onClick={onTeacherMode}
          style={{
            background: 'linear-gradient(135deg, #FF5722 0%, #E64A19 100%)',
            color: 'white',
            fontSize: '24px',
            padding: '30px',
            borderRadius: '16px'
          }}
        >
          👩‍🏫 Modo Professor
        </button>
      </div>
    </div>
  );
};
