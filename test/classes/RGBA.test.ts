import { RGBA } from "../../deno/classes/RGBA.ts";
import { assertEquals, assertObjectMatch, assertThrows } from "../test-deps.ts";

Deno.test("RGBA.of(RGBAData)", () => {
  assertObjectMatch(
    RGBA.of({ red: 42, green: 53, blue: 64, alpha: 75 }),
    {
      red: 42,
      green: 53,
      blue: 64,
      alpha: 75,
    },
  );
});

Deno.test("RGBA.fromRGB(number, number, number)", () => {
  assertObjectMatch(
    RGBA.fromRGB(42, 53, 64),
    {
      red: 42,
      green: 53,
      blue: 64,
      alpha: 255,
    },
  );
});

Deno.test("RGBA.fromRGB(number, number, number) - out of range (clamped)", () => {
  assertObjectMatch(
    RGBA.fromRGB(-1, -1, -1),
    {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 255,
    },
  );
  assertObjectMatch(
    RGBA.fromRGB(256, 256, 256),
    {
      red: 255,
      green: 255,
      blue: 255,
      alpha: 255,
    },
  );
});

Deno.test("RGBA.fromRGB(number, number, number) - float (use rounded value)", () => {
  assertObjectMatch(
    RGBA.fromRGB(1.1, 1.1, 1.1),
    {
      red: 1,
      green: 1,
      blue: 1,
      alpha: 255,
    },
  );
  assertObjectMatch(
    RGBA.fromRGB(1.4, 1.4, 1.4),
    {
      red: 1,
      green: 1,
      blue: 1,
      alpha: 255,
    },
  );
  assertObjectMatch(
    RGBA.fromRGB(1.5, 1.5, 1.5),
    {
      red: 2,
      green: 2,
      blue: 2,
      alpha: 255,
    },
  );
  assertObjectMatch(
    RGBA.fromRGB(1.9, 1.9, 1.9),
    {
      red: 2,
      green: 2,
      blue: 2,
      alpha: 255,
    },
  );
});

Deno.test("RGBA.fromRGBByFloat(number, number, number)", () => {
  assertObjectMatch(
    RGBA.fromRGBByFloat(0.42, 0.53, 0.64),
    {
      red: Math.round(0.42 * 255),
      green: Math.round(0.53 * 255),
      blue: Math.round(0.64 * 255),
      alpha: 255,
    },
  );
});

Deno.test("RGBA.fromRGBByFloat(number, number, number) - out of range (clamped)", () => {
  assertObjectMatch(
    RGBA.fromRGBByFloat(-0.1, -0.1, -0.1),
    {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 255,
    },
  );
  assertObjectMatch(
    RGBA.fromRGBByFloat(1.1, 1.1, 1.1),
    {
      red: 255,
      green: 255,
      blue: 255,
      alpha: 255,
    },
  );
});

Deno.test("RGBA.fromRGBA(number, number, number, number)", () => {
  assertObjectMatch(
    RGBA.fromRGBA(42, 53, 64, 75),
    {
      red: 42,
      green: 53,
      blue: 64,
      alpha: 75,
    },
  );
});

Deno.test("RGBA.fromRGBA(number, number, number, number) - out of range (clamped)", () => {
  assertObjectMatch(
    RGBA.fromRGBA(-1, -1, -1, -1),
    {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
    },
  );
  assertObjectMatch(
    RGBA.fromRGBA(256, 256, 256, 256),
    {
      red: 255,
      green: 255,
      blue: 255,
      alpha: 255,
    },
  );
});

Deno.test("RGBA.fromRGBA(number, number, number, number) - float (use rounded value)", () => {
  assertObjectMatch(
    RGBA.fromRGBA(1.1, 1.1, 1.1, 1.1),
    {
      red: 1,
      green: 1,
      blue: 1,
      alpha: 1,
    },
  );
  assertObjectMatch(
    RGBA.fromRGBA(1.4, 1.4, 1.4, 1.4),
    {
      red: 1,
      green: 1,
      blue: 1,
      alpha: 1,
    },
  );
  assertObjectMatch(
    RGBA.fromRGBA(1.5, 1.5, 1.5, 1.5),
    {
      red: 2,
      green: 2,
      blue: 2,
      alpha: 2,
    },
  );
  assertObjectMatch(
    RGBA.fromRGBA(1.9, 1.9, 1.9, 1.9),
    {
      red: 2,
      green: 2,
      blue: 2,
      alpha: 2,
    },
  );
});

Deno.test("RGBA.fromRGBAByFloat(number, number, number, number)", () => {
  assertObjectMatch(
    RGBA.fromRGBAByFloat(0.42, 0.53, 0.64, 0.75),
    {
      red: Math.round(0.42 * 255),
      green: Math.round(0.53 * 255),
      blue: Math.round(0.64 * 255),
      alpha: Math.round(0.75 * 255),
    },
  );
});

Deno.test("RGBA.fromRGBAByFloat(number, number, number, number) - out of range (clamped)", () => {
  assertObjectMatch(
    RGBA.fromRGBAByFloat(-0.1, -0.1, -0.1, -0.1),
    {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
    },
  );
  assertObjectMatch(
    RGBA.fromRGBAByFloat(1.1, 1.1, 1.1, 1.1),
    {
      red: 255,
      green: 255,
      blue: 255,
      alpha: 255,
    },
  );
});

Deno.test("RGBA.fromHexString(string) - #rrggbb", () => {
  assertObjectMatch(
    RGBA.fromHexString("#1a009f"),
    {
      red: 0x1a,
      green: 0x00,
      blue: 0x9f,
      alpha: 0xff,
    },
  );
});

Deno.test("RGBA.fromHexString(string) - #rrggbbaa", () => {
  assertObjectMatch(
    RGBA.fromHexString("#1a009faa"),
    {
      red: 0x1a,
      green: 0x00,
      blue: 0x9f,
      alpha: 0xaa,
    },
  );
});

Deno.test("RGBA.fromHexString(string) - not strict", () => {
  assertObjectMatch(
    RGBA.fromHexString("#1a009fa"),
    {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 255,
    },
  );
});

Deno.test("RGBA.fromHexString(string) - strict", () => {
  assertThrows(() => RGBA.fromHexString("#1a009fa", true));
});

Deno.test("properties (red, green, blue, alpha)", () => {
  const color = RGBA.fromRGBA(42, 53, 64, 75);
  assertEquals(color.red, 42);
  assertEquals(color.green, 53);
  assertEquals(color.blue, 64);
  assertEquals(color.alpha, 75);
});

Deno.test("properties (red, green, blue, alpha) - invalid data", () => {
  const color = RGBA.fromRGBA(NaN, 53, 64, 75);
  assertEquals(color.red, NaN);
  assertEquals(color.green, NaN);
  assertEquals(color.blue, NaN);
  assertEquals(color.alpha, NaN);
});

Deno.test("compare(RGBAData) - same parameter", () => {
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 75).compare({
      red: 42,
      green: 53,
      blue: 64,
      alpha: 75,
    }),
    0,
  );
});

Deno.test("compare(RGBAData) - different red", () => {
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 75).compare({
      red: 43,
      green: 53,
      blue: 64,
      alpha: 75,
    }),
    -1,
  );
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 75).compare({
      red: 41,
      green: 53,
      blue: 64,
      alpha: 75,
    }),
    1,
  );
});

Deno.test("compare(RGBAData) - different green", () => {
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 75).compare({
      red: 42,
      green: 54,
      blue: 64,
      alpha: 75,
    }),
    -1,
  );
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 75).compare({
      red: 42,
      green: 52,
      blue: 64,
      alpha: 75,
    }),
    1,
  );
});

Deno.test("compare(RGBAData) - different blue", () => {
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 75).compare({
      red: 42,
      green: 53,
      blue: 65,
      alpha: 75,
    }),
    -1,
  );
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 75).compare({
      red: 42,
      green: 53,
      blue: 63,
      alpha: 75,
    }),
    1,
  );
});

Deno.test("compare(RGBAData) - different alpha", () => {
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 75).compare({
      red: 42,
      green: 53,
      blue: 64,
      alpha: 76,
    }),
    -1,
  );
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 75).compare({
      red: 42,
      green: 53,
      blue: 64,
      alpha: 74,
    }),
    1,
  );
});

Deno.test("compare(RGBAData) - invalid data", () => {
  assertEquals(
    RGBA.of({ red: NaN, green: 53, blue: 64, alpha: 75 }).compare({
      red: 42,
      green: 53,
      blue: 64,
      alpha: 75,
    }),
    -1,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: 64, alpha: 75 }).compare({
      red: NaN,
      green: 53,
      blue: 64,
      alpha: 75,
    }),
    1,
  );
  assertEquals(
    RGBA.of({ red: NaN, green: 53, blue: 64, alpha: 75 }).compare({
      red: NaN,
      green: 53,
      blue: 64,
      alpha: 75,
    }),
    0,
  );
});

Deno.test("valueOf()", () => {
  assertObjectMatch(
    RGBA.fromRGBA(42, 53, 64, 75).valueOf(),
    {
      red: 42,
      green: 53,
      blue: 64,
      alpha: 75,
    },
  );
});

Deno.test("isValid()", () => {
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: 64, alpha: 75 }).isValid(),
    true,
  );
  assertEquals(
    RGBA.of({ red: 256, green: 53, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 256, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: 256, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: 64, alpha: 256 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: -1, green: 53, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: -1, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: -1, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: 64, alpha: -1 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 4.2, green: 53, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 5.3, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: 6.4, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: 64, alpha: 7.5 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: NaN, green: 53, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: NaN, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: NaN, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: 64, alpha: NaN }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: Infinity, green: 53, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: Infinity, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: Infinity, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: 64, alpha: Infinity }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: -Infinity, green: 53, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: -Infinity, blue: 64, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: -Infinity, alpha: 75 }).isValid(),
    false,
  );
  assertEquals(
    RGBA.of({ red: 42, green: 53, blue: 64, alpha: -Infinity }).isValid(),
    false,
  );
});

Deno.test("toString([boolean])", () => {
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 75).toString(),
    `rgba(42,53,64,${75 / 255})`,
  );
});

Deno.test("toString([boolean]) - omit alpha", () => {
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 75).toString(true),
    `rgba(42,53,64,${75 / 255})`,
  );
  assertEquals(
    RGBA.fromRGBA(42, 53, 64, 255).toString(true),
    `rgb(42,53,64)`,
  );
});

Deno.test("toString([boolean]) - invalid data", () => {
  assertEquals(
    RGBA.fromRGBA(NaN, 53, 64, 75).toString(),
    `rgb(0,0,0)`,
  );
});

Deno.test("toHexString([boolean])", () => {
  assertEquals(
    RGBA.fromRGBA(0x4a, 0x5b, 0x6c, 0xd).toHexString(),
    "#4a5b6c0d",
  );
});

Deno.test("toHexString([boolean]) - omit alpha", () => {
  assertEquals(
    RGBA.fromRGBA(0x4a, 0x5b, 0x6c, 0xd).toHexString(true),
    "#4a5b6c0d",
  );
  assertEquals(
    RGBA.fromRGBA(0x4a, 0x5b, 0x6c, 0xff).toHexString(true),
    "#4a5b6c",
  );
});

Deno.test("toHexString([boolean]) - invalid data", () => {
  assertEquals(
    RGBA.fromRGBA(NaN, 53, 64, 75).toHexString(),
    "#000000",
  );
});
