import { Point } from "../../deno/classes/Point.ts";
import { assertEquals, assertNotStrictEquals, assertObjectMatch } from "../test-deps.ts";

Deno.test("Point.of", () => {
  assertObjectMatch(
    Point.of({ x: 4.2, y: -5.3 }),
    { x: 4.2, y: -5.3 },
  );
});

Deno.test("Point.fromXY", () => {
  assertObjectMatch(
    Point.fromXY(4.2, -5.3),
    { x: 4.2, y: -5.3 },
  );
});

Deno.test("properties", () => {
  const point = Point.fromXY(4.2, -5.3);

  assertEquals(
    point.x,
    4.2,
  );
  assertEquals(
    point.y,
    -5.3,
  );
});

Deno.test("properties - invalid data", () => {
  const point = Point.fromXY(NaN, -5.3);

  assertEquals(
    point.x,
    NaN,
  );
  assertEquals(
    point.y,
    NaN,
  );
});

Deno.test("compare - same parameter", () => {
  assertEquals(
    Point.fromXY(4.2, -5.3).compare({ x: 4.2, y: -5.3 }),
    0,
  );
});

Deno.test("compare - different x, same y", () => {
  assertEquals(
    Point.fromXY(4.2, -5.3).compare({ x: 4.3, y: -5.3 }),
    -1,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).compare({ x: 4.1, y: -5.3 }),
    1,
  );
});

Deno.test("compare - same x, different y", () => {
  assertEquals(
    Point.fromXY(4.2, -5.3).compare({ x: 4.2, y: -5.2 }),
    -1,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).compare({ x: 4.2, y: -5.4 }),
    1,
  );
});

Deno.test("compare - different x and y", () => {
  assertEquals(
    Point.fromXY(4.2, -5.3).compare({ x: 4.3, y: -5.2 }),
    -1,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).compare({ x: 4.3, y: -5.4 }),
    -1,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).compare({ x: 4.1, y: -5.2 }),
    1,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).compare({ x: 4.1, y: -5.4 }),
    1,
  );
});

Deno.test("compare - invalid data", () => {
  assertEquals(
    Point.fromXY(4.2, -5.3).compare({ x: NaN, y: -5.2 }),
    1,
  );
  assertEquals(
    Point.fromXY(NaN, -5.3).compare({ x: 4.2, y: -5.2 }),
    -1,
  );
  assertEquals(
    Point.fromXY(NaN, -5.3).compare({ x: NaN, y: -5.2 }),
    0,
  );
});

Deno.test("valueOf", () => {
  assertObjectMatch(
    Point.fromXY(4.2, -5.3).valueOf(),
    { x: 4.2, y: -5.3 },
  );
});

Deno.test("isValid", () => {
  assertEquals(
    Point.fromXY(4.2, -5.3).isValid(),
    true,
  );

  assertEquals(
    Point.fromXY(NaN, -5.3).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(Infinity, -5.3).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(-Infinity, -5.3).isValid(),
    false,
  );

  assertEquals(
    Point.fromXY(4.2, NaN).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, Infinity).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -Infinity).isValid(),
    false,
  );
});

Deno.test("moveBy", () => {
  assertObjectMatch(
    Point.fromXY(4.2, -5.3).moveBy(1, -1),
    { x: 5.2, y: -6.3 },
  );

  const point = Point.fromXY(4.2, -5.3);

  assertNotStrictEquals(
    point.moveBy(0, 0),
    point,
  );
});

Deno.test("moveBy - invalid data", () => {
  assertEquals(
    Point.fromXY(NaN, -5.3).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, NaN).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy(NaN, -1).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy(1, NaN).isValid(),
    false,
  );

  assertEquals(
    Point.fromXY(Infinity, -5.3).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, Infinity).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy(Infinity, -1).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy(1, Infinity).isValid(),
    false,
  );

  assertEquals(
    Point.fromXY(-Infinity, -5.3).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -Infinity).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy(-Infinity, -1).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy(1, -Infinity).isValid(),
    false,
  );
});

Deno.test("moveBy", () => {
  assertObjectMatch(
    Point.fromXY(4.2, -5.3).moveBy({ x: 1, y: -1 }),
    { x: 5.2, y: -6.3 },
  );

  const point = Point.fromXY(4.2, -5.3);

  assertNotStrictEquals(
    point.moveBy({ x: 0, y: 0 }),
    point,
  );
});

Deno.test("moveBy - invalid data", () => {
  assertEquals(
    Point.fromXY(NaN, -5.3).moveBy({ x: 1, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, NaN).moveBy({ x: 1, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy({ x: NaN, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy({ x: 1, y: NaN }).isValid(),
    false,
  );

  assertEquals(
    Point.fromXY(Infinity, -5.3).moveBy({ x: 1, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, Infinity).moveBy({ x: 1, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy({ x: Infinity, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy({ x: 1, y: Infinity }).isValid(),
    false,
  );

  assertEquals(
    Point.fromXY(-Infinity, -5.3).moveBy({ x: 1, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -Infinity).moveBy({ x: 1, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy({ x: -Infinity, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).moveBy({ x: 1, y: -Infinity }).isValid(),
    false,
  );
});

Deno.test("getDistanceFromOrigin", () => {
  assertEquals(
    Point.fromXY(4.2, -5.3).getDistanceFromOrigin(),
    Math.sqrt(4.2 ** 2 + (-5.3) ** 2),
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).getDistanceFromOrigin(true),
    4.2 ** 2 + (-5.3) ** 2,
  );
});

Deno.test("getDistanceFromOrigin - invalid data", () => {
  assertEquals(
    Point.fromXY(NaN, -5.3).getDistanceFromOrigin(),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, NaN).getDistanceFromOrigin(),
    NaN,
  );

  assertEquals(
    Point.fromXY(Infinity, -5.3).getDistanceFromOrigin(),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, Infinity).getDistanceFromOrigin(),
    NaN,
  );

  assertEquals(
    Point.fromXY(-Infinity, -5.3).getDistanceFromOrigin(),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, -Infinity).getDistanceFromOrigin(),
    NaN,
  );
});

Deno.test("getDistance", () => {
  assertEquals(
    Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(6.4, -7.5)),
    Math.sqrt((4.2 - 6.4) ** 2 + (-5.3 - -7.5) ** 2),
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(6.4, -7.5), true),
    (4.2 - 6.4) ** 2 + (-5.3 - -7.5) ** 2,
  );
});

Deno.test("getDistance - invalid data", () => {
  assertEquals(
    Point.fromXY(NaN, -5.3).getDistance(Point.fromXY(6.4, -7.5)),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, NaN).getDistance(Point.fromXY(6.4, -7.5)),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(NaN, -7.5)),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(6.4, NaN)),
    NaN,
  );

  assertEquals(
    Point.fromXY(Infinity, -5.3).getDistance(Point.fromXY(6.4, -7.5)),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, Infinity).getDistance(Point.fromXY(6.4, -7.5)),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(Infinity, -7.5)),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(6.4, Infinity)),
    NaN,
  );

  assertEquals(
    Point.fromXY(-Infinity, -5.3).getDistance(Point.fromXY(6.4, -7.5)),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, -Infinity).getDistance(Point.fromXY(6.4, -7.5)),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(-Infinity, -7.5)),
    NaN,
  );
  assertEquals(
    Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(6.4, -Infinity)),
    NaN,
  );
});
