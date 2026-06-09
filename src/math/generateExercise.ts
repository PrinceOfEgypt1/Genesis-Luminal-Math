type OperationType = 'addition' | 'subtraction';

export const generateExercise = (
  operation: OperationType,
  difficulty: number,
  strategy?: string
): { num1: number; num2: number; result: number; strategy: string } => {
  const maxNum = difficulty === 1 ? 10 : difficulty === 2 ? 20 : difficulty === 3 ? 50 : 100;
  let num1, num2, result: number;

  do {
    num1 = Math.floor(Math.random() * (maxNum + 1));
    num2 = Math.floor(Math.random() * (maxNum + 1));

    if (operation === 'addition') {
      result = num1 + num2;
      if (result > 100) continue;
    } else {
      if (num1 < num2) continue;
      result = num1 - num2;
    }
    break;
  } while (true);

  const additionStrategies = [
    'drawPicture', 'tallyMarks', 'countingOn', 'doubles',
    'commutative', 'numberLine', 'tensFrames', 'partPartWhole', 'associative'
  ];
  const subtractionStrategies = [
    'drawPicture', 'countingUp', 'countingBack', 'doubles',
    'relatedFacts', 'numberLine', 'tensFrames', 'partPartWhole', 'useCounters'
  ];
  const strategies = operation === 'addition' ? additionStrategies : subtractionStrategies;
  const selectedStrategy = strategy || strategies[Math.floor(Math.random() * strategies.length)];

  return { num1, num2, result, strategy: selectedStrategy };
};
