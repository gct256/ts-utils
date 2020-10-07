import { Rectangle } from '../../src/classes/Rectangle';

const TEST_PAIRS = [
  'AA',
  'AB',
  'AC',
  'AD',
  'AF',
  'AG',
  'CC',
  'CD',
  'CF',
  'CG',
  'DD',
  'DE',
  'DF',
  'DG',
  'FF',
  'FG',
  'GH'
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
  H: 4.4
};

const makeTestRect = (px: TestPair, py: TestPair): Rectangle => {
  return Rectangle.fromPointPair(
    {
      x: TEST_POINT_MAP[px.slice(0, 1)],
      y: TEST_POINT_MAP[py.slice(0, 1)]
    },
    {
      x: TEST_POINT_MAP[px.slice(1, 2)],
      y: TEST_POINT_MAP[py.slice(1, 2)]
    }
  );
};

const testRect = <T>(
  callback: (r0: Rectangle, r1: Rectangle) => [boolean, T]
): TestResult<T> => {
  const result: TestResult<T> = {};
  const target = makeTestRect('CF', 'CF');

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

describe('static methods', () => {
  describe('of', () => {
    test('full parameter', () => {
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: -6.4,
          bottom: 7.5,

          width: 5.3 - 4.2,
          height: 7.5 - -6.4,

          x: 4.2,
          y: -6.4
        })
      ).toBeInstanceOf(Rectangle);
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: -6.4,
          bottom: 7.5,

          width: 5.3 - 4.2,
          height: 7.5 - -6.4,

          x: 4.2,
          y: -6.4
        })
      ).toEqual({
        left: 4.2,
        right: 5.3,
        top: -6.4,
        bottom: 7.5,

        width: 5.3 - 4.2,
        height: 7.5 - -6.4,

        x: 4.2,
        y: -6.4
      });
    });

    test('less parameter', () => {
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: -6.4,
          bottom: 7.5
        })
      ).toBeInstanceOf(Rectangle);
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: -6.4,
          bottom: 7.5
        })
      ).toEqual({
        left: 4.2,
        right: 5.3,
        top: -6.4,
        bottom: 7.5,

        width: 5.3 - 4.2,
        height: 7.5 - -6.4,

        x: 4.2,
        y: -6.4
      });
    });
  });

  test('fromXYWH', () => {
    expect(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)).toBeInstanceOf(Rectangle);
    expect(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)).toEqual({
      left: 4.2,
      right: 4.2 + 6.4,
      top: -5.3,
      bottom: -5.3 + 7.5,

      width: 6.4,
      height: 7.5,

      x: 4.2,
      y: -5.3
    });
  });

  test('fromPointPair', () => {
    expect(
      Rectangle.fromPointPair({ x: 4.2, y: -6.4 }, { x: 5.3, y: 7.5 })
    ).toBeInstanceOf(Rectangle);
    expect(
      Rectangle.fromPointPair({ x: 4.2, y: -6.4 }, { x: 5.3, y: 7.5 })
    ).toEqual({
      left: 4.2,
      right: 5.3,
      top: -6.4,
      bottom: 7.5,

      width: 5.3 - 4.2,
      height: 7.5 - -6.4,

      x: 4.2,
      y: -6.4
    });

    const rect = Rectangle.fromPointPair(
      { x: 4.2, y: -6.4 },
      { x: 5.3, y: 7.5 }
    );

    expect(
      Rectangle.fromPointPair({ x: 5.3, y: -6.4 }, { x: 4.2, y: 7.5 })
    ).toEqual(rect);
    expect(
      Rectangle.fromPointPair({ x: 4.2, y: 7.5 }, { x: 5.3, y: -6.4 })
    ).toEqual(rect);
    expect(
      Rectangle.fromPointPair({ x: 5.3, y: 7.5 }, { x: 4.2, y: -6.4 })
    ).toEqual(rect);
  });
});

describe('properties', () => {
  test('valid', () => {
    const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);

    expect(rect.left).toBe(4.2);
    expect(rect.right).toBe(4.2 + 6.4);
    expect(rect.top).toBe(-5.3);
    expect(rect.bottom).toBe(-5.3 + 7.5);
    expect(rect.width).toBe(6.4);
    expect(rect.height).toBe(7.5);
    expect(rect.x).toBe(4.2);
    expect(rect.y).toBe(-5.3);
  });

  test('invalid', () => {
    const rect = Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5);

    expect(rect.left).toBeNaN();
    expect(rect.right).toBeNaN();
    expect(rect.top).toBeNaN();
    expect(rect.bottom).toBeNaN();
    expect(rect.width).toBeNaN();
    expect(rect.height).toBeNaN();
    expect(rect.x).toBeNaN();
    expect(rect.y).toBeNaN();
  });
});

describe('overrides', () => {
  describe('compare', () => {
    test('same', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
        )
      ).toBe(0);
    });

    test('difference left', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(4.3, -5.3, 6.4, 7.5)
        )
      ).toBe(-1);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(4.1, -5.3, 6.4, 7.5)
        )
      ).toBe(1);
    });

    test('difference top', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(4.2, -5.2, 6.4, 7.5)
        )
      ).toBe(-1);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(4.2, -5.4, 6.4, 7.5)
        )
      ).toBe(1);
    });

    test('difference width', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(4.2, -5.3, 6.5, 7.5)
        )
      ).toBe(-1);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(4.2, -5.3, 6.3, 7.5)
        )
      ).toBe(1);
    });

    test('difference height', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.6)
        )
      ).toBe(-1);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.4)
        )
      ).toBe(1);
    });

    test('invalid', () => {
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
        )
      ).toBe(-1);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5)
        )
      ).toBe(1);
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).compare(
          Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5)
        )
      ).toBe(0);
    });
  });

  test('valueOf', () => {
    expect(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).valueOf()).toEqual({
      left: 4.2,
      right: 4.2 + 6.4,
      top: -5.3,
      bottom: -5.3 + 7.5,
      width: 6.4,
      height: 7.5,
      x: 4.2,
      y: -5.3
    });
  });

  describe('invalid', () => {
    test('normal', () => {
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: -6.4,
          bottom: 7.5
        }).isValid()
      ).toBe(true);
    });

    test('empty', () => {
      expect(
        Rectangle.of({
          left: 4.2,
          right: 4.2,
          top: -6.4,
          bottom: 7.5
        }).isValid()
      ).toBe(true);
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: -6.4,
          bottom: -6.4
        }).isValid()
      ).toBe(true);
    });

    test('width < 0', () => {
      expect(
        Rectangle.of({
          left: 4.2,
          right: -5.3,
          top: -6.4,
          bottom: 7.5
        }).isValid()
      ).toBe(false);
    });

    test('height < 0', () => {
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: 6.4,
          bottom: -7.5
        }).isValid()
      ).toBe(false);
    });

    test('NaN', () => {
      expect(
        Rectangle.of({
          left: NaN,
          right: 5.3,
          top: -6.4,
          bottom: 7.5
        }).isValid()
      ).toBe(false);
      expect(
        Rectangle.of({
          left: 4.2,
          right: NaN,
          top: -6.4,
          bottom: 7.5
        }).isValid()
      ).toBe(false);
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: NaN,
          bottom: 7.5
        }).isValid()
      ).toBe(false);
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: -6.4,
          bottom: NaN
        }).isValid()
      ).toBe(false);
    });

    test('Infinity', () => {
      expect(
        Rectangle.of({
          left: Infinity,
          right: 5.3,
          top: -6.4,
          bottom: 7.5
        }).isValid()
      ).toBe(false);
      expect(
        Rectangle.of({
          left: 4.2,
          right: Infinity,
          top: -6.4,
          bottom: 7.5
        }).isValid()
      ).toBe(false);
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: Infinity,
          bottom: 7.5
        }).isValid()
      ).toBe(false);
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: -6.4,
          bottom: Infinity
        }).isValid()
      ).toBe(false);
    });

    test('-Infinity', () => {
      expect(
        Rectangle.of({
          left: -Infinity,
          right: 5.3,
          top: -6.4,
          bottom: 7.5
        }).isValid()
      ).toBe(false);
      expect(
        Rectangle.of({
          left: 4.2,
          right: -Infinity,
          top: -6.4,
          bottom: 7.5
        }).isValid()
      ).toBe(false);
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: -Infinity,
          bottom: 7.5
        }).isValid()
      ).toBe(false);
      expect(
        Rectangle.of({
          left: 4.2,
          right: 5.3,
          top: -6.4,
          bottom: -Infinity
        }).isValid()
      ).toBe(false);
    });
  });
});

describe('methods', () => {
  describe('isEmpty', () => {
    test('normal', () => {
      expect(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isEmpty()).toBe(false);
      expect(Rectangle.fromXYWH(4.2, -5.3, 0, 7.5).isEmpty()).toBe(true);
      expect(Rectangle.fromXYWH(4.2, -5.3, 6.4, 0).isEmpty()).toBe(true);
    });

    test('invalid', () => {
      expect(Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).isEmpty()).toBe(false);
    });
  });

  describe('isPointContains', () => {
    test('normal', () => {
      const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);

      expect(rect.isPointContains({ x: 4.1, y: -5.4 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.4 })).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.4 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.4 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.4 })).toBe(false);

      expect(rect.isPointContains({ x: 4.1, y: -5.3 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.3 })).toBe(true);
      expect(rect.isPointContains({ x: 4.3, y: -5.3 })).toBe(true);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 })).toBe(true);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 })).toBe(false);

      expect(rect.isPointContains({ x: 4.1, y: -5.2 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.2 })).toBe(true);
      expect(rect.isPointContains({ x: 4.3, y: -5.2 })).toBe(true);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.2 })).toBe(true);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.2 })).toBe(false);

      expect(rect.isPointContains({ x: 4.1, y: -5.3 + 7.5 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.3 + 7.5 })).toBe(true);
      expect(rect.isPointContains({ x: 4.3, y: -5.3 + 7.5 })).toBe(true);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.5 })).toBe(true);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.5 })).toBe(false);

      expect(rect.isPointContains({ x: 4.1, y: -5.3 + 7.6 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.3 + 7.6 })).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.3 + 7.6 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.6 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.6 })).toBe(false);
    });

    test('exclude edge', () => {
      const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);

      expect(rect.isPointContains({ x: 4.1, y: -5.4 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.4 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.4 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.4 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.4 }, true)).toBe(false);

      expect(rect.isPointContains({ x: 4.1, y: -5.3 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.3 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.3 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 }, true)).toBe(false);

      expect(rect.isPointContains({ x: 4.1, y: -5.2 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.2 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.2 }, true)).toBe(true);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.2 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.2 }, true)).toBe(false);

      expect(rect.isPointContains({ x: 4.1, y: -5.3 + 7.5 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.3 + 7.5 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.3 + 7.5 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.5 }, true)).toBe(
        false
      );
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.5 }, true)).toBe(
        false
      );

      expect(rect.isPointContains({ x: 4.1, y: -5.3 + 7.6 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.3 + 7.6 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.3 + 7.6 }, true)).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.6 }, true)).toBe(
        false
      );
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.6 }, true)).toBe(
        false
      );
    });

    test('invalid', () => {
      const rect = Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5);

      expect(rect.isPointContains({ x: 4.1, y: -5.4 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.4 })).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.4 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.4 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.4 })).toBe(false);

      expect(rect.isPointContains({ x: 4.1, y: -5.3 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.3 })).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.3 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 })).toBe(false);

      expect(rect.isPointContains({ x: 4.1, y: -5.2 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.2 })).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.2 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.2 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.2 })).toBe(false);

      expect(rect.isPointContains({ x: 4.1, y: -5.3 + 7.5 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.3 + 7.5 })).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.3 + 7.5 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.5 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.5 })).toBe(false);

      expect(rect.isPointContains({ x: 4.1, y: -5.3 + 7.6 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2, y: -5.3 + 7.6 })).toBe(false);
      expect(rect.isPointContains({ x: 4.3, y: -5.3 + 7.6 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.4, y: -5.3 + 7.6 })).toBe(false);
      expect(rect.isPointContains({ x: 4.2 + 6.5, y: -5.3 + 7.6 })).toBe(false);
    });

    test('invalid point', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isPointContains({
          x: NaN,
          y: -5.3
        })
      ).toBe(false);
    });
  });

  describe('isContains', () => {
    test('normal', () => {
      expect(testRect((r0, r1) => [r0.isContains(r1), 1])).toEqual({
        CC: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
        CD: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
        CF: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
        DD: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
        DE: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
        DF: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 },
        FF: { CC: 1, CD: 1, CF: 1, DD: 1, DE: 1, DF: 1, FF: 1 }
      });
    });

    test('exclude edge', () => {
      expect(testRect((r0, r1) => [r0.isContains(r1, true), 1])).toEqual({
        DD: { DD: 1, DE: 1 },
        DE: { DD: 1, DE: 1 }
      });
    });

    test('invalid', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isContains(
          Rectangle.fromXYWH(4.2 + 0.1, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2)
        )
      ).toBe(true);
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).isContains(
          Rectangle.fromXYWH(4.2 + 0.1, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2)
        )
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isContains(
          Rectangle.fromXYWH(NaN, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2)
        )
      ).toBe(false);
    });
  });

  describe('isIntersects', () => {
    test('normal', () => {
      expect(testRect((r0, r1) => [r0.isIntersects(r1), 1])).toEqual(
        // prettier-ignore
        {
          AC: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          AD: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          AF: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          AG: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          CC: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          CD: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          CF: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          CG: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          DD: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          DE: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          DF: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          DG: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          FF: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
          FG: { AC: 1, AD: 1, AF: 1, AG: 1, CC: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, FF: 1, FG: 1 },
        }
      );
    });

    test('exclude edge', () => {
      expect(testRect((r0, r1) => [r0.isIntersects(r1, true), 1])).toEqual(
        // prettier-ignore
        {
          AD: { AD: 1, AF: 1, AG: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, },
          AF: { AD: 1, AF: 1, AG: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, },
          AG: { AD: 1, AF: 1, AG: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, },
          CD: { AD: 1, AF: 1, AG: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, },
          CF: { AD: 1, AF: 1, AG: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, },
          CG: { AD: 1, AF: 1, AG: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, },
          DD: { AD: 1, AF: 1, AG: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, },
          DE: { AD: 1, AF: 1, AG: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, },
          DF: { AD: 1, AF: 1, AG: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, },
          DG: { AD: 1, AF: 1, AG: 1, CD: 1, CF: 1, CG: 1, DD: 1, DE: 1, DF: 1, DG: 1, },
        }
      );
    });

    test('invalid', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isIntersects(
          Rectangle.fromXYWH(4.2 + 0.1, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2)
        )
      ).toBe(true);
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).isIntersects(
          Rectangle.fromXYWH(4.2 + 0.1, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2)
        )
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).isIntersects(
          Rectangle.fromXYWH(NaN, -5.3 + 0.1, 6.4 - 0.2, 7.5 - 0.2)
        )
      ).toBe(false);
    });
  });

  describe('moveBy(x, y)', () => {
    test('for valid', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(1, -1)
      ).toBeInstanceOf(Rectangle);
      expect(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(1, -1)).toEqual({
        left: 4.2 + 1,
        right: 4.2 + 6.4 + 1,
        top: -5.3 + -1,
        bottom: -5.3 + 7.5 + -1,
        width: 6.4,
        height: 7.5,
        x: 4.2 + 1,
        y: -5.3 + -1
      });

      const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);

      expect(rect.moveBy(0, 0)).not.toBe(rect);
    });

    test('for invalid', () => {
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).moveBy(1, -1).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, NaN, 6.4, 7.5).moveBy(1, -1).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(NaN, -1).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(1, NaN).isValid()
      ).toBe(false);

      expect(
        Rectangle.fromXYWH(Infinity, -5.3, 6.4, 7.5).moveBy(1, -1).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, Infinity, 6.4, 7.5).moveBy(1, -1).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(Infinity, -1).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(1, Infinity).isValid()
      ).toBe(false);

      expect(
        Rectangle.fromXYWH(-Infinity, -5.3, 6.4, 7.5).moveBy(1, -1).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -Infinity, 6.4, 7.5).moveBy(1, -1).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(-Infinity, -1).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy(1, -Infinity).isValid()
      ).toBe(false);
    });
  });

  describe('moveBy(point)', () => {
    test('for valid', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy({ x: 1, y: -1 })
      ).toBeInstanceOf(Rectangle);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).moveBy({ x: 1, y: -1 })
      ).toEqual({
        left: 4.2 + 1,
        right: 4.2 + 6.4 + 1,
        top: -5.3 + -1,
        bottom: -5.3 + 7.5 + -1,
        width: 6.4,
        height: 7.5,
        x: 4.2 + 1,
        y: -5.3 + -1
      });

      const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);

      expect(rect.moveBy({ x: 0, y: 0 })).not.toBe(rect);
    });

    test('for invalid', () => {
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5)
          .moveBy({ x: 1, y: -1 })
          .isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, NaN, 6.4, 7.5).moveBy({ x: 1, y: -1 }).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
          .moveBy({ x: NaN, y: -1 })
          .isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
          .moveBy({ x: 1, y: NaN })
          .isValid()
      ).toBe(false);

      expect(
        Rectangle.fromXYWH(Infinity, -5.3, 6.4, 7.5)
          .moveBy({ x: 1, y: -1 })
          .isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, Infinity, 6.4, 7.5)
          .moveBy({ x: 1, y: -1 })
          .isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
          .moveBy({ x: Infinity, y: -1 })
          .isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
          .moveBy({ x: 1, y: Infinity })
          .isValid()
      ).toBe(false);

      expect(
        Rectangle.fromXYWH(-Infinity, -5.3, 6.4, 7.5)
          .moveBy({ x: 1, y: -1 })
          .isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -Infinity, 6.4, 7.5)
          .moveBy({ x: 1, y: -1 })
          .isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
          .moveBy({ x: -Infinity, y: -1 })
          .isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
          .moveBy({ x: 1, y: -Infinity })
          .isValid()
      ).toBe(false);
    });
  });

  describe('resizeBy(number, number)', () => {
    test('for valid', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy(0.1, -0.2)
      ).toBeInstanceOf(Rectangle);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy(0.1, -0.2)
      ).toEqual({
        left: 4.2,
        right: 4.2 + (6.4 + 0.1),
        top: -5.3,
        bottom: -5.3 + (7.5 + -0.2),
        width: 6.4 + 0.1,
        height: 7.5 + -0.2,
        x: 4.2,
        y: -5.3
      });

      const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);

      expect(rect.resizeBy(0, 0)).not.toBe(rect);
    });

    test('for invalid', () => {
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.4).resizeBy(1, -1).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy(NaN, -1).isValid()
      ).toBe(false);
    });
  });

  describe('resizeBy(Point)', () => {
    test('for valid', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy({ x: 0.1, y: -0.2 })
      ).toBeInstanceOf(Rectangle);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy({ x: 0.1, y: -0.2 })
      ).toEqual({
        left: 4.2,
        right: 4.2 + (6.4 + 0.1),
        top: -5.3,
        bottom: -5.3 + (7.5 + -0.2),
        width: 6.4 + 0.1,
        height: 7.5 + -0.2,
        x: 4.2,
        y: -5.3
      });

      const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);

      expect(rect.resizeBy({ x: 0, y: 0 })).not.toBe(rect);
    });

    test('for invalid', () => {
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5)
          .resizeBy({ x: 1, y: -1 })
          .isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
          .resizeBy({ x: NaN, y: -1 })
          .isValid()
      ).toBe(false);
    });
  });

  describe('resizeBy(Size)', () => {
    test('for valid', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy({
          width: 0.1,
          height: 0.2
        })
      ).toBeInstanceOf(Rectangle);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).resizeBy({
          width: 0.1,
          height: 0.2
        })
      ).toEqual({
        left: 4.2,
        right: 4.2 + (6.4 + 0.1),
        top: -5.3,
        bottom: -5.3 + (7.5 + 0.2),
        width: 6.4 + 0.1,
        height: 7.5 + 0.2,
        x: 4.2,
        y: -5.3
      });

      const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);

      expect(rect.resizeBy({ width: 0, height: 0 })).not.toBe(rect);
    });

    test('for invalid', () => {
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5)
          .resizeBy({ width: 0.1, height: 0.2 })
          .isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
          .resizeBy({ width: NaN, height: 0.2 })
          .isValid()
      ).toBe(false);
    });
  });

  describe('inset(number, number)', () => {
    test('for valid', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset(0.1, -0.2)
      ).toBeInstanceOf(Rectangle);
      expect(Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset(0.1, -0.2)).toEqual({
        left: 4.2 + 0.1 / 2,
        right: 4.2 + 0.1 / 2 + (6.4 - 0.1),
        top: -5.3 + -0.2 / 2,
        bottom: -5.3 + -0.2 / 2 + (7.5 - -0.2),
        width: 6.4 - 0.1,
        height: 7.5 - -0.2,
        x: 4.2 + 0.1 / 2,
        y: -5.3 + -0.2 / 2
      });

      const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);

      expect(rect.inset(0, 0)).not.toBe(rect);
    });

    test('for invalid', () => {
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.4).inset(1, -1).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset(NaN, -1).isValid()
      ).toBe(false);
    });
  });

  describe('inset(Point)', () => {
    test('for valid', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset({ x: 0.1, y: -0.2 })
      ).toBeInstanceOf(Rectangle);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset({ x: 0.1, y: -0.2 })
      ).toEqual({
        left: 4.2 + 0.1 / 2,
        right: 4.2 + 0.1 / 2 + (6.4 - 0.1),
        top: -5.3 + -0.2 / 2,
        bottom: -5.3 + -0.2 / 2 + (7.5 - -0.2),
        width: 6.4 - 0.1,
        height: 7.5 - -0.2,
        x: 4.2 + 0.1 / 2,
        y: -5.3 + -0.2 / 2
      });

      const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);

      expect(rect.inset({ x: 0, y: 0 })).not.toBe(rect);
    });

    test('for invalid', () => {
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5).inset({ x: 1, y: -1 }).isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
          .inset({ x: NaN, y: -1 })
          .isValid()
      ).toBe(false);
    });
  });

  describe('inset(Size)', () => {
    test('for valid', () => {
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset({
          width: 0.1,
          height: 0.2
        })
      ).toBeInstanceOf(Rectangle);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5).inset({
          width: 0.1,
          height: 0.2
        })
      ).toEqual({
        left: 4.2 + 0.1 / 2,
        right: 4.2 + 0.1 / 2 + (6.4 - 0.1),
        top: -5.3 + 0.2 / 2,
        bottom: -5.3 + 0.2 / 2 + (7.5 - 0.2),
        width: 6.4 - 0.1,
        height: 7.5 - 0.2,
        x: 4.2 + 0.1 / 2,
        y: -5.3 + 0.2 / 2
      });

      const rect = Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5);

      expect(rect.inset({ width: 0, height: 0 })).not.toBe(rect);
    });

    test('for invalid', () => {
      expect(
        Rectangle.fromXYWH(NaN, -5.3, 6.4, 7.5)
          .inset({ width: 0.1, height: 0.2 })
          .isValid()
      ).toBe(false);
      expect(
        Rectangle.fromXYWH(4.2, -5.3, 6.4, 7.5)
          .inset({ width: NaN, height: 0.2 })
          .isValid()
      ).toBe(false);
    });
  });
});
