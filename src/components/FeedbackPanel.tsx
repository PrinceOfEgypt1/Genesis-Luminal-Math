import React, { useEffect } from 'react';
import Confetti from 'react-confetti';

interface FeedbackPanelProps {
  message: string;
  type: 'correct' | 'incorrect' | 'neutral';
  showConfetti: boolean;
  onConfettiComplete?: () => void;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  message,
  type,
  showConfetti,
  onConfettiComplete
}) => {
  const getStyle = () => {
    switch (type) {
      case 'correct':
        return {
          background: '#E8F5E9',
          color: '#2E7D32',
          border: '2px solid #4CAF50'
        };
      case 'incorrect':
        return {
          background: '#FFEBEE',
          color: '#C62828',
          border: '2px solid #F44336'
        };
      default:
        return {
          background: '#E8EAF6',
          color: '#673AB7',
          border: '2px solid #673AB7'
        };
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        onConfettiComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti, onConfettiComplete]);

  return (
    <div>
      {showConfetti && type === 'correct' && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <div
        style={{
          ...getStyle(),
          padding: '15px',
          borderRadius: '12px',
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '20px 0'
        }}
      >
        {message}
      </div>
    </div>
  );
};
