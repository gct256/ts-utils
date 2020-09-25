import { numbers } from '../src/numbers';

// value based on python 3.6.4.

describe('numbers', () => {
  describe('modulo', () => {
    test('NaN', () => {
      expect(numbers.modulo(NaN, 3)).toBe(NaN);
      expect(numbers.modulo(3, NaN)).toBe(NaN);
      expect(numbers.modulo(NaN, NaN)).toBe(NaN);
    });

    test('Infinity', () => {
      expect(numbers.modulo(Infinity, 3)).toBeNaN();
      expect(numbers.modulo(3, Infinity)).toBeNaN();
      expect(numbers.modulo(Infinity, Infinity)).toBeNaN();
    });

    test('-Infinity', () => {
      expect(numbers.modulo(-Infinity, 3)).toBeNaN();
      expect(numbers.modulo(3, -Infinity)).toBeNaN();
      expect(numbers.modulo(-Infinity, -Infinity)).toBeNaN();
    });

    test('integer', () => {
      expect(numbers.modulo(0, 0)).toBe(NaN);
      expect(numbers.modulo(-1, 0)).toBe(NaN);
      expect(numbers.modulo(1, 0)).toBe(NaN);

      expect(numbers.modulo(0, 3)).toBe(0);
      expect(numbers.modulo(1, 3)).toBe(1);
      expect(numbers.modulo(2, 3)).toBe(2);
      expect(numbers.modulo(3, 3)).toBe(0);
      expect(numbers.modulo(4, 3)).toBe(1);

      expect(numbers.modulo(-0, 3)).toBe(0);
      expect(numbers.modulo(-1, 3)).toBe(2);
      expect(numbers.modulo(-2, 3)).toBe(1);
      expect(numbers.modulo(-3, 3)).toBe(0);
      expect(numbers.modulo(-4, 3)).toBe(2);

      expect(numbers.modulo(0, -3)).toBe(0);
      expect(numbers.modulo(1, -3)).toBe(-2);
      expect(numbers.modulo(2, -3)).toBe(-1);
      expect(numbers.modulo(3, -3)).toBe(0);
      expect(numbers.modulo(4, -3)).toBe(-2);

      expect(numbers.modulo(-0, -3)).toBe(0);
      expect(numbers.modulo(-1, -3)).toBe(-1);
      expect(numbers.modulo(-2, -3)).toBe(-2);
      expect(numbers.modulo(-3, -3)).toBe(0);
      expect(numbers.modulo(-4, -3)).toBe(-1);
    });

    test('float', () => {
      expect(numbers.modulo(-1.1, 0)).toBe(NaN);
      expect(numbers.modulo(1.1, 0)).toBe(NaN);

      expect(numbers.modulo(0, 3.21)).toBe(0);
      expect(numbers.modulo(0.01, 3.21)).toBe(0.01 % 3.21);
      expect(numbers.modulo(3.2, 3.21)).toBe(3.2 % 3.21);
      expect(numbers.modulo(3.21, 3.21)).toBe(0);
      expect(numbers.modulo(3.22, 3.21)).toBe(3.22 % 3.21);

      expect(numbers.modulo(-0, 3.21)).toBe(0);
      expect(numbers.modulo(-0.01, 3.21)).toBe((-0.01 % 3.21) + 3.21);
      expect(numbers.modulo(-3.2, 3.21)).toBe((-3.2 % 3.21) + 3.21);
      expect(numbers.modulo(-3.21, 3.21)).toBe(0);
      expect(numbers.modulo(-3.22, 3.21)).toBe((-3.22 % 3.21) + 3.21);

      expect(numbers.modulo(0, -3.21)).toBe(0);
      expect(numbers.modulo(0.01, -3.21)).toBe((0.01 % -3.21) - 3.21);
      expect(numbers.modulo(3.2, -3.21)).toBe((3.2 % -3.21) - 3.21);
      expect(numbers.modulo(3.21, -3.21)).toBe(0);
      expect(numbers.modulo(3.22, -3.21)).toBe((3.22 % -3.21) - 3.21);

      expect(numbers.modulo(-0, -3.21)).toBe(0);
      expect(numbers.modulo(-0.01, -3.21)).toBe(-0.01 % -3.21);
      expect(numbers.modulo(-3.2, -3.21)).toBe(-3.2 % -3.21);
      expect(numbers.modulo(-3.21, -3.21)).toBe(0);
      expect(numbers.modulo(-3.22, -3.21)).toBe(-3.22 % -3.21);
    });
  });

  test('clamp', () => {
    expect(numbers.clamp(-9.9, -4.2, 4.2)).toBe(-4.2);
    expect(numbers.clamp(0, -4.2, 4.2)).toBe(0);
    expect(numbers.clamp(9.9, -4.2, 4.2)).toBe(4.2);

    expect(numbers.clamp(-9.9, 4.2, -4.2)).toBe(4.2);
    expect(numbers.clamp(0, 4.2, -4.2)).toBe(4.2);
    expect(numbers.clamp(9.9, 4.2, -4.2)).toBe(-4.2);

    expect(numbers.clamp(NaN, -4.2, 4.2)).toBe(NaN);
    expect(numbers.clamp(0, NaN, 4.2)).toBe(NaN);
    expect(numbers.clamp(0, -4.2, NaN)).toBe(NaN);

    expect(numbers.clamp(Infinity, -4.2, 4.2)).toBe(4.2);
    expect(numbers.clamp(-Infinity, -4.2, 4.2)).toBe(-4.2);

    expect(numbers.clamp(9.9, -Infinity, 4.2)).toBe(4.2);
    expect(numbers.clamp(-9.9, -Infinity, 4.2)).toBe(-9.9);

    expect(numbers.clamp(9.9, -4.2, Infinity)).toBe(9.9);
    expect(numbers.clamp(-9.9, -4.2, Infinity)).toBe(-4.2);
  });

  test('floor', () => {
    expect(numbers.floor(4.1)).toBe(Math.floor(4.1));
    expect(numbers.floor(4.9)).toBe(Math.floor(4.9));
    expect(numbers.floor(-4.1)).toBe(Math.floor(-4.1));
    expect(numbers.floor(-4.9)).toBe(Math.floor(-4.9));

    expect(numbers.floor(NaN)).toBe(0);
    expect(numbers.floor(NaN, -4.2)).toBe(-4.2);

    expect(numbers.floor(Infinity)).toBe(0);
    expect(numbers.floor(Infinity, -4.2)).toBe(-4.2);

    expect(numbers.floor(-Infinity)).toBe(0);
    expect(numbers.floor(-Infinity, -4.2)).toBe(-4.2);
  });

  test('round', () => {
    expect(numbers.round(4.1)).toBe(Math.round(4.1));
    expect(numbers.round(4.9)).toBe(Math.round(4.9));
    expect(numbers.round(-4.1)).toBe(Math.round(-4.1));
    expect(numbers.round(-4.9)).toBe(Math.round(-4.9));

    expect(numbers.round(NaN)).toBe(0);
    expect(numbers.round(NaN, -4.2)).toBe(-4.2);

    expect(numbers.round(Infinity)).toBe(0);
    expect(numbers.round(Infinity, -4.2)).toBe(-4.2);

    expect(numbers.round(-Infinity)).toBe(0);
    expect(numbers.round(-Infinity, -4.2)).toBe(-4.2);
  });

  test('ceil', () => {
    expect(numbers.ceil(4.1)).toBe(Math.ceil(4.1));
    expect(numbers.ceil(4.9)).toBe(Math.ceil(4.9));
    expect(numbers.ceil(-4.1)).toBe(Math.ceil(-4.1));
    expect(numbers.ceil(-4.9)).toBe(Math.ceil(-4.9));

    expect(numbers.ceil(NaN)).toBe(0);
    expect(numbers.ceil(NaN, -4.2)).toBe(-4.2);

    expect(numbers.ceil(Infinity)).toBe(0);
    expect(numbers.ceil(Infinity, -4.2)).toBe(-4.2);

    expect(numbers.ceil(-Infinity)).toBe(0);
    expect(numbers.ceil(-Infinity, -4.2)).toBe(-4.2);
  });
});
