import {
  compareAll,
  compareFloat,
  compareNumber,
  compareValidatable,
} from "../../deno/modules/compare.ts";
import { Validatable } from "../../deno/types/Validatable.ts";
import { assertEquals } from "../test-deps.ts";

Deno.test("compareNumber(number, number)", () => {
  assertEquals(compareNumber(42, 42), 0);
  assertEquals(compareNumber(-42, 42), -1);
  assertEquals(compareNumber(42, -42), 1);
});

Deno.test("compareNumber(number, number) - NaN", () => {
  assertEquals(compareNumber(NaN, 42), -1);
  assertEquals(compareNumber(42, NaN), 1);
  assertEquals(compareNumber(NaN, NaN), 0);
});

Deno.test("compareNumber(number, number) - Infinity", () => {
  assertEquals(compareNumber(Infinity, 42), 1);
  assertEquals(compareNumber(42, Infinity), -1);
  assertEquals(compareNumber(Infinity, Infinity), 0);
});

Deno.test("compareNumber(number, number) - -Infinity", () => {
  assertEquals(compareNumber(-Infinity, 42), -1);
  assertEquals(compareNumber(42, -Infinity), 1);
  assertEquals(compareNumber(-Infinity, -Infinity), 0);
});

Deno.test("compareFloat(number, number) - not float", () => {
  assertEquals(compareFloat(42, 42), 0);
  assertEquals(compareFloat(-42, 42), -1);
  assertEquals(compareFloat(42, -42), 1);
  assertEquals(compareFloat(NaN, 42), -1);
  assertEquals(compareFloat(42, NaN), 1);
  assertEquals(compareFloat(NaN, NaN), 0);
  assertEquals(compareFloat(Infinity, 42), 1);
  assertEquals(compareFloat(42, Infinity), -1);
  assertEquals(compareFloat(Infinity, Infinity), 0);
  assertEquals(compareFloat(-Infinity, 42), -1);
  assertEquals(compareFloat(42, -Infinity), 1);
  assertEquals(compareFloat(-Infinity, -Infinity), 0);
});

Deno.test("compareFloat(number, number) - default precision (1e-8)", () => {
  assertEquals(compareFloat(42, 42 + 1e-9), 0);
  assertEquals(compareFloat(42, 42 - 1e-9), 0);
  assertEquals(compareFloat(42, 42 + 1e-7), -1);
  assertEquals(compareFloat(42, 42 - 1e-7), 1);
});

Deno.test("compareFloat(number, number) - set precision (1e-8)", () => {
  assertEquals(compareFloat(42, 42 + 1e-5, 4), 0);
  assertEquals(compareFloat(42, 42 - 1e-5, 4), 0);
  assertEquals(compareFloat(42, 42 + 1e-3, 4), -1);
  assertEquals(compareFloat(42, 42 - 1e-3, 4), 1);
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

Deno.test("compareValidatable(Validatable, Validatable)", () => {
  assertEquals(compareValidatable(Foo.of(true), Foo.of(true)), 0);
  assertEquals(compareValidatable(Foo.of(false), Foo.of(true)), -1);
  assertEquals(compareValidatable(Foo.of(true), Foo.of(false)), 1);
  assertEquals(compareValidatable(Foo.of(false), Foo.of(false)), NaN);
});

Deno.test("compareAll(...number)", () => {
  assertEquals(compareAll(), 0);
  assertEquals(compareAll(0), 0);
  assertEquals(compareAll(0, 1), 1);
  assertEquals(compareAll(0, 1, -1), 1);
  assertEquals(compareAll(NaN, Infinity, -Infinity, 1), 0);
  assertEquals(compareAll(Infinity, -Infinity, 1), 1);
});
