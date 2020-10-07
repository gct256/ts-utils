import { RGBA } from '../../src/classes/RGBA';

describe('static methods', () => {
  test('of', () => {
    expect(RGBA.of({ red: 42, green: 53, blue: 64, alpha: 75 })).toBeInstanceOf(
      RGBA
    );
    expect(RGBA.of({ red: 42, green: 53, blue: 64, alpha: 75 })).toEqual({
      red: 42,
      green: 53,
      blue: 64,
      alpha: 75
    });
  });

  describe('fromRGB', () => {
    test('normal', () => {
      expect(RGBA.fromRGB(42, 53, 64)).toBeInstanceOf(RGBA);
      expect(RGBA.fromRGB(42, 53, 64)).toEqual({
        red: 42,
        green: 53,
        blue: 64,
        alpha: 255
      });
    });

    test('out of range (clamped)', () => {
      expect(RGBA.fromRGB(-1, -1, -1)).toEqual({
        red: 0,
        green: 0,
        blue: 0,
        alpha: 255
      });
      expect(RGBA.fromRGB(256, 256, 256)).toEqual({
        red: 255,
        green: 255,
        blue: 255,
        alpha: 255
      });
    });

    test('float (use rounded value)', () => {
      expect(RGBA.fromRGB(1.1, 1.1, 1.1)).toEqual({
        red: 1,
        green: 1,
        blue: 1,
        alpha: 255
      });
      expect(RGBA.fromRGB(1.4, 1.4, 1.4)).toEqual({
        red: 1,
        green: 1,
        blue: 1,
        alpha: 255
      });
      expect(RGBA.fromRGB(1.5, 1.5, 1.5)).toEqual({
        red: 2,
        green: 2,
        blue: 2,
        alpha: 255
      });
      expect(RGBA.fromRGB(1.9, 1.9, 1.9)).toEqual({
        red: 2,
        green: 2,
        blue: 2,
        alpha: 255
      });
    });
  });

  describe('fromRGBByFloat', () => {
    test('normal', () => {
      expect(RGBA.fromRGBByFloat(0.42, 0.53, 0.64)).toBeInstanceOf(RGBA);
      expect(RGBA.fromRGBByFloat(0.42, 0.53, 0.64)).toEqual({
        red: Math.round(0.42 * 255),
        green: Math.round(0.53 * 255),
        blue: Math.round(0.64 * 255),
        alpha: 255
      });
    });

    test('out of range (clamped)', () => {
      expect(RGBA.fromRGBByFloat(-0.1, -0.1, -0.1)).toEqual({
        red: 0,
        green: 0,
        blue: 0,
        alpha: 255
      });
      expect(RGBA.fromRGBByFloat(1.1, 1.1, 1.1)).toEqual({
        red: 255,
        green: 255,
        blue: 255,
        alpha: 255
      });
    });
  });

  describe('fromRGBA', () => {
    test('normal', () => {
      expect(RGBA.fromRGBA(42, 53, 64, 75)).toBeInstanceOf(RGBA);
      expect(RGBA.fromRGBA(42, 53, 64, 75)).toEqual({
        red: 42,
        green: 53,
        blue: 64,
        alpha: 75
      });
    });

    test('out of range (clamped)', () => {
      expect(RGBA.fromRGBA(-1, -1, -1, -1)).toEqual({
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0
      });
      expect(RGBA.fromRGBA(256, 256, 256, 256)).toEqual({
        red: 255,
        green: 255,
        blue: 255,
        alpha: 255
      });
    });

    test('float (use rounded value)', () => {
      expect(RGBA.fromRGBA(1.1, 1.1, 1.1, 1.1)).toEqual({
        red: 1,
        green: 1,
        blue: 1,
        alpha: 1
      });
      expect(RGBA.fromRGBA(1.4, 1.4, 1.4, 1.4)).toEqual({
        red: 1,
        green: 1,
        blue: 1,
        alpha: 1
      });
      expect(RGBA.fromRGBA(1.5, 1.5, 1.5, 1.5)).toEqual({
        red: 2,
        green: 2,
        blue: 2,
        alpha: 2
      });
      expect(RGBA.fromRGBA(1.9, 1.9, 1.9, 1.9)).toEqual({
        red: 2,
        green: 2,
        blue: 2,
        alpha: 2
      });
    });
  });

  describe('fromRGBAByFloat', () => {
    test('normal', () => {
      expect(RGBA.fromRGBAByFloat(0.42, 0.53, 0.64, 0.75)).toBeInstanceOf(RGBA);
      expect(RGBA.fromRGBAByFloat(0.42, 0.53, 0.64, 0.75)).toEqual({
        red: Math.round(0.42 * 255),
        green: Math.round(0.53 * 255),
        blue: Math.round(0.64 * 255),
        alpha: Math.round(0.75 * 255)
      });
    });

    test('out of range (clamped)', () => {
      expect(RGBA.fromRGBAByFloat(-0.1, -0.1, -0.1, -0.1)).toEqual({
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0
      });
      expect(RGBA.fromRGBAByFloat(1.1, 1.1, 1.1, 1.1)).toEqual({
        red: 255,
        green: 255,
        blue: 255,
        alpha: 255
      });
    });
  });
});

describe('properties', () => {
  test('valid', () => {
    const color = RGBA.fromRGBA(42, 53, 64, 75);

    expect(color.red).toBe(42);
    expect(color.green).toBe(53);
    expect(color.blue).toBe(64);
    expect(color.alpha).toBe(75);
  });

  test('invalid', () => {
    const color = RGBA.fromRGBA(NaN, 53, 64, 75);

    expect(color.red).toBeNaN();
    expect(color.green).toBeNaN();
    expect(color.blue).toBeNaN();
    expect(color.alpha).toBeNaN();
  });
});

describe('overrides', () => {
  describe('compare', () => {
    test('same parameter', () => {
      expect(
        RGBA.fromRGBA(42, 53, 64, 75).compare({
          red: 42,
          green: 53,
          blue: 64,
          alpha: 75
        })
      ).toBe(0);
    });

    test('different red', () => {
      expect(
        RGBA.fromRGBA(42, 53, 64, 75).compare({
          red: 43,
          green: 53,
          blue: 64,
          alpha: 75
        })
      ).toBe(-1);
      expect(
        RGBA.fromRGBA(42, 53, 64, 75).compare({
          red: 41,
          green: 53,
          blue: 64,
          alpha: 75
        })
      ).toBe(1);
    });

    test('different green', () => {
      expect(
        RGBA.fromRGBA(42, 53, 64, 75).compare({
          red: 42,
          green: 54,
          blue: 64,
          alpha: 75
        })
      ).toBe(-1);
      expect(
        RGBA.fromRGBA(42, 53, 64, 75).compare({
          red: 42,
          green: 52,
          blue: 64,
          alpha: 75
        })
      ).toBe(1);
    });

    test('different blue', () => {
      expect(
        RGBA.fromRGBA(42, 53, 64, 75).compare({
          red: 42,
          green: 53,
          blue: 65,
          alpha: 75
        })
      ).toBe(-1);
      expect(
        RGBA.fromRGBA(42, 53, 64, 75).compare({
          red: 42,
          green: 53,
          blue: 63,
          alpha: 75
        })
      ).toBe(1);
    });

    test('different alpha', () => {
      expect(
        RGBA.fromRGBA(42, 53, 64, 75).compare({
          red: 42,
          green: 53,
          blue: 64,
          alpha: 76
        })
      ).toBe(-1);
      expect(
        RGBA.fromRGBA(42, 53, 64, 75).compare({
          red: 42,
          green: 53,
          blue: 64,
          alpha: 74
        })
      ).toBe(1);
    });

    test('invalid', () => {
      expect(
        RGBA.of({ red: NaN, green: 53, blue: 64, alpha: 75 }).compare({
          red: 42,
          green: 53,
          blue: 64,
          alpha: 75
        })
      ).toBe(-1);
      expect(
        RGBA.of({ red: 42, green: 53, blue: 64, alpha: 75 }).compare({
          red: NaN,
          green: 53,
          blue: 64,
          alpha: 75
        })
      ).toBe(1);
      expect(
        RGBA.of({ red: NaN, green: 53, blue: 64, alpha: 75 }).compare({
          red: NaN,
          green: 53,
          blue: 64,
          alpha: 75
        })
      ).toBe(0);
    });
  });

  test('valueOf', () => {
    expect(RGBA.fromRGBA(42, 53, 64, 75).valueOf()).toEqual({
      red: 42,
      green: 53,
      blue: 64,
      alpha: 75
    });
  });

  test('isValid', () => {
    expect(RGBA.of({ red: 42, green: 53, blue: 64, alpha: 75 }).isValid()).toBe(
      true
    );

    expect(
      RGBA.of({ red: 256, green: 53, blue: 64, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 256, blue: 64, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 53, blue: 256, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 53, blue: 64, alpha: 256 }).isValid()
    ).toBe(false);

    expect(RGBA.of({ red: -1, green: 53, blue: 64, alpha: 75 }).isValid()).toBe(
      false
    );
    expect(RGBA.of({ red: 42, green: -1, blue: 64, alpha: 75 }).isValid()).toBe(
      false
    );
    expect(RGBA.of({ red: 42, green: 53, blue: -1, alpha: 75 }).isValid()).toBe(
      false
    );
    expect(RGBA.of({ red: 42, green: 53, blue: 64, alpha: -1 }).isValid()).toBe(
      false
    );

    expect(
      RGBA.of({ red: 4.2, green: 53, blue: 64, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 5.3, blue: 64, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 53, blue: 6.4, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 53, blue: 64, alpha: 7.5 }).isValid()
    ).toBe(false);

    expect(
      RGBA.of({ red: NaN, green: 53, blue: 64, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: NaN, blue: 64, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 53, blue: NaN, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 53, blue: 64, alpha: NaN }).isValid()
    ).toBe(false);

    expect(
      RGBA.of({ red: Infinity, green: 53, blue: 64, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: Infinity, blue: 64, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 53, blue: Infinity, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 53, blue: 64, alpha: Infinity }).isValid()
    ).toBe(false);

    expect(
      RGBA.of({ red: -Infinity, green: 53, blue: 64, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: -Infinity, blue: 64, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 53, blue: -Infinity, alpha: 75 }).isValid()
    ).toBe(false);
    expect(
      RGBA.of({ red: 42, green: 53, blue: 64, alpha: -Infinity }).isValid()
    ).toBe(false);
  });
});

describe('methods', () => {
  describe('toString', () => {
    test('normal', () => {
      expect(RGBA.fromRGBA(42, 53, 64, 75).toString()).toBe(
        `rgba(42,53,64,${75 / 255})`
      );
    });

    test('omit alpha', () => {
      expect(RGBA.fromRGBA(42, 53, 64, 75).toString(true)).toBe(
        `rgba(42,53,64,${75 / 255})`
      );
      expect(RGBA.fromRGBA(42, 53, 64, 255).toString(true)).toBe(
        `rgb(42,53,64)`
      );
    });

    test('invalid', () => {
      expect(RGBA.fromRGBA(NaN, 53, 64, 75).toString()).toBe(`rgb(0,0,0)`);
    });
  });

  describe('toHexString', () => {
    test('normal', () => {
      expect(RGBA.fromRGBA(0x4a, 0x5b, 0x6c, 0xd).toHexString()).toBe(
        '#4a5b6c0d'
      );
    });

    test('omit alpha', () => {
      expect(RGBA.fromRGBA(0x4a, 0x5b, 0x6c, 0xd).toHexString(true)).toBe(
        '#4a5b6c0d'
      );
      expect(RGBA.fromRGBA(0x4a, 0x5b, 0x6c, 0xff).toHexString(true)).toBe(
        '#4a5b6c'
      );
    });

    test('invalid', () => {
      expect(RGBA.fromRGBA(NaN, 53, 64, 75).toHexString()).toBe('#000000');
    });
  });
});
