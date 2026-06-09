import { generateExercise } from '../math/generateExercise';

describe('generateExercise', () => {
  test('Deve gerar exercício de adição válido com números entre 0-10 (Nível 1)', () => {
    const exercise = generateExercise('addition', 1);
    expect(exercise.num1).toBeGreaterThanOrEqual(0);
    expect(exercise.num1).toBeLessThanOrEqual(10);
    expect(exercise.num2).toBeGreaterThanOrEqual(0);
    expect(exercise.num2).toBeLessThanOrEqual(10);
    expect(exercise.num1 + exercise.num2).toBeLessThanOrEqual(100);
    expect(exercise.strategy).toBeDefined();
  });

  test('Deve gerar exercício de subtração válido com números entre 0-10 (Nível 1)', () => {
    const exercise = generateExercise('subtraction', 1);
    expect(exercise.num1).toBeGreaterThanOrEqual(0);
    expect(exercise.num1).toBeLessThanOrEqual(10);
    expect(exercise.num2).toBeGreaterThanOrEqual(0);
    expect(exercise.num2).toBeLessThanOrEqual(10);
    expect(exercise.num1).toBeGreaterThanOrEqual(exercise.num2);
    expect(exercise.result).toBeGreaterThanOrEqual(0);
  });

  test('Deve garantir que o resultado da adição nunca ultrapasse 100', () => {
    for (let i = 0; i < 100; i++) {
      const exercise = generateExercise('addition', 4);
      expect(exercise.num1 + exercise.num2).toBeLessThanOrEqual(100);
    }
  });
});
