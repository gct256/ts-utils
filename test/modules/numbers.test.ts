import {
  ceil,
  clamp,
  floor,
  modulo,
  round,
} from "../../deno/modules/numbers.ts";
import { assertEquals } from "../test-deps.ts";

Deno.test("modulo(number, number) - NaN", () => {
  assertEquals(modulo(NaN, 3), NaN);
  assertEquals(modulo(3, NaN), NaN);
  assertEquals(modulo(NaN, NaN), NaN);
});

Deno.test("modulo(number, number) - Infinity", () => {
  assertEquals(modulo(Infinity, 3), NaN);
  assertEquals(modulo(3, Infinity), NaN);
  assertEquals(modulo(Infinity, Infinity), NaN);
});

Deno.test("modulo(number, number) - -Infinity", () => {
  assertEquals(modulo(-Infinity, 3), NaN);
  assertEquals(modulo(3, -Infinity), NaN);
  assertEquals(modulo(-Infinity, -Infinity), NaN);
});

Deno.test("modulo(number, number) - integer", () => {
  assertEquals(modulo(0, 0), NaN);
  assertEquals(modulo(-1, 0), NaN);
  assertEquals(modulo(1, 0), NaN);

  assertEquals(modulo(0, 3), 0);
  assertEquals(modulo(1, 3), 1);
  assertEquals(modulo(2, 3), 2);
  assertEquals(modulo(3, 3), 0);
  assertEquals(modulo(4, 3), 1);
  assertEquals(modulo(5, 3), 2);
  assertEquals(modulo(6, 3), 0);

  assertEquals(modulo(-0, 3), 0);
  assertEquals(modulo(-1, 3), 2);
  assertEquals(modulo(-2, 3), 1);
  assertEquals(modulo(-3, 3), 0);
  assertEquals(modulo(-4, 3), 2);
  assertEquals(modulo(-5, 3), 1);
  assertEquals(modulo(-6, 3), 0);

  assertEquals(modulo(0, -3), 0);
  assertEquals(modulo(1, -3), -2);
  assertEquals(modulo(2, -3), -1);
  assertEquals(modulo(3, -3), 0);
  assertEquals(modulo(4, -3), -2);
  assertEquals(modulo(5, -3), -1);
  assertEquals(modulo(6, -3), 0);

  assertEquals(modulo(-0, -3), 0);
  assertEquals(modulo(-1, -3), -1);
  assertEquals(modulo(-2, -3), -2);
  assertEquals(modulo(-3, -3), 0);
  assertEquals(modulo(-4, -3), -1);
  assertEquals(modulo(-5, -3), -2);
  assertEquals(modulo(-6, -3), 0);
});

Deno.test("modulo(number, number) - float", () => {
  assertEquals(modulo(-1.1, 0), NaN);
  assertEquals(modulo(1.1, 0), NaN);

  assertEquals(modulo(0, 3.21), 0);
  assertEquals(modulo(0.01, 3.21), 0.01 % 3.21);
  assertEquals(modulo(3.2, 3.21), 3.2 % 3.21);
  assertEquals(modulo(3.21, 3.21), 0);
  assertEquals(modulo(3.22, 3.21), 3.22 % 3.21);
  assertEquals(modulo(6.41, 3.21), 6.41 % 3.21);
  assertEquals(modulo(6.42, 3.21), 0);
  assertEquals(modulo(6.43, 3.21), 6.43 % 3.21);

  assertEquals(modulo(-0, 3.21), 0);
  assertEquals(modulo(-0.01, 3.21), (-0.01 % 3.21) + 3.21);
  assertEquals(modulo(-3.2, 3.21), (-3.2 % 3.21) + 3.21);
  assertEquals(modulo(-3.21, 3.21), 0);
  assertEquals(modulo(-3.22, 3.21), (-3.22 % 3.21) + 3.21);
  assertEquals(modulo(-6.41, 3.21), (-6.41 % 3.21) + 3.21);
  assertEquals(modulo(-6.42, 3.21), 0);
  assertEquals(modulo(-6.43, 3.21), (-6.43 % 3.21) + 3.21);

  assertEquals(modulo(0, -3.21), 0);
  assertEquals(modulo(0.01, -3.21), (0.01 % -3.21) - 3.21);
  assertEquals(modulo(3.2, -3.21), (3.2 % -3.21) - 3.21);
  assertEquals(modulo(3.21, -3.21), 0);
  assertEquals(modulo(3.22, -3.21), (3.22 % -3.21) - 3.21);
  assertEquals(modulo(6.41, -3.21), (6.41 % -3.21) - 3.21);
  assertEquals(modulo(6.42, -3.21), 0);
  assertEquals(modulo(6.43, -3.21), (6.43 % -3.21) - 3.21);

  assertEquals(modulo(-0, -3.21), 0);
  assertEquals(modulo(-0.01, -3.21), -0.01 % -3.21);
  assertEquals(modulo(-3.2, -3.21), -3.2 % -3.21);
  assertEquals(modulo(-3.21, -3.21), 0);
  assertEquals(modulo(-3.22, -3.21), -3.22 % -3.21);
  assertEquals(modulo(-6.41, -3.21), -6.41 % -3.21);
  assertEquals(modulo(-6.42, -3.21), 0);
  assertEquals(modulo(-6.43, -3.21), -6.43 % -3.21);
});

Deno.test("clamp(number, number, number)", () => {
  assertEquals(clamp(-9.9, -4.2, 4.2), -4.2);
  assertEquals(clamp(0, -4.2, 4.2), 0);
  assertEquals(clamp(9.9, -4.2, 4.2), 4.2);

  assertEquals(clamp(-9.9, 4.2, -4.2), 4.2);
  assertEquals(clamp(0, 4.2, -4.2), 4.2);
  assertEquals(clamp(9.9, 4.2, -4.2), -4.2);
});

Deno.test("clamp(number, number, number) - NaN", () => {
  assertEquals(clamp(NaN, -4.2, 4.2), NaN);
  assertEquals(clamp(0, NaN, 4.2), NaN);
  assertEquals(clamp(0, -4.2, NaN), NaN);

  assertEquals(clamp(Infinity, -4.2, 4.2), 4.2);
  assertEquals(clamp(-Infinity, -4.2, 4.2), -4.2);

  assertEquals(clamp(9.9, -Infinity, 4.2), 4.2);
  assertEquals(clamp(-9.9, -Infinity, 4.2), -9.9);

  assertEquals(clamp(9.9, -4.2, Infinity), 9.9);
  assertEquals(clamp(-9.9, -4.2, Infinity), -4.2);
});

Deno.test("floor", () => {
  assertEquals(floor(4.1), Math.floor(4.1));
  assertEquals(floor(4.9), Math.floor(4.9));
  assertEquals(floor(-4.1), Math.floor(-4.1));
  assertEquals(floor(-4.9), Math.floor(-4.9));

  assertEquals(floor(NaN), 0);
  assertEquals(floor(NaN, -4.2), -4.2);

  assertEquals(floor(Infinity), 0);
  assertEquals(floor(Infinity, -4.2), -4.2);

  assertEquals(floor(-Infinity), 0);
  assertEquals(floor(-Infinity, -4.2), -4.2);
});

Deno.test("round", () => {
  assertEquals(round(4.1), Math.round(4.1));
  assertEquals(round(4.9), Math.round(4.9));
  assertEquals(round(-4.1), Math.round(-4.1));
  assertEquals(round(-4.9), Math.round(-4.9));

  assertEquals(round(NaN), 0);
  assertEquals(round(NaN, -4.2), -4.2);

  assertEquals(round(Infinity), 0);
  assertEquals(round(Infinity, -4.2), -4.2);

  assertEquals(round(-Infinity), 0);
  assertEquals(round(-Infinity, -4.2), -4.2);
});

Deno.test("ceil", () => {
  assertEquals(ceil(4.1), Math.ceil(4.1));
  assertEquals(ceil(4.9), Math.ceil(4.9));
  assertEquals(ceil(-4.1), Math.ceil(-4.1));
  assertEquals(ceil(-4.9), Math.ceil(-4.9));

  assertEquals(ceil(NaN), 0);
  assertEquals(ceil(NaN, -4.2), -4.2);

  assertEquals(ceil(Infinity), 0);
  assertEquals(ceil(Infinity, -4.2), -4.2);

  assertEquals(ceil(-Infinity), 0);
  assertEquals(ceil(-Infinity, -4.2), -4.2);
});
