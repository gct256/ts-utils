import { compare } from '../modules/compare';
import { PointData } from '../types/PointData';
import { SizeData } from '../types/SizeData';

import { BaseObject } from './BaseObject';

/** Size object. */
export class Size extends BaseObject<SizeData> implements SizeData {
  /** @implements */
  readonly width: number;
  /** @implements */
  readonly height: number;

  //
  // constructor (private)
  //

  private constructor({ width, height }: SizeData) {
    super(
      Number.isFinite(width) &&
        width >= 0 &&
        Number.isFinite(height) &&
        height >= 0
    );

    this.width = this.isValid() ? width : NaN;
    this.height = this.isValid() ? height : NaN;
  }

  //
  // static methods
  //

  /**
   * Create an object from an size data.
   *
   * @param data - Size data.
   */
  static of(data: SizeData): Size {
    return new Size(data);
  }

  /**
   * Create an object from a width and height.
   *
   * @param width - Width.
   * @param height - Height.
   */
  static fromWH(width: number, height: number): Size {
    return new Size({ width, height });
  }

  //
  // overrides
  //

  /** @overrides */
  compare(other: SizeData): number {
    const size = new Size(other);

    return compare.groups(
      compare.validatable(this, size),
      compare.float(this.width, size.width),
      compare.float(this.height, size.height)
    );
  }

  /** @overrides */
  valueOf(): SizeData {
    return {
      width: this.width,
      height: this.height
    };
  }

  //
  // methods
  //

  /**
   * Return true if empty.
   */
  isEmpty(): boolean {
    return this.isValid() && (this.width === 0 || this.height === 0);
  }

  /**
   * Create a new resized object with size delta.
   *
   * @param sizeDelta - Size delta.
   */
  resizeBy(sizeDelta: SizeData): Size;

  /**
   * Create a new resized object with point delta.
   *
   * @param pointDelta - Point delta.
   */
  resizeBy(pointDelta: PointData): Size;

  /**
   * Create a new resized object with delta.
   *
   * @param widthDelta - Width delta.
   * @param heightDelta - Height delta.
   */
  resizeBy(widthDelta: number, heightDelta: number): Size;

  resizeBy(arg0: SizeData | PointData | number, arg1 = 0): Size {
    if (typeof arg0 === 'object') {
      if ('width' in arg0) {
        return new Size({
          width: this.width + arg0.width,
          height: this.height + arg0.height
        });
      }

      return new Size({
        width: this.width + arg0.x,
        height: this.height + arg0.y
      });
    }

    return new Size({
      width: this.width + arg0,
      height: this.height + arg1
    });
  }
}
