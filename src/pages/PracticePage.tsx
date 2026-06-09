import React, { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import Confetti from 'react-confetti';
import { additionStrategies, subtractionStrategies, validateExercise, generateExercise, narrate } from '../App';
import { StrategySelector } from '../components/StrategyCard';
import { DifficultySelector } from '../components/DifficultySelector';
import { ManualExerciseInput } from '../components/ManualExerciseInput';
import { ExerciseDisplay } from '../components/ExerciseDisplay';
import { StrategySelector } from '../components/StrategySelector';

const correctSound = new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'], volume: 0.5 });
const wrongSound = new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-losing-bleeps-2026.mp3'], volume: 0.5 });

type OperationType = 'addition' | 'subtraction';

interface Exercise {
  num1: number;
  num2: number;
  result: number;
  strategy: string;
}

export const PracticePage: React.FC<{ operation: OperationType; onBack: () => void; }> = ({ operation, onBack }) => {
  const [difficulty, setDifficulty] = useState<number>(1);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: 'correct' | 'incorrect' | 'neutral' }>({ message: '', type: 'neutral' });
  const [manualMode, setManualMode] = useState(false);
  const [manualError, setManualError] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const generateNewExercise = useCallback(() => {
    if (!selectedStrategy) {
      setFeedback({ message: 'Por favor, escolha uma estratégia!', type: 'neutral' });
      return;
    }
    setExercise(generateExercise(operation, difficulty, selectedStrategy));
    setFeedback({ message: '', type: 'neutral' });
  }, [selectedStrategy, operation, difficulty]);

  const handleAnswer = (answer: number) => {
    if (!exercise) return;
    const isCorrect = answer === exercise.result;
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
    setFeedback({
      message: isCorrect ? 'Muito bem! Você acertou!' : `Quase lá! O resultado correto é ${exercise.result}.`,
      type: isCorrect ? 'correct' : 'incorrect'
    });
    if (isCorrect && audioEnabled) {
      setShowConfetti(true);
      correctSound.play();
    } else if (!isCorrect && audioEnabled) {
      wrongSound.play();
    }
    setTimeout(() => {
      setShowConfetti(false);
      generateNewExercise();
    }, 3000);
  };

  const handleManualGenerate = (num1: number, num2: number) => {
    const validation = validateExercise(num1, num2, operation);
    if (!validation.valid) {
      setManualError(validation.message);
      return;
    }
    setManualError(null);
    if (!selectedStrategy) {
      setFeedback({ message: 'Por favor, escolha uma estratégia!', type: 'neutral' });
      return;
    }
    setExercise({
      num1,
      num2,
      result: operation === 'addition' ? num1 + num2 : num1 - num2,
      strategy: selectedStrategy
    });
    setFeedback({ message: '', type: 'neutral' });
  };

  useEffect(() => {
    if (selectedStrategy) {
      generateNewExercise();
    }
  }, [selectedStrategy, difficulty, operation, generateNewExercise]);

  return (
    <div>
      <div className="controls">
        <button onClick={onBack} style={{ background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)', color: 'white' }}>
          Voltar
        </button>
        <button onClick={() => setManualMode(!manualMode)} style={{
          background: manualMode ? 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)' : 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
          color: 'white'
        }}>
          {manualMode ? 'Modo Automático' : 'Modo Manual'}
        </button>
        <div className="audio-controls">
          <span>Áudio:</span>
          <button onClick={() => setAudioEnabled(!audioEnabled)} style={{
            background: audioEnabled ? '#4CAF50' : '#F44336',
            color: 'white',
            padding: '8px 16px',
            fontSize: '14px'
          }}>
            {audioEnabled ? '🔊 Ligado' : '🔇 Desligado'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#673AB7' }}>
          Pontuação: {score.correct}/{score.total}
        </div>
        <button onClick={() => { setScore({ correct: 0, total: 0 }); generateNewExercise(); }} style={{
          background: 'linear-gradient(135deg, #2196F3 0%, #0D47A1 100%)',
          color: 'white',
          padding: '8px 16px',
          fontSize: '14px'
        }}>
          Reiniciar Pontuação
        </button>
      </div>

      <DifficultySelector onSelect={setDifficulty} selectedDifficulty={difficulty} />
      <StrategySelector operation={operation} onSelect={setSelectedStrategy} selectedStrategy={selectedStrategy} />

      {manualMode ? (
        <ManualExerciseInput operation={operation} onGenerate={handleManualGenerate} error={manualError} />
      ) : (
        <button onClick={generateNewExercise} style={{
          background: 'linear-gradient(135deg, #2196F3 0%, #0D47A1 100%)',
          color: 'white',
          display: 'block',
          margin: '20px auto'
        }} disabled={!selectedStrategy}>
          Gerar Novo Exercício
        </button>
      )}

      {exercise && (
        <ExerciseDisplay
          exercise={exercise}
          operation={operation}
          onAnswer={handleAnswer}
          feedback={feedback}
          showConfetti={showConfetti}
          onConfettiComplete={() => setShowConfetti(false)}
          audioEnabled={audioEnabled}
        />
      )}
    </div>
  );
};
