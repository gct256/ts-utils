import { Size } from "../../deno/classes/Size.ts";
import { assertEquals, assertNotStrictEquals, assertObjectMatch } from "../test-deps.ts";

Deno.test("Size.of", () => {
  assertObjectMatch(
    Size.of({ width: 4.2, height: 5.3 }),
    { width: 4.2, height: 5.3 },
  );
});

Deno.test("Size.fromWH", () => {
  assertObjectMatch(
    Size.fromWH(4.2, 5.3),
    { width: 4.2, height: 5.3 },
  );
});

Deno.test("properties", () => {
  const size = Size.fromWH(4.2, 5.3);

  assertEquals(
    size.width,
    4.2,
  );
  assertEquals(
    size.height,
    5.3,
  );
});

Deno.test("properties - invalid data", () => {
  const size = Size.fromWH(NaN, 5.3);

  assertEquals(
    size.width,
    NaN,
  );
  assertEquals(
    size.height,
    NaN,
  );
});

Deno.test("compare - same parameter", () => {
  assertEquals(
    Size.fromWH(4.2, 5.3).compare({ width: 4.2, height: 5.3 }),
    0,
  );
});

Deno.test("compare - different width, same height", () => {
  assertEquals(
    Size.fromWH(4.2, 5.3).compare({ width: 4.3, height: 5.3 }),
    -1,
  );
  assertEquals(
    Size.fromWH(4.2, 5.3).compare({ width: 4.1, height: 5.3 }),
    1,
  );
});

Deno.test("compare - same width, different height", () => {
  assertEquals(
    Size.fromWH(4.2, 5.3).compare({ width: 4.2, height: 5.4 }),
    -1,
  );
  assertEquals(
    Size.fromWH(4.2, 5.3).compare({ width: 4.2, height: 5.2 }),
    1,
  );
});

Deno.test("compare - different width and height", () => {
  assertEquals(
    Size.fromWH(4.2, 5.3).compare({ width: 4.3, height: 5.2 }),
    -1,
  );
  assertEquals(
    Size.fromWH(4.2, 5.3).compare({ width: 4.3, height: 5.4 }),
    -1,
  );
  assertEquals(
    Size.fromWH(4.2, 5.3).compare({ width: 4.1, height: 5.2 }),
    1,
  );
  assertEquals(
    Size.fromWH(4.2, 5.3).compare({ width: 4.1, height: 5.4 }),
    1,
  );
});

Deno.test("compare - invalid data", () => {
  assertEquals(
    Size.fromWH(4.2, 5.3).compare({ width: NaN, height: 5.2 }),
    1,
  );
  assertEquals(
    Size.fromWH(NaN, 5.3).compare({ width: 4.2, height: 5.2 }),
    -1,
  );
  assertEquals(
    Size.fromWH(NaN, 5.3).compare({ width: NaN, height: 5.2 }),
    0,
  );
});

Deno.test("valueOf", () => {
  assertObjectMatch(
    Size.fromWH(4.2, 5.3).valueOf(),
    { width: 4.2, height: 5.3 },
  );
});

Deno.test("isValid", () => {
  assertEquals(
    Size.fromWH(4.2, 5.3).isValid(),
    true,
  );

  assertEquals(
    Size.fromWH(NaN, 5.3).isValid(),
    false,
  );
  assertEquals(
    Size.fromWH(Infinity, 5.3).isValid(),
    false,
  );
  assertEquals(
    Size.fromWH(-Infinity, 5.3).isValid(),
    false,
  );

  assertEquals(
    Size.fromWH(4.2, NaN).isValid(),
    false,
  );
  assertEquals(
    Size.fromWH(4.2, Infinity).isValid(),
    false,
  );
  assertEquals(
    Size.fromWH(4.2, -Infinity).isValid(),
    false,
  );
});

Deno.test("isEmpty", () => {
  assertEquals(
    Size.fromWH(4.2, 5.3).isEmpty(),
    false,
  );

  assertEquals(
    Size.fromWH(0, 5.3).isEmpty(),
    true,
  );
  assertEquals(
    Size.fromWH(4.2, 0).isEmpty(),
    true,
  );
  assertEquals(
    Size.fromWH(0, 0).isEmpty(),
    true,
  );

  assertEquals(
    Size.fromWH(NaN, 5.3).isEmpty(),
    false,
  );
});

Deno.test("resizeBy(number, number)", () => {
  assertObjectMatch(
    Size.fromWH(4.2, 5.3).resizeBy(0.1, -0.2),
    { width: 4.2 + 0.1, height: 5.3 + -0.2 },
  );

  const size = Size.fromWH(4.2, 5.3);

  assertNotStrictEquals(
    size.resizeBy(0, 0),
    size,
  );
});

Deno.test("resizeBy(number, number) - invalid data", () => {
  assertEquals(
    Size.fromWH(NaN, 5.3).resizeBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Size.fromWH(4.2, 5.3).resizeBy(NaN, -1).isValid(),
    false,
  );
});

Deno.test("resizeBy(PointData)", () => {
  assertObjectMatch(
    Size.fromWH(4.2, 5.3).resizeBy({ x: 0.1, y: -0.2 }),
    { width: 4.2 + 0.1, height: 5.3 + -0.2 },
  );

  const size = Size.fromWH(4.2, 5.3);

  assertNotStrictEquals(
    size.resizeBy({ x: 0, y: 0 }),
    size,
  );
});

Deno.test("resizeBy(PointData) - invalid data", () => {
  assertEquals(
    Size.fromWH(NaN, 5.3).resizeBy({ x: 1, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Size.fromWH(4.2, 5.3).resizeBy({ x: NaN, y: -1 }).isValid(),
    false,
  );
});

Deno.test("resizeBy(SizeData)", () => {
  assertObjectMatch(
    Size.fromWH(4.2, 5.3).resizeBy({ width: 0.1, height: 0.2 }),
    {
      width: 4.2 + 0.1,
      height: 5.3 + 0.2,
    },
  );

  const size = Size.fromWH(4.2, 5.3);

  assertNotStrictEquals(
    size.resizeBy({ width: 0, height: 0 }),
    size,
  );
});

Deno.test("resizeBy(SizeData) - invalid data", () => {
  assertEquals(
    Size.fromWH(NaN, 5.3).resizeBy({ width: 0.1, height: 0.2 }).isValid(),
    false,
  );
  assertEquals(
    Size.fromWH(4.2, 5.3).resizeBy({ width: NaN, height: 0.2 }).isValid(),
    false,
  );
});
