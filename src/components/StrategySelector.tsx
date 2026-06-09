import React from 'react';
import { StrategyCard } from './StrategyCard';
import { additionStrategies, subtractionStrategies } from '../App';

type OperationType = 'addition' | 'subtraction';

interface StrategySelectorProps {
  operation: OperationType;
  onSelect: (strategy: string) => void;
  selectedStrategy: string | null;
}

export const StrategySelector: React.FC<StrategySelectorProps> = ({ operation, onSelect, selectedStrategy }) => {
  const strategies = operation === 'addition' ? additionStrategies : subtractionStrategies;

  return (
    <div className="card">
      <h2 style={{ fontFamily: 'Fredoka One', textAlign: 'center', color: '#673AB7', marginBottom: '20px' }}>
        Escolha uma Estratégia
      </h2>
      <div className="strategy-grid">
        {strategies.map((strategy) => (
          <StrategyCard
            key={strategy.id}
            strategy={strategy}
            onSelect={onSelect}
            isSelected={selectedStrategy === strategy.id}
          />
        ))}
      </div>
    </div>
  );
};
