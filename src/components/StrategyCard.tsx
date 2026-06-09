import React from 'react';

interface StrategyCardProps {
  strategy: { id: string; name: string; description: string };
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onSelect, isSelected }) => {
  return (
    <div
      onClick={() => onSelect(strategy.id)}
      style={{
        background: isSelected
          ? 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
          : 'linear-gradient(135deg, #FFD54F 0%, #FF9800 100%)',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        boxShadow: isSelected ? '0 0 15px rgba(76, 175, 80, 0.5)' : 'none'
      }}
    >
      <h3 style={{ fontFamily: 'Fredoka One', fontSize: '20px' }}>{strategy.name}</h3>
      <p style={{ fontSize: '14px', marginTop: '10px' }}>{strategy.description}</p>
    </div>
  );
};
