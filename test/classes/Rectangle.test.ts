import { Rectangle } from "../../deno/classes/Rectangle.ts";
import {
  assertEquals,
  assertNotStrictEquals,
  assertObjectMatch,
} from "../test-deps.ts";

const TEST_PAIRS = [
  "AA",
  "AB",
  "AC",
  "AD",
  "AF",
  "AG",
  "CC",
  "CD",
  "CF",
  "CG",
  "DD",
  "DE",
  "DF",
  "DG",
  "FF",
  "FG",
  "GH",
] as const;

type TestPair = typeof TEST_PAIRS[number];
type TestResultItem<T> = { [y in TestPair]?: T };
type TestResult<T> = { [x in TestPair]?: TestResultItem<T> };

const TEST_POINT_MAP: { [key: string]: number } = {
  A: -4.4,
  B: -4.3,
  C: -4.2,
  D: -1.2,
  E: 1.2,
  F: 4.2,
  G: 4.3,
  H: 4.4,
};

const makeTestRect = (px: TestPair, py: TestPair): Rectangle =>
  Rectangle.fromPointPair({
    x: TEST_POINT_MAP[px.slice(0, 1)],
    y: TEST_POINT_MAP[py.slice(0, 1)],
  }, { x: TEST_POINT_MAP[px.slice(1, 2)], y: TEST_POINT_MAP[py.slice(1, 2)] });

const testRect = <T>(
  callback: (r0: Rectangle, r1: Rectangle) => [boolean, T],
): TestResult<T> => {
  const result: TestResult<T> = {};
  const target = makeTestRect("CF", "CF");
  TEST_PAIRS.forEach((px) => {
    const item: TestResultItem<T> = {};
    TEST_PAIRS.forEach((py) => {
      const [record, value] = callback(target, makeTestRect(px, py));
      if (record) item[py] = value;
    });
    if (Object.keys(item).length > 0) result[px] = item;
  });
  return result;
};

Deno.test("Rectangle.of(RectangleData)", () => {
  assertObjectMatch(
    Rectangle.of({
      left: 4.2,
      right: 5.3,
      top: -6.4,
      bottom: 7.5,
      width: 5.3 - 4.2,
      height: 7.5 - -6.4,
      x: 4.2,
      y: -6.4,
    }),
    {
      left: 4.2,
      right: 5.3,
      top: -6.4,
      bottom: 7.5,
      width: 5.3 - 4.2,
      height: 7.5 - -6.4,
      x: 4.2,
      y: -6.4,
    },
  );
  assertObjectMatch(
    Rectangle.of({ left: 4.2, right: 5.3, top: -6.4, bottom: 7.5 }),
    {
      left: 4.2,
      right: 5.3,
      top: -6.4,
      bottom: 7.5,
      width: 5.3 - 4.2,
      height: 7.5 - -6.4,
      x: 4.2,
      y: -6.4,
    },
  );
});

Deno.test("Rectangle.fromXYWH(number, number, number, number)", () => {
  assertObjectMatch(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5), {
    left: 4.2,
    right: 4.2 + 6.4,
    top: -5.3,
    bottom: -5.3 + 7.5,
    width: 6.4,
    height: 7.5,
    x: 4.2,
    y: -5.3,
  });
});

Deno.test("Rectangle.fromPointPair(PointData, PointData)", () => {
  assertObjectMatch(
    Rectangle.fromPointPair({ x: 4.2, y: -6.4 }, { x: 5.3, y: 7.5 }),
    {
      left: 4.2,
      right: 5.3,
      top: -6.4,
      bottom: 7.5,
      width: 5.3 - 4.2,
      height: 7.5 - -6.4,
      x: 4.2,
      y: -6.4,
    },
  );

  const rect = Rectangle.fromPointPair({ x: 4.2, y: -6.4 }, { x: 5.3, y: 7.5 });
  assertEquals(
    Rectangle.fromPointPair({ x: 5.3, y: -6.4 }, { x: 4.2, y: 7.5 }),
    rect,
  );
  assertEquals(
    Rectangle.fromPointPair({ x: 4.2, y: 7.5 }, { x: 5.3, y: -6.4 }),
    rect,
  );
  assertEquals(
    Rectangle.fromPointPair({ x: 5.3, y: 7.5 }, { x: 4.2, y: -6.4 }),
    rect,
  );
});

Deno.test("Rectangle.union(...RectangleData)", () => {
  assertEquals(Rectangle.union(makeTestRect("AB", "AB")).isValid(), true);
  assertEquals(
    Rectangle.union(makeTestRect("AB", "AB")),
    makeTestRect("AB", "AB"),
  );
});

Deno.test("Rectangle.union(...RectangleData) - multiple data", () => {
  assertEquals(
    Rectangle.union(
      makeTestRect("AB", "AB"),
      makeTestRect("CD", "CD"),
      makeTestRect("FG", "FG"),
    ).isValid(),
    true,
  );
  assertEquals(
    Rectangle.union(
      makeTestRect("AB", "AB"),
      makeTestRect("CD", "CD"),
      makeTestRect("FG", "FG"),
    ),
    makeTestRect("AG", "AG"),
  );
  assertEquals(
    Rectangle.union(
      makeTestRect("FG", "FG"),
      makeTestRect("CD", "CD"),
      makeTestRect("AB", "AB"),
    ).isValid(),
    true,
  );
  assertEquals(
    Rectangle.union(
      makeTestRect("FG", "FG"),
      makeTestRect("CD", "CD"),
      makeTestRect("AB", "AB"),
    ),
    makeTestRect("AG", "AG"),
  );
});

Deno.test("Rectangle.union(...RectangleData) - no args", () => {
  assertEquals(Rectangle.union().isValid(), false);
});

Deno.test("Rectangle.union(...RectangleData) - invalid data", () => {
  assertEquals(
    Rectangle.union(Rectangle.of({ left: NaN, right: 0, top: 0, bottom: 0 }))
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.union(
      makeTestRect("AB", "AB"),
      Rectangle.of({ left: NaN, right: 0, top: 0, bottom: 0 }),
    ).isValid(),
    false,
  );
  assertEquals(
    Rectangle.union(
      Rectangle.of({ left: NaN, right: 0, top: 0, bottom: 0 }),
      makeTestRect("AB", "AB"),
    ).isValid(),
    false,
  );
});

Deno.test("Rectangle.intersection(...RectangleData)", () => {
  assertEquals(
    Rectangle.intersection(makeTestRect("AB", "AB")).isValid(),
    true,
  );
  assertEquals(
    Rectangle.intersection(makeTestRect("AB", "AB")),
    makeTestRect("AB", "AB"),
  );
});

Deno.test("Rectangle.intersection(...RectangleData) - multiple data", () => {
  assertEquals(
    Rectangle.intersection(
      makeTestRect("AG", "AG"),
      makeTestRect("CF", "CF"),
      makeTestRect("DE", "DE"),
    ).isValid(),
    true,
  );
  assertEquals(
    Rectangle.intersection(
      makeTestRect("AG", "AG"),
      makeTestRect("CF", "CF"),
      makeTestRect("DE", "DE"),
    ),
    makeTestRect("DE", "DE"),
  );
  assertEquals(
    Rectangle.intersection(
      makeTestRect("DE", "DE"),
      makeTestRect("CF", "CF"),
      makeTestRect("AG", "AG"),
    ).isValid(),
    true,
  );
  assertEquals(
    Rectangle.intersection(
      makeTestRect("DE", "DE"),
      makeTestRect("CF", "CF"),
      makeTestRect("AG", "AG"),
    ),
    makeTestRect("DE", "DE"),
  );
});

Deno.test("Rectangle.intersection(...RectangleData) - empty", () => {
  assertEquals(
    Rectangle.intersection(makeTestRect("AC", "AC"), makeTestRect("CD", "CD"))
      .isValid(),
    true,
  );
  assertEquals(
    Rectangle.intersection(makeTestRect("AC", "AC"), makeTestRect("CD", "CD"))
      .isEmpty(),
    true,
  );
  assertEquals(
    Rectangle.intersection(makeTestRect("AC", "AC"), makeTestRect("CD", "CD")),
    makeTestRect("CC", "CC"),
  );
});

Deno.test("Rectangle.intersection(...RectangleData) - no args", () => {
  assertEquals(Rectangle.intersection().isValid(), false);
});

Deno.test("Rectangle.intersection(...RectangleData) - include invalid rectangle", () => {
  assertEquals(
    Rectangle.intersection(
      Rectangle.of({ left: NaN, right: 0, top: 0, bottom: 0 }),
    ).isValid(),
    false,
  );
  assertEquals(
    Rectangle.intersection(
      makeTestRect("AB", "AB"),
      Rectangle.of({ left: NaN, right: 0, top: 0, bottom: 0 }),
    ).isValid(),
    false,
  );
  assertEquals(
    Rectangle.intersection(
      Rectangle.of({ left: NaN, right: 0, top: 0, bottom: 0 }),
      makeTestRect("AB", "AB"),
    ).isValid(),
    false,
  );
});

Deno.test("Rectangle.intersection(...RectangleData) - no intersection", () => {
  assertEquals(
    Rectangle.intersection(makeTestRect("AC", "AG"), makeTestRect("DF", "AG"))
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.intersection(makeTestRect("AG", "AC"), makeTestRect("AG", "DF"))
      .isValid(),
    false,
  );
});

Deno.test("properties (left, right, top, bottom, width, height, x, y)", () => {
  const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);
  assertEquals(rect.left, 4.2);
  assertEquals(rect.right, 4.2 + 6.4);
  assertEquals(rect.top, -5.3);
  assertEquals(rect.bottom, -5.3 + 7.5);
  assertEquals(rect.width, 6.4);
  assertEquals(rect.height, 7.5);
  assertEquals(rect.x, 4.2);
  assertEquals(rect.y, -5.3);
});

Deno.test("properties (left, right, top, bottom, width, height, x, y) - invalid", () => {
  const rect = Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5);
  assertEquals(rect.left, NaN);
  assertEquals(rect.right, NaN);
  assertEquals(rect.top, NaN);
  assertEquals(rect.bottom, NaN);
  assertEquals(rect.width, NaN);
  assertEquals(rect.height, NaN);
  assertEquals(rect.x, NaN);
  assertEquals(rect.y, NaN);
});

Deno.test("compare(RectangleData) - same", () => {
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5),
    ),
    0,
  );
});

Deno.test("compare(RectangleData) - difference left", () => {
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(4.3, -5.3, 6.4, 7.5),
    ),
    -1,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(4.1, -5.3, 6.4, 7.5),
    ),
    1,
  );
});

Deno.test("compare(RectangleData) - difference top", () => {
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(4.2, -5.2, 6.4, 7.5),
    ),
    -1,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(4.2, -5.4, 6.4, 7.5),
    ),
    1,
  );
});

Deno.test("compare(RectangleData) - difference width", () => {
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(4.2, -5.3, 6.5, 7.5),
    ),
    -1,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(4.2, -5.3, 6.3, 7.5),
    ),
    1,
  );
});

Deno.test("compare(RectangleData) - difference height", () => {
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.6),
    ),
    -1,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.4),
    ),
    1,
  );
});

Deno.test("compare(RectangleData) - invalid", () => {
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5),
    ),
    -1,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5),
    ),
    1,
  );
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).compare(
      Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5),
    ),
    0,
  );
});

Deno.test("valueOf()", () => {
  assertEquals(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).valueOf(), {
    left: 4.2,
    right: 4.2 + 6.4,
    top: -5.3,
    bottom: -5.3 + 7.5,
    width: 6.4,
    height: 7.5,
    x: 4.2,
    y: -5.3,
  });
});

Deno.test("isValid()", () => {
  assertEquals(
    Rectangle.of({ left: 4.2, right: 5.3, top: -6.4, bottom: 7.5 }).isValid(),
    true,
  );
});

Deno.test("isValid() - empty", () => {
  assertEquals(
    Rectangle.of({ left: 4.2, right: 4.2, top: -6.4, bottom: 7.5 }).isValid(),
    true,
  );
  assertEquals(
    Rectangle.of({ left: 4.2, right: 5.3, top: -6.4, bottom: -6.4 }).isValid(),
    true,
  );
});

Deno.test("isValid() - width < 0", () => {
  assertEquals(
    Rectangle.of({ left: 4.2, right: -5.3, top: -6.4, bottom: 7.5 }).isValid(),
    false,
  );
});

Deno.test("isValid() - height < 0", () => {
  assertEquals(
    Rectangle.of({ left: 4.2, right: 5.3, top: 6.4, bottom: -7.5 }).isValid(),
    false,
  );
});

Deno.test("isValid() - NaN", () => {
  assertEquals(
    Rectangle.of({ left: NaN, right: 5.3, top: -6.4, bottom: 7.5 }).isValid(),
    false,
  );
  assertEquals(
    Rectangle.of({ left: 4.2, right: NaN, top: -6.4, bottom: 7.5 }).isValid(),
    false,
  );
  assertEquals(
    Rectangle.of({ left: 4.2, right: 5.3, top: NaN, bottom: 7.5 }).isValid(),
    false,
  );
  assertEquals(
    Rectangle.of({ left: 4.2, right: 5.3, top: -6.4, bottom: NaN }).isValid(),
    false,
  );
});

Deno.test("isValid() - Infinity", () => {
  assertEquals(
    Rectangle.of({ left: Infinity, right: 5.3, top: -6.4, bottom: 7.5 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.of({ left: 4.2, right: Infinity, top: -6.4, bottom: 7.5 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.of({ left: 4.2, right: 5.3, top: Infinity, bottom: 7.5 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.of({ left: 4.2, right: 5.3, top: -6.4, bottom: Infinity })
      .isValid(),
    false,
  );
});

Deno.test("isValid() - -Infinity", () => {
  assertEquals(
    Rectangle.of({ left: -Infinity, right: 5.3, top: -6.4, bottom: 7.5 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.of({ left: 4.2, right: -Infinity, top: -6.4, bottom: 7.5 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.of({ left: 4.2, right: 5.3, top: -Infinity, bottom: 7.5 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.of({ left: 4.2, right: 5.3, top: -6.4, bottom: -Infinity })
      .isValid(),
    false,
  );
});

Deno.test("origin", () => {
  assertEquals(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).origin, {
    x: 4.2,
    y: -5.3,
  });
});

Deno.test("topLeft", () => {
  assertEquals(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).topLeft, {
    x: 4.2,
    y: -5.3,
  });
});

Deno.test("topRight", () => {
  assertEquals(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).topRight, {
    x: 4.2 + 6.4,
    y: -5.3,
  });
});

Deno.test("bottomLeft", () => {
  assertEquals(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).bottomLeft, {
    x: 4.2,
    y: -5.3 + 7.5,
  });
});

Deno.test("bottomRight", () => {
  assertEquals(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).bottomRight, {
    x: 4.2 + 6.4,
    y: -5.3 + 7.5,
  });
});

Deno.test("size", () => {
  assertEquals(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).size, {
    width: 6.4,
    height: 7.5,
  });
});

Deno.test("isEmpty()", () => {
  assertEquals(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isEmpty(), false);
  assertEquals(Rectangle.fromXYWH(4.2, -5.3, 0, 7.5).isEmpty(), true);
  assertEquals(Rectangle.fromXYWH(4.2, -5.3, 6.4, 0).isEmpty(), true);
});

Deno.test("isEmpty() - invalid", () => {
  assertEquals(Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).isEmpty(), false);
});

Deno.test("isPointContains(PointData)", () => {
  const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.4 }), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.4 }), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.4 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.4 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.4 }), false);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.3 }), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.3 }), true);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.3 }), true);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 }), true);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 }), false);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.2 }), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.2 }), true);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.2 }), true);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.2 }), true);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.2 }), false);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.3 + 7.5 }), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.3 + 7.5 }), true);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.3 + 7.5 }), true);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.5 }), true);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.5 }), false);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.3 + 7.6 }), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.3 + 7.6 }), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.3 + 7.6 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.6 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.6 }), false);
});

Deno.test("isPointContains(PointData) - exclude edge", () => {
  const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.4 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.4 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.4 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.4 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.4 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.3 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.3 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.3 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.2 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.2 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.2 }, true), true);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.2 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.2 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.3 + 7.5 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.3 + 7.5 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.3 + 7.5 }, true), false);
  assertEquals(
    rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.5 }, true),
    false,
  );
  assertEquals(
    rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.5 }, true),
    false,
  );
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.3 + 7.6 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.3 + 7.6 }, true), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.3 + 7.6 }, true), false);
  assertEquals(
    rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.6 }, true),
    false,
  );
  assertEquals(
    rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.6 }, true),
    false,
  );
});

Deno.test("isPointContains(PointData) - invalid", () => {
  const rect = Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.4 }), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.4 }), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.4 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.4 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.4 }), false);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.3 }), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.3 }), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.3 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 }), false);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.2 }), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.2 }), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.2 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.2 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.2 }), false);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.3 + 7.5 }), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.3 + 7.5 }), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.3 + 7.5 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.5 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.5 }), false);
  assertEquals(rect.isPointContains({ x: 4.1, y: -5.3 + 7.6 }), false);
  assertEquals(rect.isPointContains({ x: 4.2, y: -5.3 + 7.6 }), false);
  assertEquals(rect.isPointContains({ x: 4.3, y: -5.3 + 7.6 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.6 }), false);
  assertEquals(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.6 }), false);
});

Deno.test("isPointContains(PointData) - invalid point", () => {
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isPointContains({
      x: NaN,
      y: -5.3,
    }),
    false,
  );
});

Deno.test("isContains(RectangleData)", () => {
  assertEquals(testRect((r0, r1) => [r0.isContains(r1), 1]), {
    CC: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
    CD: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
    CF: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
    DD: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
    DE: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
    DF: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
    FF: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
  });
});

Deno.test("isContains(RectangleData) - exclude edge", () => {
  assertEquals(testRect((r0, r1) => [r0.isContains(r1, true), 1]), {
    DD: { DD: 1, DE: 1 },
    DE: { DD: 1, DE: 1 },
  });
});

Deno.test("isContains(RectangleData) - invalid", () => {
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isContains(
      Rectangle.fromXYWH(4.2 + 0.1, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2),
    ),
    true,
  );
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).isContains(
      Rectangle.fromXYWH(4.2 + 0.1, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2),
    ),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isContains(
      Rectangle.fromXYWH(NaN, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2),
    ),
    false,
  );
});

Deno.test("isIntersects(RectangleData)", () => {
  assertEquals(testRect((r0, r1) => [r0.isIntersects(r1), 1]), {
    AC: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    AD: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    AF: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    AG: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    CC: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    CD: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    CF: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    CG: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    DD: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    DE: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    DF: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    DG: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    FF: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
    FG: {
      AC: 1,
      AD: 1,
      AF: 1,
      AG: 1,
      CC: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
      FF: 1,
      FG: 1,
    },
  });
});

Deno.test("isIntersects(RectangleData) - exclude edge", () => {
  assertEquals(testRect((r0, r1) => [r0.isIntersects(r1, true), 1]), {
    AD: {
      AD: 1,
      AF: 1,
      AG: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
    },
    AF: {
      AD: 1,
      AF: 1,
      AG: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
    },
    AG: {
      AD: 1,
      AF: 1,
      AG: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
    },
    CD: {
      AD: 1,
      AF: 1,
      AG: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
    },
    CF: {
      AD: 1,
      AF: 1,
      AG: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
    },
    CG: {
      AD: 1,
      AF: 1,
      AG: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
    },
    DD: {
      AD: 1,
      AF: 1,
      AG: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
    },
    DE: {
      AD: 1,
      AF: 1,
      AG: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
    },
    DF: {
      AD: 1,
      AF: 1,
      AG: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
    },
    DG: {
      AD: 1,
      AF: 1,
      AG: 1,
      CD: 1,
      CF: 1,
      CG: 1,
      DD: 1,
      DE: 1,
      DF: 1,
      DG: 1,
    },
  });
});

Deno.test("isIntersects(RectangleData) - invalid", () => {
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isIntersects(
      Rectangle.fromXYWH(4.2 + 0.1, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2),
    ),
    true,
  );
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).isIntersects(
      Rectangle.fromXYWH(4.2 + 0.1, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2),
    ),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isIntersects(
      Rectangle.fromXYWH(NaN, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2),
    ),
    false,
  );
});

Deno.test("moveBy(number, number)", () => {
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(1, -1),
    Rectangle.fromXYWH(4.2 + 1, -5.3 + -1, 6.4, 7.5),
  );
  const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);
  assertNotStrictEquals(rect.moveBy(0, 0), rect);
});

Deno.test("moveBy(number, number) - invalid", () => {
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, NaN, 6.4, 7.5).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(NaN, -1).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(1, NaN).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(Infinity, -5.3, 6.4, 7.5).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, Infinity, 6.4, 7.5).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(Infinity, -1).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(1, Infinity).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(-Infinity, -5.3, 6.4, 7.5).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -Infinity, 6.4, 7.5).moveBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(-Infinity, -1).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(1, -Infinity).isValid(),
    false,
  );
});

Deno.test("moveBy(PointData)", () => {
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy({ x: 1, y: -1 }),
    Rectangle.fromXYWH(4.2 + 1, -5.3 + -1, 6.4, 7.5),
  );
  const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);
  assertNotStrictEquals(rect.moveBy({ x: 0, y: 0 }), rect);
});

Deno.test("moveBy(PointData) - invalid", () => {
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).moveBy({ x: 1, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, NaN, 6.4, 7.5).moveBy({ x: 1, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy({ x: NaN, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy({ x: 1, y: NaN }).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(Infinity, -5.3, 6.4, 7.5).moveBy({ x: 1, y: -1 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, Infinity, 6.4, 7.5).moveBy({ x: 1, y: -1 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy({ x: Infinity, y: -1 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy({ x: 1, y: Infinity })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(-Infinity, -5.3, 6.4, 7.5).moveBy({ x: 1, y: -1 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -Infinity, 6.4, 7.5).moveBy({ x: 1, y: -1 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy({ x: -Infinity, y: -1 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy({ x: 1, y: -Infinity })
      .isValid(),
    false,
  );
});

Deno.test("resizeBy(number, number)", () => {
  assertObjectMatch(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy(0.1, -0.2),
    {
      left: 4.2,
      right: 4.2 + (6.4 + 0.1),
      top: -5.3,
      bottom: -5.3 + (7.5 + -0.2),
      width: 6.4 + 0.1,
      height: 7.5 + -0.2,
      x: 4.2,
      y: -5.3,
    },
  );

  const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);
  assertNotStrictEquals(rect.resizeBy(0, 0), rect);
});

Deno.test("resizeBy(number, number) - invalid", () => {
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.4).resizeBy(1, -1).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy(NaN, -1).isValid(),
    false,
  );
});

Deno.test("resizeBy(PointData)", () => {
  assertObjectMatch(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy({ x: 0.1, y: -0.2 }),
    {
      left: 4.2,
      right: 4.2 + (6.4 + 0.1),
      top: -5.3,
      bottom: -5.3 + (7.5 + -0.2),
      width: 6.4 + 0.1,
      height: 7.5 + -0.2,
      x: 4.2,
      y: -5.3,
    },
  );

  const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);
  assertNotStrictEquals(rect.resizeBy({ x: 0, y: 0 }), rect);
});

Deno.test("resizeBy(PointData) - invalid", () => {
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).resizeBy({ x: 1, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy({ x: NaN, y: -1 })
      .isValid(),
    false,
  );
});

Deno.test("resizeBy(SizeData)", () => {
  assertObjectMatch(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy({
      width: 0.1,
      height: 0.2,
    }),
    {
      left: 4.2,
      right: 4.2 + (6.4 + 0.1),
      top: -5.3,
      bottom: -5.3 + (7.5 + 0.2),
      width: 6.4 + 0.1,
      height: 7.5 + 0.2,
      x: 4.2,
      y: -5.3,
    },
  );

  const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);
  assertNotStrictEquals(rect.resizeBy({ width: 0, height: 0 }), rect);
});

Deno.test("resizeBy(SizeData) - invalid", () => {
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).resizeBy({
      width: 0.1,
      height: 0.2,
    }).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy({
      width: NaN,
      height: 0.2,
    }).isValid(),
    false,
  );
});

Deno.test("inset(number, number)", () => {
  assertObjectMatch(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset(0.1, -0.2),
    {
      left: 4.2 + 0.1 / 2,
      right: 4.2 + 0.1 / 2 + (6.4 - 0.1),
      top: -5.3 + -0.2 / 2,
      bottom: -5.3 + -0.2 / 2 + (7.5 - -0.2),
      width: 6.4 - 0.1,
      height: 7.5 - -0.2,
      x: 4.2 + 0.1 / 2,
      y: -5.3 + -0.2 / 2,
    },
  );

  const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);
  assertNotStrictEquals(rect.inset(0, 0), rect);
});

Deno.test("inset(number, number) - invalid", () => {
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.4).inset(1, -1).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset(NaN, -1).isValid(),
    false,
  );
});

Deno.test("inset(PointData)", () => {
  assertObjectMatch(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset({ x: 0.1, y: -0.2 }),
    {
      left: 4.2 + 0.1 / 2,
      right: 4.2 + 0.1 / 2 + (6.4 - 0.1),
      top: -5.3 + -0.2 / 2,
      bottom: -5.3 + -0.2 / 2 + (7.5 - -0.2),
      width: 6.4 - 0.1,
      height: 7.5 - -0.2,
      x: 4.2 + 0.1 / 2,
      y: -5.3 + -0.2 / 2,
    },
  );

  const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);
  assertNotStrictEquals(rect.inset({ x: 0, y: 0 }), rect);
});

Deno.test("inset(PointData) - invalid", () => {
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).inset({ x: 1, y: -1 }).isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset({ x: NaN, y: -1 }).isValid(),
    false,
  );
});

Deno.test("inset(SizeData)", () => {
  assertObjectMatch(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset({ width: 0.1, height: 0.2 }),
    {
      left: 4.2 + 0.1 / 2,
      right: 4.2 + 0.1 / 2 + (6.4 - 0.1),
      top: -5.3 + 0.2 / 2,
      bottom: -5.3 + 0.2 / 2 + (7.5 - 0.2),
      width: 6.4 - 0.1,
      height: 7.5 - 0.2,
      x: 4.2 + 0.1 / 2,
      y: -5.3 + 0.2 / 2,
    },
  );

  const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);
  assertNotStrictEquals(rect.inset({ width: 0, height: 0 }), rect);
});

Deno.test("inset(SizeData) - invalid", () => {
  assertEquals(
    Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).inset({ width: 0.1, height: 0.2 })
      .isValid(),
    false,
  );
  assertEquals(
    Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset({ width: NaN, height: 0.2 })
      .isValid(),
    false,
  );
});
