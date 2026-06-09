type OperationType = 'addition' | 'subtraction';

export const validateExercise = (
  num1: number,
  num2: number,
  operation: OperationType
): { valid: boolean; message: string } => {
  if (num1 < 0 || num1 > 100 || num2 < 0 || num2 > 100) {
    return { valid: false, message: "Números devem estar entre 0 e 100." };
  }

  if (operation === 'addition' && num1 + num2 > 100) {
    return { valid: false, message: "A soma não pode ultrapassar 100." };
  }

  if (operation === 'subtraction' && num1 < num2) {
    return { valid: false, message: "O resultado não pode ser negativo." };
  }

  return { valid: true, message: "" };
};
