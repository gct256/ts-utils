import { compare } from "../modules/compare.ts";
import { PointData } from "../types/PointData.ts";

import { BaseObject } from "./BaseObject.ts";

/** Point object. */
export class Point extends BaseObject<PointData> implements PointData {
  /** @implements */
  readonly x: number;
  /** @implements */
  readonly y: number;

  //
  // constructor (private)
  //

  private constructor({ x, y }: PointData) {
    super(Number.isFinite(x) && Number.isFinite(y));

    this.x = this.isValid() ? x : NaN;
    this.y = this.isValid() ? y : NaN;
  }

  //
  // static methods
  //

  /**
   * Create an object from an point data.
   *
   * @param data - Point data.
   */
  static of(data: PointData): Point {
    return new Point(data);
  }

  /**
   * Create an object from a coordinate.
   *
   * @param x - X coordinate.
   * @param y - Y coordinate.
   */
  static fromXY(x: number, y: number): Point {
    return new Point({ x, y });
  }

  //
  // overrides
  //

  /** @override */
  compare(other: PointData): number {
    const point = new Point(other);

    return compare.groups(
      compare.validatable(this, point),
      compare.float(this.x, other.x),
      compare.float(this.y, other.y),
    );
  }

  /** @override */
  valueOf(): PointData {
    return {
      x: this.x,
      y: this.y,
    };
  }

  //
  // methods
  //

  /**
   * Create a new object with delta.
   *
   * @param pointDelta - Point delta.
   */
  moveBy(pointDelta: PointData): Point;

  /**
   * Create a new object with delta.
   *
   * @param xDelta - X delta.
   * @param yDelta - Y delta.
   */
  moveBy(xDelta: number, yDelta: number): Point;

  moveBy(arg0: PointData | number, arg1 = 0): Point {
    if (typeof arg0 === "object") {
      return new Point({
        x: this.x + arg0.x,
        y: this.y + arg0.y,
      });
    }

    return new Point({
      x: this.x + arg0,
      y: this.y + arg1,
    });
  }

  /**
   * Get distance from the origin.
   *
   * @param squared - If true, return squared value.
   */
  getDistanceFromOrigin(squared = false): number {
    if (!this.isValid()) return NaN;

    const d = this.x ** 2 + this.y ** 2;

    return squared ? d : Math.sqrt(d);
  }

  /**
   * Get distance from the other point.
   *
   * @param point - Other point.
   * @param squared - If true, return squared value.
   */
  getDistance(point: PointData, squared = false): number {
    const p = new Point(point);

    if (!this.isValid() || !p.isValid()) return NaN;

    const d = (this.x - p.x) ** 2 + (this.y - p.y) ** 2;

    return squared ? d : Math.sqrt(d);
  }
}
