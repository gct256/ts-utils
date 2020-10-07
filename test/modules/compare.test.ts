import { compare, Validatable } from '../../src/modules/compare';

describe('number', () => {
  test('normal', () => {
    expect(compare.number(42, 42)).toBe(0);
    expect(compare.number(-42, 42)).toBe(-1);
    expect(compare.number(42, -42)).toBe(1);
  });

  test('NaN', () => {
    expect(compare.number(NaN, 42)).toBe(-1);
    expect(compare.number(42, NaN)).toBe(1);
    expect(compare.number(NaN, NaN)).toBe(0);
  });

  test('Infinity', () => {
    expect(compare.number(Infinity, 42)).toBe(1);
    expect(compare.number(42, Infinity)).toBe(-1);
    expect(compare.number(Infinity, Infinity)).toBe(0);
  });

  test('-Infinity', () => {
    expect(compare.number(-Infinity, 42)).toBe(-1);
    expect(compare.number(42, -Infinity)).toBe(1);
    expect(compare.number(-Infinity, -Infinity)).toBe(0);
  });
});

describe('float', () => {
  test('not float', () => {
    expect(compare.float(42, 42)).toBe(0);
    expect(compare.float(-42, 42)).toBe(-1);
    expect(compare.float(42, -42)).toBe(1);
    expect(compare.float(NaN, 42)).toBe(-1);
    expect(compare.float(42, NaN)).toBe(1);
    expect(compare.float(NaN, NaN)).toBe(0);
    expect(compare.float(Infinity, 42)).toBe(1);
    expect(compare.float(42, Infinity)).toBe(-1);
    expect(compare.float(Infinity, Infinity)).toBe(0);
    expect(compare.float(-Infinity, 42)).toBe(-1);
    expect(compare.float(42, -Infinity)).toBe(1);
    expect(compare.float(-Infinity, -Infinity)).toBe(0);
  });

  test('default precision (1e-8)', () => {
    expect(compare.float(42, 42 + 1e-9)).toBe(0);
    expect(compare.float(42, 42 - 1e-9)).toBe(0);

    expect(compare.float(42, 42 + 1e-7)).toBe(-1);
    expect(compare.float(42, 42 - 1e-7)).toBe(1);
  });

  test('set precision (1e-8)', () => {
    expect(compare.float(42, 42 + 1e-5, 4)).toBe(0);
    expect(compare.float(42, 42 - 1e-5, 4)).toBe(0);

    expect(compare.float(42, 42 + 1e-3, 4)).toBe(-1);
    expect(compare.float(42, 42 - 1e-3, 4)).toBe(1);
  });
});

class Foo implements Validatable {
  private readonly valid: boolean;

  private constructor(valid: boolean) {
    this.valid = valid;
  }

  isValid(): boolean {
    return this.valid;
  }

  static of(valid: boolean): Foo {
    return new Foo(valid);
  }
}

test('validatable', () => {
  expect(compare.validatable(Foo.of(true), Foo.of(true))).toBe(0);
  expect(compare.validatable(Foo.of(false), Foo.of(true))).toBe(-1);
  expect(compare.validatable(Foo.of(true), Foo.of(false))).toBe(1);
  expect(compare.validatable(Foo.of(false), Foo.of(false))).toBe(NaN);
});

test('groups', () => {
  expect(compare.groups()).toBe(0);
  expect(compare.groups(0)).toBe(0);
  expect(compare.groups(0, 1)).toBe(1);
  expect(compare.groups(0, 1, -1)).toBe(1);

  expect(compare.groups(NaN, Infinity, -Infinity, 1)).toBe(0);
  expect(compare.groups(Infinity, -Infinity, 1)).toBe(1);
});
