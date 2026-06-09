import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import Confetti from 'react-confetti';
import { TensFrameGsap } from './TensFrameGsap';
import { NumberLineGsap } from './NumberLineGsap';
import { PictureObjectsGsap } from './PictureObjectsGsap';
import { TallyMarksGsap } from './TallyMarksGsap';
import { PartPartWholeGsap } from './PartPartWholeGsap';

const correctSound = new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'], volume: 0.5 });
const wrongSound = new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-losing-bleeps-2026.mp3'], volume: 0.5 });

type OperationType = 'addition' | 'subtraction';

interface Exercise {
  num1: number;
  num2: number;
  result: number;
  strategy: string;
}

interface FeedbackPanelProps {
  message: string;
  type: 'correct' | 'incorrect' | 'neutral';
  showConfetti: boolean;
  onConfettiComplete?: () => void;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ message, type, showConfetti, onConfettiComplete }) => {
  const getStyle = () => {
    switch (type) {
      case 'correct':
        return { background: '#E8F5E9', color: '#2E7D32', border: '2px solid #4CAF50' };
      case 'incorrect':
        return { background: '#FFEBEE', color: '#C62828', border: '2px solid #F44336' };
      default:
        return { background: '#E8EAF6', color: '#673AB7', border: '2px solid #673AB7' };
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
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />
      )}
      <div style={{ ...getStyle(), padding: '15px', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', margin: '20px 0' }}>
        {message}
      </div>
    </div>
  );
};

interface ExerciseDisplayProps {
  exercise: Exercise;
  operation: OperationType;
  onAnswer: (answer: number) => void;
  feedback: { message: string; type: 'correct' | 'incorrect' | 'neutral' };
  showConfetti: boolean;
  onConfettiComplete: () => void;
  audioEnabled: boolean;
}

export const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({
  exercise,
  operation,
  onAnswer,
  feedback,
  showConfetti,
  onConfettiComplete,
  audioEnabled
}) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = parseInt(userAnswer) || 0;
    onAnswer(answer);
    setUserAnswer('');
  };

  const renderStrategy = () => {
    switch (exercise.strategy) {
      case 'tensFrames':
        return (
          <div>
            <h3>Quadros de Dezena</h3>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', margin: '20px 0' }}>
                {exercise.num1} {operation === 'addition' ? '+' : '-'} {exercise.num2} = ?
              </div>
              <TensFrameGsap
                value={exercise.result}
                operation={operation}
                num1={exercise.num1}
                num2={exercise.num2}
                onAnimationComplete={() => setAnimationComplete(true)}
              />
            </div>
          </div>
        );
      case 'numberLine':
        return (
          <div>
            <h3>Linha Numérica</h3>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', margin: '20px 0' }}>
                {exercise.num1} {operation === 'addition' ? '+' : '-'} {exercise.num2} = ?
              </div>
              <NumberLineGsap
                start={Math.max(0, exercise.num1 - 10)}
                end={Math.min(100, operation === 'addition' ? exercise.num1 + exercise.num2 + 10 : exercise.num1 + 10)}
                current={operation === 'addition' ? exercise.num1 : exercise.num1}
                target={operation === 'addition' ? exercise.num1 + exercise.num2 : exercise.num1 - exercise.num2}
                operation={operation}
                onAnimationComplete={() => setAnimationComplete(true)}
              />
            </div>
          </div>
        );
      case 'drawPicture':
        return (
          <div>
            <h3>Desenhar Figuras</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
              <div>
                <PictureObjectsGsap count={exercise.num1} type="star" operation={operation} onAnimationComplete={() => setAnimationComplete(true)} />
                <div style={{ textAlign: 'center', fontSize: '20px' }}>{exercise.num1}</div>
              </div>
              <div style={{ fontSize: '24px' }}>{operation === 'addition' ? '+' : '-'}</div>
              <div>
                <PictureObjectsGsap count={exercise.num2} type="heart" operation={operation} isSubtracting={operation === 'subtraction'} />
                <div style={{ textAlign: 'center', fontSize: '20px' }}>{exercise.num2}</div>
              </div>
              <div style={{ fontSize: '24px' }}>=</div>
              <div><div style={{ textAlign: 'center', fontSize: '20px' }}>?</div></div>
            </div>
          </div>
        );
      case 'tallyMarks':
        return (
          <div>
            <h3>Marcas de Contagem</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
              <div>
                <TallyMarksGsap count={exercise.num1} operation={operation} />
                <div style={{ textAlign: 'center', fontSize: '20px' }}>{exercise.num1}</div>
              </div>
              <div style={{ fontSize: '24px' }}>{operation === 'addition' ? '+' : '-'}</div>
              <div>
                <TallyMarksGsap count={exercise.num2} operation={operation} />
                <div style={{ textAlign: 'center', fontSize: '20px' }}>{exercise.num2}</div>
              </div>
              <div style={{ fontSize: '24px' }}>=</div>
              <div><div style={{ textAlign: 'center', fontSize: '20px' }}>?</div></div>
            </div>
          </div>
        );
      case 'partPartWhole':
        return (
          <div>
            <h3>Parte-Parte-Todo</h3>
            <PartPartWholeGsap
              part1={exercise.num1}
              part2={exercise.num2}
              whole={exercise.result}
              operation={operation}
              onAnimationComplete={() => setAnimationComplete(true)}
            />
          </div>
        );
      default:
        return (
          <div style={{ textAlign: 'center' }}>
            <h3>Estratégia: {exercise.strategy}</h3>
            <div style={{ fontSize: '36px', margin: '20px 0' }}>
              {exercise.num1} {operation === 'addition' ? '+' : '-'} {exercise.num2} = ?
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    if (audioEnabled) {
      const strategyNarration = {
        addition: {
          drawPicture: ['Vamos contar os primeiros objetos.', 'Agora adicionamos mais objetos.', 'Juntos, temos...'],
          tallyMarks: ['Aqui temos risquinhos.', 'Adicionamos mais risquinhos.', 'Contando todos...'],
          countingOn: ['Começamos no número maior.', 'Contamos para frente...', 'Chegamos ao resultado!'],
          tensFrames: ['Preenchemos os quadros de dezena.', 'Completamos uma dezena!', 'O resultado é...'],
        },
        subtraction: {
          drawPicture: ['Temos estes objetos.', 'Vamos tirar alguns...', 'Sobraram...'],
          tallyMarks: ['Aqui temos risquinhos.', 'Tiramos alguns risquinhos.', 'Contando o que sobrou...'],
          countingBack: ['Começamos aqui.', 'Contamos para trás...', 'Chegamos ao resultado!'],
          tensFrames: ['Temos estes quadros cheios.', 'Tiramos algumas bolinhas...', 'Sobraram...'],
        }
      };

      const narration = operation === 'addition'
        ? strategyNarration.addition[exercise.strategy as keyof typeof strategyNarration.addition]
        : strategyNarration.subtraction[exercise.strategy as keyof typeof strategyNarration.subtraction];

      if (narration) {
        narrate(`Vamos resolver: ${exercise.num1} ${operation === 'addition' ? 'mais' : 'menos'} ${exercise.num2}.`);
        setTimeout(() => narrate(narration[0]), 1500);
      }
    }
  }, [exercise, operation, audioEnabled]);

  return (
    <div className="card">
      <div className="animation-container">
        {renderStrategy()}
      </div>
      <FeedbackPanel {...feedback} showConfetti={showConfetti} onConfettiComplete={onConfettiComplete} />
      {animationComplete && (
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Digite sua resposta"
            style={{
              fontSize: '20px',
              padding: '10px',
              width: '200px',
              border: '2px solid #673AB7',
              borderRadius: '8px',
              textAlign: 'center'
            }}
            min="0"
            max="100"
          />
          <button type="submit" style={{ background: 'linear-gradient(135deg, #673AB7 0%, #5E35B1 100%)', color: 'white', marginLeft: '15px' }}>
            Verificar
          </button>
        </form>
      )}
    </div>
  );
};

const narrate = (text: string, rate: number = 0.9) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.lang = 'pt-BR';
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.lang.includes('pt-BR'));
    if (femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  }
};
