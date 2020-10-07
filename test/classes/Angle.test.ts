import { Angle } from '../../src/classes/Angle';

const RAD_42 = 42 * (Math.PI / 180);
const DEG_42 = 42;

describe('static methods', () => {
  describe('of', () => {
    test('normal', () => {
      expect(Angle.of({ radian: RAD_42, degree: DEG_42 })).toBeInstanceOf(
        Angle
      );
      expect(Angle.of({ radian: RAD_42, degree: DEG_42 })).toEqual({
        radian: RAD_42,
        degree: DEG_42
      });
    });
    describe('not match radian and degree', () => {
      test('not strict (use degree)', () => {
        expect(Angle.of({ radian: RAD_42, degree: DEG_42 })).toEqual({
          radian: RAD_42,
          degree: DEG_42
        });
        expect(Angle.of({ radian: 4.2, degree: DEG_42 })).toEqual({
          radian: RAD_42,
          degree: DEG_42
        });
      });
      test('strict (throw)', () => {
        expect(() =>
          Angle.of({ radian: RAD_42, degree: DEG_42 }, true)
        ).not.toThrow();
        expect(() => Angle.of({ radian: RAD_42, degree: 4.2 }, true)).toThrow();
        expect(() => Angle.of({ radian: 4.2, degree: DEG_42 }, true)).toThrow();
      });
    });
  });

  test('fromRadian', () => {
    expect(Angle.fromRadian(RAD_42)).toBeInstanceOf(Angle);
    expect(Angle.fromRadian(RAD_42)).toEqual({
      radian: RAD_42,
      degree: DEG_42
    });
  });

  test('fromDegree', () => {
    expect(Angle.fromDegree(DEG_42)).toBeInstanceOf(Angle);
    expect(Angle.fromDegree(DEG_42)).toEqual({
      radian: RAD_42,
      degree: DEG_42
    });
  });

  test('formXY', () => {
    expect(Angle.fromXY(4.2, 5.3)).toBeInstanceOf(Angle);
    expect(Angle.fromXY(4.2, 5.3).radian).toBe(Math.atan2(5.3, 4.2));
  });

  test('formPoint', () => {
    expect(Angle.fromPoint({ x: 4.2, y: 5.3 })).toBeInstanceOf(Angle);
    expect(Angle.fromPoint({ x: 4.2, y: 5.3 }).radian).toBe(
      Math.atan2(5.3, 4.2)
    );
  });
});

describe('properties', () => {
  test('valid', () => {
    const angle = Angle.fromRadian(RAD_42);

    expect(angle.radian).toBe(RAD_42);
    expect(angle.degree).toBe(DEG_42);
  });

  test('invalid', () => {
    const angle = Angle.fromRadian(NaN);

    expect(angle.radian).toBeNaN();
    expect(angle.degree).toBeNaN();
  });
});

describe('overrides', () => {
  describe('compare', () => {
    test('same parameter', () => {
      expect(
        Angle.fromRadian(RAD_42).compare({ radian: RAD_42, degree: DEG_42 })
      ).toBe(0);
    });

    test('different', () => {
      expect(
        Angle.fromRadian(RAD_42 + 0.1).compare({
          radian: RAD_42,
          degree: DEG_42
        })
      ).toBe(1);
      expect(
        Angle.fromRadian(RAD_42 - 0.1).compare({
          radian: RAD_42,
          degree: DEG_42
        })
      ).toBe(-1);
    });

    test('for invalid', () => {
      expect(
        Angle.fromRadian(NaN).compare({ radian: RAD_42, degree: DEG_42 })
      ).toBe(-1);
      expect(
        Angle.fromRadian(RAD_42).compare({ radian: NaN, degree: DEG_42 })
      ).toBe(1);
      expect(
        Angle.fromRadian(NaN).compare({ radian: NaN, degree: DEG_42 })
      ).toBe(0);
    });
  });

  test('valueOf', () => {
    expect(Angle.fromRadian(RAD_42).valueOf()).toEqual({
      radian: RAD_42,
      degree: DEG_42
    });
  });

  test('isValid', () => {
    expect(Angle.fromRadian(RAD_42).isValid()).toBe(true);
    expect(Angle.fromRadian(NaN).isValid()).toBe(false);
    expect(Angle.fromRadian(Infinity).isValid()).toBe(false);
    expect(Angle.fromRadian(-Infinity).isValid()).toBe(false);
  });
});

describe('methods', () => {
  describe('normalize', () => {
    test('normal', () => {
      expect(Angle.fromDegree(-721).normalize().degree).toBe(-1);
      expect(Angle.fromDegree(-720).normalize().degree).toBe(0);
      expect(Angle.fromDegree(-719).normalize().degree).toBe(1);

      expect(Angle.fromDegree(-541).normalize().degree).toBe(179);
      expect(Angle.fromDegree(-540).normalize().degree).toBe(180);
      expect(Angle.fromDegree(-539).normalize().degree).toBe(-179);

      expect(Angle.fromDegree(-361).normalize().degree).toBe(-1);
      expect(Angle.fromDegree(-360).normalize().degree).toBe(0);
      expect(Angle.fromDegree(-359).normalize().degree).toBe(1);

      expect(Angle.fromDegree(-181).normalize().degree).toBe(179);
      expect(Angle.fromDegree(-180).normalize().degree).toBe(180);
      expect(Angle.fromDegree(-179).normalize().degree).toBe(-179);

      expect(Angle.fromDegree(-1).normalize().degree).toBe(-1);
      expect(Angle.fromDegree(0).normalize().degree).toBe(0);
      expect(Angle.fromDegree(1).normalize().degree).toBe(1);

      expect(Angle.fromDegree(179).normalize().degree).toBe(179);
      expect(Angle.fromDegree(180).normalize().degree).toBe(180);
      expect(Angle.fromDegree(181).normalize().degree).toBe(-179);

      expect(Angle.fromDegree(359).normalize().degree).toBe(-1);
      expect(Angle.fromDegree(360).normalize().degree).toBe(0);
      expect(Angle.fromDegree(361).normalize().degree).toBe(1);

      expect(Angle.fromDegree(539).normalize().degree).toBe(179);
      expect(Angle.fromDegree(540).normalize().degree).toBe(180);
      expect(Angle.fromDegree(541).normalize().degree).toBe(-179);

      expect(Angle.fromDegree(719).normalize().degree).toBe(-1);
      expect(Angle.fromDegree(720).normalize().degree).toBe(0);
      expect(Angle.fromDegree(721).normalize().degree).toBe(1);
    });

    test('invalid', () => {
      expect(Angle.fromDegree(NaN).normalize().isValid()).toBe(false);
    });
  });

  describe('normalizeIn360', () => {
    test('normal', () => {
      expect(Angle.fromDegree(-721).normalizeIn360().degree).toBe(359);
      expect(Angle.fromDegree(-720).normalizeIn360().degree).toBe(0);
      expect(Angle.fromDegree(-719).normalizeIn360().degree).toBe(1);

      expect(Angle.fromDegree(-361).normalizeIn360().degree).toBe(359);
      expect(Angle.fromDegree(-360).normalizeIn360().degree).toBe(0);
      expect(Angle.fromDegree(-359).normalizeIn360().degree).toBe(1);

      expect(Angle.fromDegree(-1).normalizeIn360().degree).toBe(359);
      expect(Angle.fromDegree(0).normalizeIn360().degree).toBe(0);
      expect(Angle.fromDegree(1).normalizeIn360().degree).toBe(1);

      expect(Angle.fromDegree(359).normalizeIn360().degree).toBe(359);
      expect(Angle.fromDegree(360).normalizeIn360().degree).toBe(0);
      expect(Angle.fromDegree(361).normalizeIn360().degree).toBe(1);

      expect(Angle.fromDegree(719).normalizeIn360().degree).toBe(359);
      expect(Angle.fromDegree(720).normalizeIn360().degree).toBe(0);
      expect(Angle.fromDegree(721).normalizeIn360().degree).toBe(1);
    });

    test('invalid', () => {
      expect(Angle.fromDegree(NaN).normalizeIn360().isValid()).toBe(false);
    });
  });

  describe('addRadian', () => {
    test('normal', () => {
      expect(Angle.fromRadian(0.1).addRadian(0.2).radian).toBe(0.1 + 0.2);

      const angle = Angle.fromRadian(RAD_42);

      expect(angle.addRadian(0)).not.toBe(angle);
    });

    test('invalid', () => {
      expect(Angle.fromRadian(NaN).addRadian(RAD_42).isValid()).toBe(false);

      expect(Angle.fromRadian(RAD_42).addRadian(NaN).isValid()).toBe(false);
      expect(Angle.fromRadian(RAD_42).addRadian(Infinity).isValid()).toBe(
        false
      );
      expect(Angle.fromRadian(RAD_42).addRadian(-Infinity).isValid()).toBe(
        false
      );

      expect(Angle.fromRadian(NaN).addRadian(NaN).isValid()).toBe(false);
      expect(Angle.fromRadian(NaN).addRadian(Infinity).isValid()).toBe(false);
      expect(Angle.fromRadian(NaN).addRadian(-Infinity).isValid()).toBe(false);
    });
  });

  describe('addDegree', () => {
    test('normal', () => {
      expect(Angle.fromDegree(0.1).addDegree(0.2).degree).toBe(0.1 + 0.2);

      const angle = Angle.fromDegree(DEG_42);

      expect(angle.addDegree(0)).not.toBe(angle);
    });

    test('invalid', () => {
      expect(Angle.fromDegree(NaN).addDegree(DEG_42).isValid()).toBe(false);

      expect(Angle.fromDegree(DEG_42).addDegree(NaN).isValid()).toBe(false);
      expect(Angle.fromDegree(DEG_42).addDegree(Infinity).isValid()).toBe(
        false
      );
      expect(Angle.fromDegree(DEG_42).addDegree(-Infinity).isValid()).toBe(
        false
      );

      expect(Angle.fromDegree(NaN).addDegree(NaN).isValid()).toBe(false);
      expect(Angle.fromDegree(NaN).addDegree(Infinity).isValid()).toBe(false);
      expect(Angle.fromDegree(NaN).addDegree(-Infinity).isValid()).toBe(false);
    });
  });

  describe('add', () => {
    test('normal', () => {
      expect(Angle.fromDegree(0.1).add(Angle.fromDegree(0.2)).degree).toBe(
        0.1 + 0.2
      );

      const angle = Angle.fromDegree(DEG_42);

      expect(angle.add(Angle.fromDegree(0))).not.toBe(angle);
    });

    test('invalid', () => {
      expect(
        Angle.fromDegree(NaN).add(Angle.fromDegree(DEG_42)).isValid()
      ).toBe(false);
      expect(
        Angle.fromDegree(DEG_42).add(Angle.fromDegree(NaN)).isValid()
      ).toBe(false);
      expect(Angle.fromDegree(NaN).add(Angle.fromDegree(NaN)).isValid()).toBe(
        false
      );
    });
  });

  describe('multiple', () => {
    test('normal', () => {
      expect(Angle.fromDegree(0.1).multiple(0.2).degree).toBe(0.1 * 0.2);
      expect(Angle.fromDegree(0.1).multiple(0).degree).toBe(0);

      const angle = Angle.fromDegree(DEG_42);

      expect(angle.multiple(1)).not.toBe(angle);
    });

    test('invalid', () => {
      expect(Angle.fromDegree(NaN).multiple(1).isValid()).toBe(false);

      expect(Angle.fromDegree(DEG_42).multiple(NaN).isValid()).toBe(false);
      expect(Angle.fromDegree(DEG_42).multiple(Infinity).isValid()).toBe(false);
      expect(Angle.fromDegree(DEG_42).multiple(-Infinity).isValid()).toBe(
        false
      );

      expect(Angle.fromDegree(NaN).multiple(NaN).isValid()).toBe(false);
      expect(Angle.fromDegree(NaN).multiple(Infinity).isValid()).toBe(false);
      expect(Angle.fromDegree(NaN).multiple(-Infinity).isValid()).toBe(false);
    });
  });

  describe('getCos', () => {
    test('normal', () => {
      expect(Angle.fromRadian(RAD_42).getCos()).toBe(Math.cos(RAD_42));
    });

    test('call twice (return cached value)', () => {
      const angle = Angle.fromRadian(RAD_42);

      expect(angle.getCos()).toBe(Math.cos(RAD_42));
      expect(angle.getCos()).toBe(Math.cos(RAD_42));
    });

    test('invalid', () => {
      expect(Angle.fromRadian(NaN).getCos()).toBeNaN();
    });
  });

  describe('getSin', () => {
    test('normal', () => {
      expect(Angle.fromRadian(RAD_42).getSin()).toBe(Math.sin(RAD_42));
    });

    test('call twice (return cached value)', () => {
      const angle = Angle.fromRadian(RAD_42);

      expect(angle.getSin()).toBe(Math.sin(RAD_42));
      expect(angle.getSin()).toBe(Math.sin(RAD_42));
    });

    test('invalid', () => {
      expect(Angle.fromRadian(NaN).getSin()).toBeNaN();
    });
  });

  describe('getTan', () => {
    test('normal', () => {
      expect(Angle.fromRadian(RAD_42).getTan()).toBe(Math.tan(RAD_42));
    });

    test('call twice (return cached value)', () => {
      const angle = Angle.fromRadian(RAD_42);

      expect(angle.getTan()).toBe(Math.tan(RAD_42));
      expect(angle.getTan()).toBe(Math.tan(RAD_42));
    });

    test('invalid', () => {
      expect(Angle.fromRadian(NaN).getTan()).toBeNaN();
    });
  });

  describe('getPointDelta', () => {
    test('normal', () => {
      expect(Angle.fromRadian(RAD_42).getPointDelta(42)).toEqual({
        x: Math.cos(RAD_42) * 42,
        y: Math.sin(RAD_42) * 42
      });
    });

    test('invalid angle', () => {
      expect(Angle.fromRadian(NaN).getPointDelta(42).isValid()).toBe(false);
    });

    test('invalid size', () => {
      expect(Angle.fromRadian(RAD_42).getPointDelta(NaN).isValid()).toBe(false);
      expect(Angle.fromRadian(RAD_42).getPointDelta(Infinity).isValid()).toBe(
        false
      );
      expect(Angle.fromRadian(RAD_42).getPointDelta(-Infinity).isValid()).toBe(
        false
      );
    });
  });
});
