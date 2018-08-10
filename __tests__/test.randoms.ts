import { randoms } from '../src/randoms';

describe('randoms', () => {
  function min(): number {
    return 0;
  }

  function mid(): number {
    return 0x80000000;
  }

  function max(): number {
    return 0xffffffff;
  }

  test('random', () => {
    expect(randoms.random(min)).toBe(0);
    expect(randoms.random(mid)).toBe(0.5);
    expect(randoms.random(max)).toBe(0xffffffff / 0x100000000);
  });

  test('randInt', () => {
    expect(randoms.randInt(4.2, min)).toBe(0);
    expect(randoms.randInt(42, mid)).toBe(21);
    expect(randoms.randInt(42, max)).toBe(42);

    expect(randoms.randInt(-42, min)).toBe(-0);
    expect(randoms.randInt(-42, mid)).toBe(-21);
    expect(randoms.randInt(-42, max)).toBe(-42);
  });

  test('randIntRange', () => {
    expect(randoms.randIntRange(-42, 124, min)).toBe(-42);
    expect(randoms.randIntRange(-42, 124, mid)).toBe(41);
    expect(randoms.randIntRange(-42, 124, max)).toBe(124);

    expect(randoms.randIntRange(124, -42, min)).toBe(-42);
    expect(randoms.randIntRange(124, -42, mid)).toBe(41);
    expect(randoms.randIntRange(124, -42, max)).toBe(124);
  });

  test('randFloat', () => {
    expect(randoms.randFloat(4.2, min)).toBe(0);
    expect(randoms.randFloat(4.2, mid).toFixed(1)).toBe('2.1');
    expect(randoms.randFloat(4.2, max)).toBe(4.2);

    expect(randoms.randFloat(-4.2, min)).toBe(-0);
    expect(randoms.randFloat(-4.2, mid).toFixed(1)).toBe('-2.1');
    expect(randoms.randFloat(-4.2, max)).toBe(-4.2);
  });

  test('randFloatRange', () => {
    expect(randoms.randFloatRange(-4.2, 12.4, min).toFixed(1)).toBe('-4.2');
    expect(randoms.randFloatRange(-4.2, 12.4, mid).toFixed(1)).toBe('4.1');
    expect(randoms.randFloatRange(-4.2, 12.4, max).toFixed(1)).toBe('12.4');

    expect(randoms.randFloatRange(12.4, -4.2, min).toFixed(1)).toBe('-4.2');
    expect(randoms.randFloatRange(12.4, -4.2, mid).toFixed(1)).toBe('4.1');
    expect(randoms.randFloatRange(12.4, -4.2, max).toFixed(1)).toBe('12.4');
  });

  test('shuffle', () => {
    const array: number[] = [5, 1, 3, 2, 0, 4];
    expect(randoms.shuffle(array, min)).not.toEqual(array);
    expect(randoms.shuffle(array, max)).toEqual(array);

    expect(randoms.shuffle([], min)).toEqual([]);
    expect(randoms.shuffle([1], min)).toEqual([1]);
  });
});
