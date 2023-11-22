import {
  randFloat,
  randFloatRange,
  randInt,
  randIntRange,
  random,
  shuffle,
} from "../../deno/modules/randoms.ts";
import { assertEquals, assertNotEquals } from "../test-deps.ts";

const min = (): number => 0;
const mid = (): number => 0x80000000;
const max = (): number => 0xffffffff;

Deno.test("random()", () => {
  assertEquals(random(min), 0);
  assertEquals(random(mid), 0.5);
  assertEquals(random(max), 0xffffffff / 0x100000000);
});

Deno.test("randInt(number)", () => {
  assertEquals(randInt(4.2, min), 0);
  assertEquals(randInt(42, mid), 21);
  assertEquals(randInt(42, max), 42);

  assertEquals(randInt(-42, min), -0);
  assertEquals(randInt(-42, mid), -21);
  assertEquals(randInt(-42, max), -42);
});

Deno.test("randIntRange(number, number)", () => {
  assertEquals(randIntRange(-42, 124, min), -42);
  assertEquals(randIntRange(-42, 124, mid), 41);
  assertEquals(randIntRange(-42, 124, max), 124);

  assertEquals(randIntRange(124, -42, min), -42);
  assertEquals(randIntRange(124, -42, mid), 41);
  assertEquals(randIntRange(124, -42, max), 124);
});

Deno.test("randFloat(number)", () => {
  assertEquals(randFloat(4.2, min), 0);
  assertEquals(randFloat(4.2, mid).toFixed(1), "2.1");
  assertEquals(randFloat(4.2, max), 4.2);

  assertEquals(randFloat(-4.2, min), -0);
  assertEquals(randFloat(-4.2, mid).toFixed(1), "-2.1");
  assertEquals(randFloat(-4.2, max), -4.2);
});

Deno.test("randFloatRange(number, number)", () => {
  assertEquals(randFloatRange(-4.2, 12.4, min).toFixed(1), "-4.2");
  assertEquals(randFloatRange(-4.2, 12.4, mid).toFixed(1), "4.1");
  assertEquals(randFloatRange(-4.2, 12.4, max).toFixed(1), "12.4");

  assertEquals(randFloatRange(12.4, -4.2, min).toFixed(1), "-4.2");
  assertEquals(randFloatRange(12.4, -4.2, mid).toFixed(1), "4.1");
  assertEquals(randFloatRange(12.4, -4.2, max).toFixed(1), "12.4");
});

Deno.test("shuffle(number)", () => {
  const array: number[] = [5, 1, 3, 2, 0, 4];
  assertNotEquals(shuffle(array, min), array);
  assertEquals(shuffle(array, max), array);

  assertEquals(shuffle([], min), []);
  assertEquals(shuffle([1], min), [1]);
});

Deno.test("use(number) defaultRandomGenerator", () => {
  assertEquals(Number.isFinite(random()), true);
  assertEquals(Number.isInteger(randInt()), true);
  assertEquals(Number.isInteger(randIntRange(0, 1)), true);
  assertEquals(Number.isFinite(randFloat()), true);
  assertEquals(Number.isFinite(randFloatRange(0, 1)), true);

  const array: number[] = [5, 1, 3, 2, 0, 4];
  assertNotEquals(shuffle(array), array);
});
