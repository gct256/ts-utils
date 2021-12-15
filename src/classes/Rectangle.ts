import { compare } from '../modules/compare';
import { PointData } from '../types/PointData';
import { RectangleData } from '../types/RectangleData';
import { SizeData } from '../types/SizeData';

import { BaseObject } from './BaseObject';
import { Point } from './Point';
import { Size } from './Size';

/** a < b */
const isLT = (a: number, b: number): boolean => compare.float(a, b) < 0;

/** a <= b */
const isLE = (a: number, b: number): boolean => compare.float(a, b) <= 0;

/** Rectangle constructor's parameter. */
type RectangleParameter = Pick<
  RectangleData,
  'left' | 'right' | 'top' | 'bottom'
>;

const RECTANGLE_PARTS = [
  'outside',
  'top-left',
  'top',
  'top-right',
  'left',
  'inside',
  'right',
  'bottom-left',
  'bottom',
  'bottom-right'
] as const;

/** Part of rectangle. */
type RectanglePart = typeof RECTANGLE_PARTS[number];

/** Rectangle object. */
export class Rectangle
  extends BaseObject<RectangleData>
  implements RectangleData
{
  /** @implements */
  readonly left: number;
  /** @implements */
  readonly right: number;
  /** @implements */
  readonly top: number;
  /** @implements */
  readonly bottom: number;

  /** @implements */
  readonly width: number;
  /** @implements */
  readonly height: number;

  /** @implements */
  readonly x: number;
  /** @implements */
  readonly y: number;

  readonly #origin: Point;
  readonly #size: Size;

  //
  // constructor (private)
  //

  private constructor(origin: Point, size: Size) {
    super(origin.isValid() && size.isValid());

    this.left = this.isValid() ? origin.x : NaN;
    this.right = this.isValid() ? origin.x + size.width : NaN;
    this.top = this.isValid() ? origin.y : NaN;
    this.bottom = this.isValid() ? origin.y + size.height : NaN;

    this.width = this.isValid() ? size.width : NaN;
    this.height = this.isValid() ? size.height : NaN;

    this.x = this.isValid() ? origin.x : NaN;
    this.y = this.isValid() ? origin.y : NaN;

    this.#origin = Point.of(origin);
    this.#size = Size.of(size);
  }

  //
  // static methods
  //

  /**
   * Create an object from a rectangle data.
   *
   * @param data - Rectangle data.
   */
  static of({
    left,
    right,
    top,
    bottom
  }: RectangleParameter | RectangleData): Rectangle {
    return new Rectangle(
      Point.fromXY(left, top),
      Size.fromWH(right - left, bottom - top)
    );
  }

  /**
   * Create an object from top-left point and size.
   *
   * @param x - X coordinate of top-left point.
   * @param y - Y coordinate of top-left point.
   * @param width - Width.
   * @param height - Height.
   */
  static fromXYWH(
    x: number,
    y: number,
    width: number,
    height: number
  ): Rectangle {
    return new Rectangle(Point.fromXY(x, y), Size.fromWH(width, height));
  }

  /**
   * Create an object from diagonal point pair.
   *
   * @param p0 - Point.
   * @param p1 - Another point.
   */
  static fromPointPair(p0: PointData, p1: PointData): Rectangle {
    const [left, right] = p0.x < p1.x ? [p0.x, p1.x] : [p1.x, p0.x];
    const [top, bottom] = p0.y < p1.y ? [p0.y, p1.y] : [p1.y, p0.y];

    return Rectangle.of({ left, right, top, bottom });
  }

  /**
   * Create a rectangle that contains all the rectangles.
   *
   * @param rects - Rectangle data.
   */
  static union(...rects: RectangleData[]): Rectangle {
    const { length } = rects;

    switch (length) {
      case 0:
        return Rectangle.INVALID;

      case 1:
        return Rectangle.of(rects[0]);

      default: {
        const rect0 = Rectangle.of(rects[0]);

        if (!rect0.isValid()) return rect0;

        let { left, right, top, bottom } = rect0;

        for (let i = 1; i < length; i += 1) {
          const r = Rectangle.of(rects[i]);

          if (!r.isValid()) return r;

          if (r.left < left) left = r.left;

          if (right < r.right) right = r.right;

          if (r.top < top) top = r.top;

          if (bottom < r.bottom) bottom = r.bottom;
        }

        return Rectangle.of({ left, right, top, bottom });
      }
    }
  }

  /**
   * Create a rectangle at the intersection of all rectangles.
   * If there is no intersection, it returns an invalid rectangle.
   *
   * @param rects - Rectangle data.
   */
  static intersection(...rects: RectangleData[]): Rectangle {
    const { length } = rects;

    switch (length) {
      case 0:
        return Rectangle.INVALID;

      case 1:
        return Rectangle.of(rects[0]);

      default: {
        const rect0 = Rectangle.of(rects[0]);

        if (!rect0.isValid()) return rect0;

        let { left, right, top, bottom } = rect0;

        for (let i = 1; i < length; i += 1) {
          const r = Rectangle.of(rects[i]);

          if (!r.isValid()) return r;

          if (r.left > left) left = r.left;

          if (right > r.right) right = r.right;

          if (right < left) return Rectangle.INVALID;

          if (r.top > top) top = r.top;

          if (bottom > r.bottom) bottom = r.bottom;

          if (bottom < top) return Rectangle.INVALID;
        }

        return Rectangle.of({ left, right, top, bottom });
      }
    }
  }

  /** Invalid rectangle object. */
  private static readonly INVALID = Rectangle.fromXYWH(NaN, NaN, NaN, NaN);

  //
  // overrides
  //

  /** @override */
  compare(other: RectangleData): number {
    const rect = Rectangle.of(other);

    return compare.groups(
      compare.validatable(this, rect),
      this.#origin.compare(rect.#origin),
      this.#size.compare(rect.#size)
    );
  }

  /** @override */
  valueOf(): RectangleData {
    return {
      left: this.left,
      right: this.right,
      top: this.top,
      bottom: this.bottom,

      ...this.#size.valueOf(),
      ...this.#origin.valueOf()
    };
  }

  //
  // methods
  //

  /**
   * Return true if empty.
   */
  isEmpty(): boolean {
    return this.#size.isEmpty();
  }

  /**
   * Return true if point in rectangle.
   *
   * @param point - Point data.
   * @param excludeEdge - If true, exclude point in edge case.
   */
  isPointContains(point: PointData, excludeEdge = false): boolean {
    if (!this.isValid() || !Point.of(point).isValid()) return false;

    const part = this.getPartForPoint(point);

    return excludeEdge ? part === 'inside' : part !== 'outside';
  }

  /**
   * Return true if another rectangle in rectangle.
   *
   * @param rect - Another rectangle data.
   * @param excludeEdge - If true, exclude point in edge case.
   */
  isContains(rect: RectangleData, excludeEdge = false): boolean {
    if (!this.isValid()) return false;

    const r = Rectangle.of(rect);

    if (!r.isValid()) return false;

    if (excludeEdge) {
      return (
        isLT(this.left, r.left) &&
        isLT(r.right, this.right) &&
        isLT(this.top, r.top) &&
        isLT(r.bottom, this.bottom)
      );
    }

    return (
      isLE(this.left, r.left) &&
      isLE(r.right, this.right) &&
      isLE(this.top, r.top) &&
      isLE(r.bottom, this.bottom)
    );
  }

  /**
   * Return true if another rectangle has intersection with rectangle.
   *
   * @param rect - Another rectangle data.
   * @param excludeEdge - If true, exclude point in edge case.
   */
  isIntersects(rect: RectangleData, excludeEdge = false): boolean {
    if (!this.isValid()) return false;

    const r = Rectangle.of(rect);

    if (!r.isValid()) return false;

    if (excludeEdge) {
      return (
        isLT(this.left, r.right) &&
        isLT(r.left, this.right) &&
        isLT(this.top, r.bottom) &&
        isLT(r.top, this.bottom)
      );
    }

    return (
      isLE(this.left, r.right) &&
      isLE(r.left, this.right) &&
      isLE(this.top, r.bottom) &&
      isLE(r.top, this.bottom)
    );
  }

  /**
   * Create a new object with delta.
   *
   * @param pointDelta - Point delta.
   */
  moveBy(pointDelta: PointData): Rectangle;

  /**
   * Create a new object with delta.
   *
   * @param xDelta - X delta.
   * @param yDelta - Y delta.
   */
  moveBy(xDelta: number, yDelta: number): Rectangle;

  moveBy(arg0: PointData | number, arg1 = 0): Rectangle {
    if (typeof arg0 === 'object') {
      return new Rectangle(this.#origin.moveBy(arg0), this.#size);
    }

    return new Rectangle(this.#origin.moveBy(arg0, arg1), this.#size);
  }

  /**
   * Create a new resized object with size delta.
   *
   * @param sizeDelta - Size delta.
   */
  resizeBy(sizeDelta: SizeData): Rectangle;

  /**
   * Create a new resized object with point delta.
   *
   * @param pointDelta - Point delta.
   */
  resizeBy(pointDelta: PointData): Rectangle;

  /**
   * Create a new resized object with delta.
   *
   * @param widthDelta - Width delta.
   * @param heightDelta - Height delta.
   */
  resizeBy(widthDelta: number, heightDelta: number): Rectangle;

  resizeBy(arg0: SizeData | PointData | number, arg1 = 0): Rectangle {
    if (typeof arg0 === 'object') {
      if ('width' in arg0) {
        return new Rectangle(this.#origin, this.#size.resizeBy(arg0));
      }

      return new Rectangle(this.#origin, this.#size.resizeBy(arg0));
    }

    return new Rectangle(this.#origin, this.#size.resizeBy(arg0, arg1));
  }

  /**
   * Create a new inset object with size delta.
   *
   * @param sizeDelta - Size delta.
   */
  inset(sizeDelta: SizeData): Rectangle;

  /**
   * Create a new inset object with point delta.
   *
   * @param pointDelta - Point delta.
   */
  inset(pointDelta: PointData): Rectangle;

  /**
   * Create a new inset object with delta.
   *
   * @param widthDelta - Width delta.
   * @param heightDelta - Height delta.
   */
  inset(widthDelta: number, heightDelta: number): Rectangle;

  inset(arg0: SizeData | PointData | number, arg1 = 0): Rectangle {
    if (typeof arg0 === 'object') {
      if ('width' in arg0) {
        return new Rectangle(
          this.#origin.moveBy(arg0.width / 2, arg0.height / 2),
          this.#size.resizeBy(-arg0.width, -arg0.height)
        );
      }

      return new Rectangle(
        this.#origin.moveBy(arg0.x / 2, arg0.y / 2),
        this.#size.resizeBy(-arg0.x, -arg0.y)
      );
    }

    return new Rectangle(
      this.#origin.moveBy(arg0 / 2, arg1 / 2),
      this.#size.resizeBy(-arg0, -arg1)
    );
  }

  private getPartForPoint({ x, y }: PointData): RectanglePart {
    const left = compare.float(x, this.left);
    const right = compare.float(x, this.right);
    const top = compare.float(y, this.top);
    const bottom = compare.float(y, this.bottom);

    if (left < 0 || right > 0 || top < 0 || bottom > 0) return 'outside';

    if (left === 0) {
      if (top === 0) return 'top-left';

      return bottom === 0 ? 'bottom-left' : 'left';
    }

    if (right === 0) {
      if (top === 0) return 'top-right';

      return bottom === 0 ? 'bottom-right' : 'right';
    }

    if (top === 0) return 'top';

    return bottom === 0 ? 'bottom' : 'inside';
  }
}
