import { Size } from '../../src/classes/Size';

describe('static methods', () => {
  test('of', () => {
    expect(Size.of({ width: 4.2, height: 5.3 })).toBeInstanceOf(Size);
    expect(Size.of({ width: 4.2, height: 5.3 })).toEqual({
      width: 4.2,
      height: 5.3
    });
  });

  test('fromXY', () => {
    expect(Size.fromWH(4.2, 5.3)).toBeInstanceOf(Size);
    expect(Size.fromWH(4.2, 5.3)).toEqual({ width: 4.2, height: 5.3 });
  });
});

describe('properties', () => {
  test('valid', () => {
    const size = Size.fromWH(4.2, 5.3);

    expect(size.width).toBe(4.2);
    expect(size.height).toBe(5.3);
  });

  test('invalid', () => {
    const size = Size.fromWH(NaN, 5.3);

    expect(size.width).toBeNaN();
    expect(size.height).toBeNaN();
  });
});

describe('overrides', () => {
  describe('compare', () => {
    test('same parameter', () => {
      expect(Size.fromWH(4.2, 5.3).compare({ width: 4.2, height: 5.3 })).toBe(
        0
      );
    });

    test('different width, same height', () => {
      expect(Size.fromWH(4.2, 5.3).compare({ width: 4.3, height: 5.3 })).toBe(
        -1
      );
      expect(Size.fromWH(4.2, 5.3).compare({ width: 4.1, height: 5.3 })).toBe(
        1
      );
    });

    test('same width, different height', () => {
      expect(Size.fromWH(4.2, 5.3).compare({ width: 4.2, height: 5.4 })).toBe(
        -1
      );
      expect(Size.fromWH(4.2, 5.3).compare({ width: 4.2, height: 5.2 })).toBe(
        1
      );
    });

    test('different width and height', () => {
      expect(Size.fromWH(4.2, 5.3).compare({ width: 4.3, height: 5.2 })).toBe(
        -1
      );
      expect(Size.fromWH(4.2, 5.3).compare({ width: 4.3, height: 5.4 })).toBe(
        -1
      );
      expect(Size.fromWH(4.2, 5.3).compare({ width: 4.1, height: 5.2 })).toBe(
        1
      );
      expect(Size.fromWH(4.2, 5.3).compare({ width: 4.1, height: 5.4 })).toBe(
        1
      );
    });

    test('for invalid', () => {
      expect(Size.fromWH(4.2, 5.3).compare({ width: NaN, height: 5.2 })).toBe(
        1
      );
      expect(Size.fromWH(NaN, 5.3).compare({ width: 4.2, height: 5.2 })).toBe(
        -1
      );
      expect(Size.fromWH(NaN, 5.3).compare({ width: NaN, height: 5.2 })).toBe(
        0
      );
    });
  });

  test('valueOf', () => {
    expect(Size.fromWH(4.2, 5.3).valueOf()).toEqual({
      width: 4.2,
      height: 5.3
    });
  });

  test('isValid', () => {
    expect(Size.fromWH(4.2, 5.3).isValid()).toBe(true);

    expect(Size.fromWH(NaN, 5.3).isValid()).toBe(false);
    expect(Size.fromWH(Infinity, 5.3).isValid()).toBe(false);
    expect(Size.fromWH(-Infinity, 5.3).isValid()).toBe(false);

    expect(Size.fromWH(4.2, NaN).isValid()).toBe(false);
    expect(Size.fromWH(4.2, Infinity).isValid()).toBe(false);
    expect(Size.fromWH(4.2, -Infinity).isValid()).toBe(false);
  });
});

describe('methods', () => {
  test('isEmpty', () => {
    expect(Size.fromWH(4.2, 5.3).isEmpty()).toBe(false);

    expect(Size.fromWH(0, 5.3).isEmpty()).toBe(true);
    expect(Size.fromWH(4.2, 0).isEmpty()).toBe(true);
    expect(Size.fromWH(0, 0).isEmpty()).toBe(true);

    expect(Size.fromWH(NaN, 5.3).isEmpty()).toBe(false);
  });

  describe('resizeBy(number, number)', () => {
    test('for valid', () => {
      expect(Size.fromWH(4.2, 5.3).resizeBy(0.1, -0.2)).toBeInstanceOf(Size);
      expect(Size.fromWH(4.2, 5.3).resizeBy(0.1, -0.2)).toEqual({
        width: 4.2 + 0.1,
        height: 5.3 + -0.2
      });

      const size = Size.fromWH(4.2, 5.3);

      expect(size.resizeBy(0, 0)).not.toBe(size);
    });

    test('for invalid', () => {
      expect(Size.fromWH(NaN, 5.3).resizeBy(1, -1).isValid()).toBe(false);
      expect(Size.fromWH(4.2, 5.3).resizeBy(NaN, -1).isValid()).toBe(false);
    });
  });

  describe('resizeBy(Point)', () => {
    test('for valid', () => {
      expect(
        Size.fromWH(4.2, 5.3).resizeBy({ x: 0.1, y: -0.2 })
      ).toBeInstanceOf(Size);
      expect(Size.fromWH(4.2, 5.3).resizeBy({ x: 0.1, y: -0.2 })).toEqual({
        width: 4.2 + 0.1,
        height: 5.3 + -0.2
      });

      const size = Size.fromWH(4.2, 5.3);

      expect(size.resizeBy({ x: 0, y: 0 })).not.toBe(size);
    });

    test('for invalid', () => {
      expect(Size.fromWH(NaN, 5.3).resizeBy({ x: 1, y: -1 }).isValid()).toBe(
        false
      );
      expect(Size.fromWH(4.2, 5.3).resizeBy({ x: NaN, y: -1 }).isValid()).toBe(
        false
      );
    });
  });

  describe('resizeBy(Size)', () => {
    test('for valid', () => {
      expect(
        Size.fromWH(4.2, 5.3).resizeBy({ width: 0.1, height: 0.2 })
      ).toBeInstanceOf(Size);
      expect(
        Size.fromWH(4.2, 5.3).resizeBy({ width: 0.1, height: 0.2 })
      ).toEqual({
        width: 4.2 + 0.1,
        height: 5.3 + 0.2
      });

      const size = Size.fromWH(4.2, 5.3);

      expect(size.resizeBy({ width: 0, height: 0 })).not.toBe(size);
    });

    test('for invalid', () => {
      expect(
        Size.fromWH(NaN, 5.3).resizeBy({ width: 0.1, height: 0.2 }).isValid()
      ).toBe(false);
      expect(
        Size.fromWH(4.2, 5.3).resizeBy({ width: NaN, height: 0.2 }).isValid()
      ).toBe(false);
    });
  });
});
