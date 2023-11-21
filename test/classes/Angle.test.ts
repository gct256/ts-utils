import { Angle } from "../../deno/classes/Angle.ts";
import { assertEquals, assertNotStrictEquals, assertObjectMatch, assertThrows } from "../test-deps.ts";

const RAD_42 = 42 * (Math.PI / 180);
const DEG_42 = 42;

Deno.test("Angle.of(AngleData)", () => {
  assertObjectMatch(
    Angle.of({ radian: RAD_42, degree: DEG_42 }),
    { radian: RAD_42, degree: DEG_42 },
  );
});

Deno.test("Angle.of(AngleData) - not match radian and degree", () => {
  assertObjectMatch(
    Angle.of({ radian: RAD_42, degree: DEG_42 }),
    { radian: RAD_42, degree: DEG_42 },
  );
  assertObjectMatch(
    Angle.of({ radian: 4.2, degree: DEG_42 }),
    { radian: RAD_42, degree: DEG_42 },
  );
});

Deno.test("Angle.of(AngleData) - not match radian and degree (strict)", () => {
  assertThrows(
    () => Angle.of({ radian: RAD_42, degree: 4.2 }, true),
  );
  assertThrows(
    () => Angle.of({ radian: 4.2, degree: DEG_42 }, true),
  );
});

Deno.test("Angle.fromRadian(number)", () => {
  assertObjectMatch(
    Angle.fromRadian(RAD_42),
    { radian: RAD_42, degree: DEG_42 },
  );
});

Deno.test("Angle.fromDegree(number)", () => {
  assertObjectMatch(
    Angle.fromDegree(DEG_42),
    { radian: RAD_42, degree: DEG_42 },
  );
});

Deno.test("Angle.formXY(number, number)", () => {
  assertEquals(
    Angle.fromXY(4.2, 5.3).radian,
    Math.atan2(5.3, 4.2),
  );
});

Deno.test("Angle.formPoint(PointData)", () => {
  assertEquals(
    Angle.fromPoint({ x: 4.2, y: 5.3 }).radian,
    Math.atan2(5.3, 4.2),
  );
});

Deno.test("properties (radian, degree)", () => {
  const angle = Angle.fromRadian(RAD_42);

  assertEquals(
    angle.radian,
    RAD_42,
  );
  assertEquals(
    angle.degree,
    DEG_42,
  );
});

Deno.test("properties (radian, degree) - invalid", () => {
  const angle = Angle.fromRadian(NaN);

  assertEquals(
    angle.radian,
    NaN,
  );
  assertEquals(
    angle.degree,
    NaN,
  );
});

Deno.test("compare(AngleData)", () => {
  const other = { radian: RAD_42, degree: DEG_42 };

  assertEquals(
    Angle.fromRadian(RAD_42).compare(other),
    0,
  );

  assertEquals(
    Angle.fromRadian(RAD_42 + 0.1).compare(other),
    1,
  );
  assertEquals(
    Angle.fromRadian(RAD_42 - 0.1).compare(other),
    -1,
  );
});

Deno.test("compare(AngleData) - invalid", () => {
  assertEquals(
    Angle.fromRadian(NaN).compare({ radian: RAD_42, degree: DEG_42 }),
    -1,
  );
  assertEquals(
    Angle.fromRadian(RAD_42).compare({ radian: NaN, degree: DEG_42 }),
    1,
  );
  assertEquals(
    Angle.fromRadian(NaN).compare({ radian: NaN, degree: DEG_42 }),
    0,
  );
});

Deno.test("valueOf()", () => {
  assertEquals(
    Angle.fromRadian(RAD_42).valueOf(),
    { radian: RAD_42, degree: DEG_42 },
  );
});

Deno.test("isValid()", () => {
  assertEquals(
    Angle.fromRadian(RAD_42).isValid(),
    true,
  );
  assertEquals(
    Angle.fromRadian(NaN).isValid(),
    false,
  );
  assertEquals(
    Angle.fromRadian(Infinity).isValid(),
    false,
  );
  assertEquals(
    Angle.fromRadian(-Infinity).isValid(),
    false,
  );
});

Deno.test("normalize()", () => {
  assertEquals(
    Angle.fromDegree(-721).normalize().degree,
    -1,
  );
  assertEquals(
    Angle.fromDegree(-720).normalize().degree,
    0,
  );
  assertEquals(
    Angle.fromDegree(-719).normalize().degree,
    1,
  );

  assertEquals(
    Angle.fromDegree(-541).normalize().degree,
    179,
  );
  assertEquals(
    Angle.fromDegree(-540).normalize().degree,
    180,
  );
  assertEquals(
    Angle.fromDegree(-539).normalize().degree,
    -179,
  );

  assertEquals(
    Angle.fromDegree(-361).normalize().degree,
    -1,
  );
  assertEquals(
    Angle.fromDegree(-360).normalize().degree,
    0,
  );
  assertEquals(
    Angle.fromDegree(-359).normalize().degree,
    1,
  );

  assertEquals(
    Angle.fromDegree(-181).normalize().degree,
    179,
  );
  assertEquals(
    Angle.fromDegree(-180).normalize().degree,
    180,
  );
  assertEquals(
    Angle.fromDegree(-179).normalize().degree,
    -179,
  );

  assertEquals(
    Angle.fromDegree(-1).normalize().degree,
    -1,
  );
  assertEquals(
    Angle.fromDegree(0).normalize().degree,
    0,
  );
  assertEquals(
    Angle.fromDegree(1).normalize().degree,
    1,
  );

  assertEquals(
    Angle.fromDegree(179).normalize().degree,
    179,
  );
  assertEquals(
    Angle.fromDegree(180).normalize().degree,
    180,
  );
  assertEquals(
    Angle.fromDegree(181).normalize().degree,
    -179,
  );

  assertEquals(
    Angle.fromDegree(359).normalize().degree,
    -1,
  );
  assertEquals(
    Angle.fromDegree(360).normalize().degree,
    0,
  );
  assertEquals(
    Angle.fromDegree(361).normalize().degree,
    1,
  );

  assertEquals(
    Angle.fromDegree(539).normalize().degree,
    179,
  );
  assertEquals(
    Angle.fromDegree(540).normalize().degree,
    180,
  );
  assertEquals(
    Angle.fromDegree(541).normalize().degree,
    -179,
  );

  assertEquals(
    Angle.fromDegree(719).normalize().degree,
    -1,
  );
  assertEquals(
    Angle.fromDegree(720).normalize().degree,
    0,
  );
  assertEquals(
    Angle.fromDegree(721).normalize().degree,
    1,
  );
});

Deno.test("normalize() - invalid", () => {
  assertEquals(
    Angle.fromDegree(NaN).normalize().isValid(),
    false,
  );
});

Deno.test("normalizeIn360()", () => {
  assertEquals(
    Angle.fromDegree(-721).normalizeIn360().degree,
    359,
  );
  assertEquals(
    Angle.fromDegree(-720).normalizeIn360().degree,
    0,
  );
  assertEquals(
    Angle.fromDegree(-719).normalizeIn360().degree,
    1,
  );

  assertEquals(
    Angle.fromDegree(-361).normalizeIn360().degree,
    359,
  );
  assertEquals(
    Angle.fromDegree(-360).normalizeIn360().degree,
    0,
  );
  assertEquals(
    Angle.fromDegree(-359).normalizeIn360().degree,
    1,
  );

  assertEquals(
    Angle.fromDegree(-1).normalizeIn360().degree,
    359,
  );
  assertEquals(
    Angle.fromDegree(0).normalizeIn360().degree,
    0,
  );
  assertEquals(
    Angle.fromDegree(1).normalizeIn360().degree,
    1,
  );

  assertEquals(
    Angle.fromDegree(359).normalizeIn360().degree,
    359,
  );
  assertEquals(
    Angle.fromDegree(360).normalizeIn360().degree,
    0,
  );
  assertEquals(
    Angle.fromDegree(361).normalizeIn360().degree,
    1,
  );

  assertEquals(
    Angle.fromDegree(719).normalizeIn360().degree,
    359,
  );
  assertEquals(
    Angle.fromDegree(720).normalizeIn360().degree,
    0,
  );
  assertEquals(
    Angle.fromDegree(721).normalizeIn360().degree,
    1,
  );
});

Deno.test("normalizeIn360() - invalid", () => {
  assertEquals(
    Angle.fromDegree(NaN).normalizeIn360().isValid(),
    false,
  );
});

Deno.test("addRadian(number)", () => {
  assertEquals(
    Angle.fromRadian(0.1).addRadian(0.2).radian,
    0.1 + 0.2,
  );

  const angle = Angle.fromRadian(RAD_42);

  assertNotStrictEquals(
    angle.addRadian(0),
    angle,
  );
});

Deno.test("addRadian(number) - invalid", () => {
  assertEquals(
    Angle.fromRadian(NaN).addRadian(RAD_42).isValid(),
    false,
  );

  assertEquals(
    Angle.fromRadian(RAD_42).addRadian(NaN).isValid(),
    false,
  );
  assertEquals(
    Angle.fromRadian(RAD_42).addRadian(Infinity).isValid(),
    false,
  );
  assertEquals(
    Angle.fromRadian(RAD_42).addRadian(-Infinity).isValid(),
    false,
  );

  assertEquals(
    Angle.fromRadian(NaN).addRadian(NaN).isValid(),
    false,
  );
  assertEquals(
    Angle.fromRadian(NaN).addRadian(Infinity).isValid(),
    false,
  );
  assertEquals(
    Angle.fromRadian(NaN).addRadian(-Infinity).isValid(),
    false,
  );
});

Deno.test("addDegree(number)", () => {
  assertEquals(
    Angle.fromDegree(0.1).addDegree(0.2).degree,
    0.1 + 0.2,
  );

  const angle = Angle.fromDegree(DEG_42);

  assertNotStrictEquals(
    angle.addDegree(0),
    angle,
  );
});

Deno.test("addDegree(number) - invalid", () => {
  assertEquals(
    Angle.fromDegree(NaN).addDegree(DEG_42).isValid(),
    false,
  );

  assertEquals(
    Angle.fromDegree(DEG_42).addDegree(NaN).isValid(),
    false,
  );
  assertEquals(
    Angle.fromDegree(DEG_42).addDegree(Infinity).isValid(),
    false,
  );
  assertEquals(
    Angle.fromDegree(DEG_42).addDegree(-Infinity).isValid(),
    false,
  );

  assertEquals(
    Angle.fromDegree(NaN).addDegree(NaN).isValid(),
    false,
  );
  assertEquals(
    Angle.fromDegree(NaN).addDegree(Infinity).isValid(),
    false,
  );
  assertEquals(
    Angle.fromDegree(NaN).addDegree(-Infinity).isValid(),
    false,
  );
});

Deno.test("add(AngleData)", () => {
  assertEquals(
    Angle.fromDegree(0.1).add(Angle.fromDegree(0.2)).degree,
    0.1 + 0.2,
  );

  const angle = Angle.fromDegree(DEG_42);

  assertNotStrictEquals(
    angle.add(Angle.fromDegree(0)),
    angle,
  );
});

Deno.test("add(AngleData) - invalid", () => {
  assertEquals(
    Angle.fromDegree(NaN).add(Angle.fromDegree(DEG_42)).isValid(),
    false,
  );
  assertEquals(
    Angle.fromDegree(DEG_42).add(Angle.fromDegree(NaN)).isValid(),
    false,
  );
  assertEquals(
    Angle.fromDegree(NaN).add(Angle.fromDegree(NaN)).isValid(),
    false,
  );
});

Deno.test("multiple(number)", () => {
  assertEquals(
    Angle.fromDegree(0.1).multiple(0.2).degree,
    0.1 * 0.2,
  );
  assertEquals(
    Angle.fromDegree(0.1).multiple(0).degree,
    0,
  );

  const angle = Angle.fromDegree(DEG_42);

  assertNotStrictEquals(
    angle.multiple(1),
    angle,
  );
});

Deno.test("multiple(number) - invalid", () => {
  assertEquals(
    Angle.fromDegree(NaN).multiple(1).isValid(),
    false,
  );

  assertEquals(
    Angle.fromDegree(DEG_42).multiple(NaN).isValid(),
    false,
  );
  assertEquals(
    Angle.fromDegree(DEG_42).multiple(Infinity).isValid(),
    false,
  );
  assertEquals(
    Angle.fromDegree(DEG_42).multiple(-Infinity).isValid(),
    false,
  );

  assertEquals(
    Angle.fromDegree(NaN).multiple(NaN).isValid(),
    false,
  );
  assertEquals(
    Angle.fromDegree(NaN).multiple(Infinity).isValid(),
    false,
  );
  assertEquals(
    Angle.fromDegree(NaN).multiple(-Infinity).isValid(),
    false,
  );
});

Deno.test("getCos()", () => {
  assertEquals(
    Angle.fromRadian(RAD_42).getCos(),
    Math.cos(RAD_42),
  );
});

Deno.test("getCos() - call twice (return cached value)", () => {
  assertEquals(
    Angle.fromRadian(RAD_42).getCos(),
    Math.cos(RAD_42),
  );
  assertEquals(
    Angle.fromRadian(RAD_42).getCos(),
    Math.cos(RAD_42),
  );
});

Deno.test("getCos() - invalid", () => {
  assertEquals(
    Angle.fromRadian(NaN).getCos(),
    NaN,
  );
});

Deno.test("getSin()", () => {
  assertEquals(
    Angle.fromRadian(RAD_42).getSin(),
    Math.sin(RAD_42),
  );
});

Deno.test("getSin() - call twice (return cached value)", () => {
  assertEquals(
    Angle.fromRadian(RAD_42).getSin(),
    Math.sin(RAD_42),
  );
  assertEquals(
    Angle.fromRadian(RAD_42).getSin(),
    Math.sin(RAD_42),
  );
});

Deno.test("getSin() - invalid", () => {
  assertEquals(
    Angle.fromRadian(NaN).getSin(),
    NaN,
  );
});

Deno.test("getTan()", () => {
  assertEquals(
    Angle.fromRadian(RAD_42).getTan(),
    Math.tan(RAD_42),
  );
});

Deno.test("getTan() - call twice (return cached value)", () => {
  assertEquals(
    Angle.fromRadian(RAD_42).getTan(),
    Math.tan(RAD_42),
  );
  assertEquals(
    Angle.fromRadian(RAD_42).getTan(),
    Math.tan(RAD_42),
  );
});

Deno.test("getTan() - invalid", () => {
  assertEquals(
    Angle.fromRadian(NaN).getTan(),
    NaN,
  );
});

Deno.test("getPointDelta(number)", () => {
  assertObjectMatch(
    Angle.fromRadian(RAD_42).getPointDelta(42),
    { x: Math.cos(RAD_42) * 42, y: Math.sin(RAD_42) * 42 },
  );
});

Deno.test("getPointDelta(number) - invalid", () => {
  assertEquals(
    Angle.fromRadian(NaN).getPointDelta(42).isValid(),
    false,
  );
  assertEquals(
    Angle.fromRadian(RAD_42).getPointDelta(NaN).isValid(),
    false,
  );
  assertEquals(
    Angle.fromRadian(RAD_42).getPointDelta(Infinity).isValid(),
    false,
  );
  assertEquals(
    Angle.fromRadian(RAD_42).getPointDelta(-Infinity).isValid(),
    false,
  );
});
