import React, { useState } from 'react';
import { HomePage } from './pages/Home';
import { PracticePage } from './pages/PracticePage';
import { TeacherModePage } from './pages/TeacherModePage';

type OperationType = 'addition' | 'subtraction';

const GlobalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Comic+Neue:wght@700&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Comic Neue', cursive;
  background: linear-gradient(135deg, #FFE5EC 0%, #E3F2FD 100%);
  min-height: 100vh;
  color: #333;
  overflow-x: hidden;
}
.app-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
button {
  font-family: 'Fredoka One', cursive;
  font-size: 18px;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
button:hover { transform: scale(1.05); box-shadow: 0 6px 12px rgba(0,0,0,0.15); }
button:disabled { opacity: 0.6; cursor: not-allowed; }
.card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin: 15px 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}
.strategy-card {
  background: linear-gradient(135deg, #FFD54F 0%, #FF9800 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.strategy-card:hover { transform: translateY(-5px); }
.animation-container {
  background: #F8F9FA;
  border-radius: 12px;
  padding: 30px;
  margin: 20px 0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.feedback { font-size: 24px; margin: 20px 0; min-height: 60px; }
.controls { display: flex; gap: 15px; margin: 20px 0; flex-wrap: wrap; justify-content: center; }
.audio-controls { display: flex; align-items: center; gap: 10px; margin: 10px 0; }
`;

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

const validateExercise = (num1: number, num2: number, operation: OperationType): { valid: boolean; message: string } => {
  if (num1 < 0 || num1 > 100 || num2 < 0 || num2 > 100) return { valid: false, message: "Números devem estar entre 0 e 100." };
  if (operation === 'addition' && num1 + num2 > 100) return { valid: false, message: "A soma não pode ultrapassar 100." };
  if (operation === 'subtraction' && num1 < num2) return { valid: false, message: "O resultado não pode ser negativo." };
  return { valid: true, message: "" };
};

const generateExercise = (operation: OperationType, difficulty: number, strategy?: string) => {
  const maxNum = difficulty === 1 ? 10 : difficulty === 2 ? 20 : difficulty === 3 ? 50 : 100;
  let num1, num2, result: number;
  do {
    num1 = Math.floor(Math.random() * (maxNum + 1));
    num2 = Math.floor(Math.random() * (maxNum + 1));
    if (operation === 'addition') { result = num1 + num2; if (result > 100) continue; }
    else { if (num1 < num2) continue; result = num1 - num2; }
    break;
  } while (true);

  const additionStrategies = ['drawPicture', 'tallyMarks', 'countingOn', 'doubles', 'commutative', 'numberLine', 'tensFrames', 'partPartWhole', 'associative'];
  const subtractionStrategies = ['drawPicture', 'countingUp', 'countingBack', 'doubles', 'relatedFacts', 'numberLine', 'tensFrames', 'partPartWhole', 'useCounters'];
  const strategies = operation === 'addition' ? additionStrategies : subtractionStrategies;
  return { num1, num2, result, strategy: strategy || strategies[Math.floor(Math.random() * strategies.length)] };
};

const additionStrategies = [
  { id: 'drawPicture', name: 'Desenhar Figuras', description: 'Use figuras para somar' },
  { id: 'tallyMarks', name: 'Marcas de Contagem', description: 'Contar com risquinhos' },
  { id: 'countingOn', name: 'Contar para Frente', description: 'Comece pelo maior número' },
  { id: 'doubles', name: 'Dobros', description: 'Números iguais' },
  { id: 'commutative', name: 'Propriedade Comutativa', description: 'A ordem não importa' },
  { id: 'numberLine', name: 'Linha Numérica', description: 'Pular na linha' },
  { id: 'tensFrames', name: 'Quadros de Dezena', description: 'Completar dezenas' },
  { id: 'partPartWhole', name: 'Parte-Parte-Todo', description: 'Juntar partes' },
  { id: 'associative', name: 'Fazer 10', description: 'Combinar números' },
];

const subtractionStrategies = [
  { id: 'drawPicture', name: 'Desenhar Figuras', description: 'Tirar figuras' },
  { id: 'countingUp', name: 'Contar para Chegar', description: 'Quantos faltam?' },
  { id: 'countingBack', name: 'Contar para Trás', description: 'Voltar na contagem' },
  { id: 'doubles', name: 'Metade/Dobros', description: 'Relacionar com adição' },
  { id: 'relatedFacts', name: 'Fatos Relacionados', description: 'Família de fatos' },
  { id: 'numberLine', name: 'Linha Numérica', description: 'Voltar na linha' },
  { id: 'tensFrames', name: 'Quadros de Dezena', description: 'Tirar do quadro' },
  { id: 'partPartWhole', name: 'Parte-Parte-Todo', description: 'Descobrir a parte' },
  { id: 'useCounters', name: 'Usar Contadores', description: 'Contar o que sobrou' },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'practice' | 'teacher'>('home');
  const [operation, setOperation] = useState<OperationType>('addition');
  const handleSelectOperation = (op: OperationType) => { setOperation(op); setCurrentPage('practice'); };
  const handleTeacherMode = () => setCurrentPage('teacher');

  return (
    <div className="app-container">
      <style>{GlobalStyles}</style>
      {currentPage === 'home' ? (
        <HomePage onSelect={handleSelectOperation} onTeacherMode={handleTeacherMode} />
      ) : currentPage === 'practice' ? (
        <PracticePage operation={operation} onBack={() => setCurrentPage('home')} />
      ) : (
        <TeacherModePage onBack={() => setCurrentPage('home')} />
      )}
    </div>
  );
};

export default App;
export { additionStrategies, subtractionStrategies, validateExercise, generateExercise, narrate };
