import { compare } from '../modules/compare';
import { numbers } from '../modules/numbers';
import { RGBAData } from '../types/RGBAData';

import { BaseObject } from './BaseObject';

const getValue = (x: number): number =>
  Number.isFinite(x) ? numbers.clamp(Math.round(x), 0, 255) : x;

const format = (x: number): string => x.toString(16).padStart(2, '0');

/** RGB-based color object. */
export class RGBA extends BaseObject<RGBAData> implements RGBAData {
  /** @implements */
  readonly red: number;
  /** @implements */
  readonly green: number;
  /** @implements */
  readonly blue: number;
  /** @implements */
  readonly alpha: number;

  private static BLACK: RGBA = RGBA.of({
    red: 0,
    green: 0,
    blue: 0,
    alpha: 255
  });

  //
  // constructor (private)
  //

  private constructor({ red, green, blue, alpha }: RGBAData) {
    super(
      Number.isInteger(red) &&
        red >= 0 &&
        red <= 255 &&
        Number.isInteger(green) &&
        green >= 0 &&
        green <= 255 &&
        Number.isInteger(blue) &&
        blue >= 0 &&
        blue <= 255 &&
        Number.isInteger(alpha) &&
        alpha >= 0 &&
        alpha <= 255
    );

    this.red = this.isValid() ? red : NaN;
    this.green = this.isValid() ? green : NaN;
    this.blue = this.isValid() ? blue : NaN;
    this.alpha = this.isValid() ? alpha : NaN;
  }

  //
  // static methods
  //

  /**
   * Create an object from an color data.
   *
   * @param data - Color data.
   */
  static of(data: RGBAData): RGBA {
    return new RGBA(data);
  }

  /**
   * Create an object from red, green, and blue values.
   *
   * @param red - Red value. 0 <= n <= 255, integer.
   * @param green - Green value. 0 <= n <= 255, integer.
   * @param blue - Blue value. 0 <= n <= 255, integer.
   */
  static fromRGB(red: number, green: number, blue: number): RGBA {
    return new RGBA({
      red: getValue(red),
      green: getValue(green),
      blue: getValue(blue),
      alpha: 255
    });
  }

  /**
   * Create an object from floating-point values of red, green, and blue.
   *
   * @param red - Red value. 0 <= n <= 1, float.
   * @param green - Green value. 0 <= n <= 1, float.
   * @param blue - Blue value. 0 <= n <= 1, float.
   */
  static fromRGBByFloat(red: number, green: number, blue: number): RGBA {
    return new RGBA({
      red: getValue(red * 255),
      green: getValue(green * 255),
      blue: getValue(blue * 255),
      alpha: 255
    });
  }

  /**
   * Create an object from red, green, blue, and alpha values.
   *
   * @param red - Red value. 0 <= n <= 255, integer.
   * @param green - Green value. 0 <= n <= 255, integer.
   * @param blue - Blue value. 0 <= n <= 255, integer.
   * @param alpha - Alpha value. 0 <= n <= 255, integer.
   */
  static fromRGBA(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): RGBA {
    return new RGBA({
      red: getValue(red),
      green: getValue(green),
      blue: getValue(blue),
      alpha: getValue(alpha)
    });
  }

  /**
   * Create an object from floating-point values of red, green, blue, and alpha.
   *
   * @param red - Red value. 0 <= n <= 1, float.
   * @param green - Green value. 0 <= n <= 1, float.
   * @param blue - Blue value. 0 <= n <= 1, float.
   * @param alpha - Alpha value. 0 <= n <= 1, float.
   */
  static fromRGBAByFloat(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): RGBA {
    return new RGBA({
      red: getValue(red * 255),
      green: getValue(green * 255),
      blue: getValue(blue * 255),
      alpha: getValue(alpha * 255)
    });
  }

  /**
   * Create an object from hex string.
   *
   * @param hexString - Hex string.
   * @param strict - If set ture, throw Error with illegal hex stirng format.
   * If set false, return black color with illegal hex stirng format.
   */
  static fromHexString(hexString: string, strict = false): RGBA {
    const matches =
      /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i.exec(
        hexString
      );

    if (!matches) {
      if (strict) throw new Error('Illegal hex string');

      return RGBA.BLACK;
    }

    const [, r, g, b, a] = matches;

    return new RGBA({
      red: Number.parseInt(r, 16),
      green: Number.parseInt(g, 16),
      blue: Number.parseInt(b, 16),
      alpha: typeof a !== 'string' ? 255 : Number.parseInt(a, 16)
    });
  }

  //
  // overrides
  //

  /** @override */
  compare(other: RGBAData): number {
    const color = new RGBA(other);

    return compare.groups(
      compare.validatable(this, color),
      compare.number(this.red, other.red),
      compare.number(this.green, other.green),
      compare.number(this.blue, other.blue),
      compare.number(this.alpha, other.alpha)
    );
  }

  /** @override */
  valueOf(): RGBAData {
    return {
      red: this.red,
      green: this.green,
      blue: this.blue,
      alpha: this.alpha
    };
  }

  //
  // methods
  //

  /**
   * Return a color string for CSS.
   *
   * @param omitAlpha - If true and alpha is 255, omit alpha parameter.
   */
  toString(omitAlpha = false): string {
    if (!this.isValid()) return 'rgb(0,0,0)';

    return omitAlpha && this.alpha === 255
      ? `rgb(${this.red},${this.green},${this.blue})`
      : `rgba(${this.red},${this.green},${this.blue},${this.alpha / 255})`;
  }

  /**
   * Return a hexadecimal color string for CSS.
   *
   * @param omitAlpha - If true and alpha is 255, omit alpha parameter.
   */
  toHexString(omitAlpha = false): string {
    if (!this.isValid()) return '#000000';

    return omitAlpha && this.alpha === 255
      ? `#${format(this.red)}${format(this.green)}${format(this.blue)}`
      : `#${format(this.red)}${format(this.green)}${format(this.blue)}${format(
          this.alpha
        )}`;
  }
}
