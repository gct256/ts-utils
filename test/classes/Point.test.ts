import { Point } from '../../src/classes/Point';

describe('static methods', () => {
  test('of', () => {
    expect(Point.of({ x: 4.2, y: -5.3 })).toBeInstanceOf(Point);
    expect(Point.of({ x: 4.2, y: -5.3 })).toEqual({ x: 4.2, y: -5.3 });
  });

  test('fromXY', () => {
    expect(Point.fromXY(4.2, -5.3)).toBeInstanceOf(Point);
    expect(Point.fromXY(4.2, -5.3)).toEqual({ x: 4.2, y: -5.3 });
  });
});

describe('properties', () => {
  test('valid', () => {
    const point = Point.fromXY(4.2, -5.3);

    expect(point.x).toBe(4.2);
    expect(point.y).toBe(-5.3);
  });

  test('invalid', () => {
    const point = Point.fromXY(NaN, -5.3);

    expect(point.x).toBeNaN();
    expect(point.y).toBeNaN();
  });
});

describe('overrides', () => {
  describe('compare', () => {
    test('same parameter', () => {
      expect(Point.fromXY(4.2, -5.3).compare({ x: 4.2, y: -5.3 })).toBe(0);
    });

    test('different x, same y', () => {
      expect(Point.fromXY(4.2, -5.3).compare({ x: 4.3, y: -5.3 })).toBe(-1);
      expect(Point.fromXY(4.2, -5.3).compare({ x: 4.1, y: -5.3 })).toBe(1);
    });

    test('same x, different y', () => {
      expect(Point.fromXY(4.2, -5.3).compare({ x: 4.2, y: -5.2 })).toBe(-1);
      expect(Point.fromXY(4.2, -5.3).compare({ x: 4.2, y: -5.4 })).toBe(1);
    });

    test('different x and y', () => {
      expect(Point.fromXY(4.2, -5.3).compare({ x: 4.3, y: -5.2 })).toBe(-1);
      expect(Point.fromXY(4.2, -5.3).compare({ x: 4.3, y: -5.4 })).toBe(-1);
      expect(Point.fromXY(4.2, -5.3).compare({ x: 4.1, y: -5.2 })).toBe(1);
      expect(Point.fromXY(4.2, -5.3).compare({ x: 4.1, y: -5.4 })).toBe(1);
    });

    test('for invalid', () => {
      expect(Point.fromXY(4.2, -5.3).compare({ x: NaN, y: -5.2 })).toBe(1);
      expect(Point.fromXY(NaN, -5.3).compare({ x: 4.2, y: -5.2 })).toBe(-1);
      expect(Point.fromXY(NaN, -5.3).compare({ x: NaN, y: -5.2 })).toBe(0);
    });
  });

  test('valueOf', () => {
    expect(Point.fromXY(4.2, -5.3).valueOf()).toEqual({ x: 4.2, y: -5.3 });
  });

  test('isValid', () => {
    expect(Point.fromXY(4.2, -5.3).isValid()).toBe(true);

    expect(Point.fromXY(NaN, -5.3).isValid()).toBe(false);
    expect(Point.fromXY(Infinity, -5.3).isValid()).toBe(false);
    expect(Point.fromXY(-Infinity, -5.3).isValid()).toBe(false);

    expect(Point.fromXY(4.2, NaN).isValid()).toBe(false);
    expect(Point.fromXY(4.2, Infinity).isValid()).toBe(false);
    expect(Point.fromXY(4.2, -Infinity).isValid()).toBe(false);
  });
});

describe('methods', () => {
  describe('moveBy(x, y)', () => {
    test('for valid', () => {
      expect(Point.fromXY(4.2, -5.3).moveBy(1, -1)).toBeInstanceOf(Point);
      expect(Point.fromXY(4.2, -5.3).moveBy(1, -1)).toEqual({
        x: 5.2,
        y: -6.3
      });

      const point = Point.fromXY(4.2, -5.3);

      expect(point.moveBy(0, 0)).not.toBe(point);
    });

    test('for invalid', () => {
      expect(Point.fromXY(NaN, -5.3).moveBy(1, -1).isValid()).toBe(false);
      expect(Point.fromXY(4.2, NaN).moveBy(1, -1).isValid()).toBe(false);
      expect(Point.fromXY(4.2, -5.3).moveBy(NaN, -1).isValid()).toBe(false);
      expect(Point.fromXY(4.2, -5.3).moveBy(1, NaN).isValid()).toBe(false);

      expect(Point.fromXY(Infinity, -5.3).moveBy(1, -1).isValid()).toBe(false);
      expect(Point.fromXY(4.2, Infinity).moveBy(1, -1).isValid()).toBe(false);
      expect(Point.fromXY(4.2, -5.3).moveBy(Infinity, -1).isValid()).toBe(
        false
      );
      expect(Point.fromXY(4.2, -5.3).moveBy(1, Infinity).isValid()).toBe(false);

      expect(Point.fromXY(-Infinity, -5.3).moveBy(1, -1).isValid()).toBe(false);
      expect(Point.fromXY(4.2, -Infinity).moveBy(1, -1).isValid()).toBe(false);
      expect(Point.fromXY(4.2, -5.3).moveBy(-Infinity, -1).isValid()).toBe(
        false
      );
      expect(Point.fromXY(4.2, -5.3).moveBy(1, -Infinity).isValid()).toBe(
        false
      );
    });
  });

  describe('moveBy(point)', () => {
    test('for valid', () => {
      expect(Point.fromXY(4.2, -5.3).moveBy({ x: 1, y: -1 })).toBeInstanceOf(
        Point
      );
      expect(Point.fromXY(4.2, -5.3).moveBy({ x: 1, y: -1 })).toEqual({
        x: 5.2,
        y: -6.3
      });

      const point = Point.fromXY(4.2, -5.3);

      expect(point.moveBy({ x: 0, y: 0 })).not.toBe(point);
    });

    test('for invalid', () => {
      expect(Point.fromXY(NaN, -5.3).moveBy({ x: 1, y: -1 }).isValid()).toBe(
        false
      );
      expect(Point.fromXY(4.2, NaN).moveBy({ x: 1, y: -1 }).isValid()).toBe(
        false
      );
      expect(Point.fromXY(4.2, -5.3).moveBy({ x: NaN, y: -1 }).isValid()).toBe(
        false
      );
      expect(Point.fromXY(4.2, -5.3).moveBy({ x: 1, y: NaN }).isValid()).toBe(
        false
      );

      expect(
        Point.fromXY(Infinity, -5.3).moveBy({ x: 1, y: -1 }).isValid()
      ).toBe(false);
      expect(
        Point.fromXY(4.2, Infinity).moveBy({ x: 1, y: -1 }).isValid()
      ).toBe(false);
      expect(
        Point.fromXY(4.2, -5.3).moveBy({ x: Infinity, y: -1 }).isValid()
      ).toBe(false);
      expect(
        Point.fromXY(4.2, -5.3).moveBy({ x: 1, y: Infinity }).isValid()
      ).toBe(false);

      expect(
        Point.fromXY(-Infinity, -5.3).moveBy({ x: 1, y: -1 }).isValid()
      ).toBe(false);
      expect(
        Point.fromXY(4.2, -Infinity).moveBy({ x: 1, y: -1 }).isValid()
      ).toBe(false);
      expect(
        Point.fromXY(4.2, -5.3).moveBy({ x: -Infinity, y: -1 }).isValid()
      ).toBe(false);
      expect(
        Point.fromXY(4.2, -5.3).moveBy({ x: 1, y: -Infinity }).isValid()
      ).toBe(false);
    });
  });

  describe('getDistanceFromOrigin', () => {
    test('for valid', () => {
      expect(Point.fromXY(4.2, -5.3).getDistanceFromOrigin()).toBe(
        Math.sqrt(4.2 ** 2 + (-5.3) ** 2)
      );
      expect(Point.fromXY(4.2, -5.3).getDistanceFromOrigin(true)).toBe(
        4.2 ** 2 + (-5.3) ** 2
      );
    });

    test('for invalid', () => {
      expect(Point.fromXY(NaN, -5.3).getDistanceFromOrigin()).toBeNaN();
      expect(Point.fromXY(4.2, NaN).getDistanceFromOrigin()).toBeNaN();

      expect(Point.fromXY(Infinity, -5.3).getDistanceFromOrigin()).toBeNaN();
      expect(Point.fromXY(4.2, Infinity).getDistanceFromOrigin()).toBeNaN();

      expect(Point.fromXY(-Infinity, -5.3).getDistanceFromOrigin()).toBeNaN();
      expect(Point.fromXY(4.2, -Infinity).getDistanceFromOrigin()).toBeNaN();
    });
  });

  describe('getDistance', () => {
    test('for valid', () => {
      expect(Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(6.4, -7.5))).toBe(
        Math.sqrt((4.2 - 6.4) ** 2 + (-5.3 - -7.5) ** 2)
      );
      expect(
        Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(6.4, -7.5), true)
      ).toBe((4.2 - 6.4) ** 2 + (-5.3 - -7.5) ** 2);
    });

    test('for invalid', () => {
      expect(
        Point.fromXY(NaN, -5.3).getDistance(Point.fromXY(6.4, -7.5))
      ).toBeNaN();
      expect(
        Point.fromXY(4.2, NaN).getDistance(Point.fromXY(6.4, -7.5))
      ).toBeNaN();
      expect(
        Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(NaN, -7.5))
      ).toBeNaN();
      expect(
        Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(6.4, NaN))
      ).toBeNaN();

      expect(
        Point.fromXY(Infinity, -5.3).getDistance(Point.fromXY(6.4, -7.5))
      ).toBeNaN();
      expect(
        Point.fromXY(4.2, Infinity).getDistance(Point.fromXY(6.4, -7.5))
      ).toBeNaN();
      expect(
        Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(Infinity, -7.5))
      ).toBeNaN();
      expect(
        Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(6.4, Infinity))
      ).toBeNaN();

      expect(
        Point.fromXY(-Infinity, -5.3).getDistance(Point.fromXY(6.4, -7.5))
      ).toBeNaN();
      expect(
        Point.fromXY(4.2, -Infinity).getDistance(Point.fromXY(6.4, -7.5))
      ).toBeNaN();
      expect(
        Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(-Infinity, -7.5))
      ).toBeNaN();
      expect(
        Point.fromXY(4.2, -5.3).getDistance(Point.fromXY(6.4, -Infinity))
      ).toBeNaN();
    });
  });
});
