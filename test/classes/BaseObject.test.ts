import { BaseObject } from '../../src/classes/BaseObject';

class Foo extends BaseObject<Foo> {
  readonly value: number;

  constructor(value: number) {
    super(Number.isFinite(value));

    this.value = value;
  }

  static of(value: number): Foo {
    return new Foo(value);
  }

  clone(): Foo {
    return new Foo(this.value);
  }

  compare(other: Foo): number {
    return this.value === other.value ? 0 : 1;
  }

  valueOf(): Foo {
    return this;
  }
}

test('isEqual', () => {
  expect(Foo.of(42).isEqual(Foo.of(42))).toBe(true);
  expect(Foo.of(42).isEqual(Foo.of(43))).toBe(false);
});
