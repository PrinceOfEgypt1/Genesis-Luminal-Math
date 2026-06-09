import { validateExercise } from '../math/validateExercise';

describe('validateExercise', () => {
  test('Deve validar adição com números dentro do intervalo 0-100', () => {
    const result = validateExercise(50, 50, 'addition');
    expect(result.valid).toBe(true);
    expect(result.message).toBe('');
  });

  test('Deve invalidar adição com resultado > 100', () => {
    const result = validateExercise(60, 50, 'addition');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('A soma não pode ultrapassar 100.');
  });

  test('Deve validar subtração com resultado não negativo', () => {
    const result = validateExercise(50, 30, 'subtraction');
    expect(result.valid).toBe(true);
    expect(result.message).toBe('');
  });

  test('Deve invalidar subtração com resultado negativo', () => {
    const result = validateExercise(30, 50, 'subtraction');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('O resultado não pode ser negativo.');
  });

  test('Deve invalidar números fora do intervalo 0-100', () => {
    const result1 = validateExercise(-5, 10, 'addition');
    expect(result1.valid).toBe(false);
    expect(result1.message).toBe('Números devem estar entre 0 e 100.');

    const result2 = validateExercise(50, 150, 'subtraction');
    expect(result2.valid).toBe(false);
    expect(result2.message).toBe('Números devem estar entre 0 e 100.');
  });
});
