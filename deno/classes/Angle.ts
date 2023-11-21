import {
  compareAll,
  compareFloat,
  compareValidatable,
} from "../modules/compare.ts";
import { modulo } from "../modules/numbers.ts";
import { AngleData } from "../types/AngleData.ts";
import { PointData } from "../types/PointData.ts";

import { BaseObject } from "./BaseObject.ts";
import { Point } from "./Point.ts";

const DEGREE_TO_RADIAN = Math.PI / 180;
const RADIAN_TO_DEGREE = 180 / Math.PI;

/** Angle object. */
export class Angle extends BaseObject<AngleData> implements AngleData {
  /** @implements */
  readonly radian: number;
  /** @implements */
  readonly degree: number;

  #cos: number | undefined;
  #sin: number | undefined;
  #tan: number | undefined;

  //
  // constructor (private)
  //

  private constructor({ radian, degree }: AngleData) {
    super(Number.isFinite(radian) && Number.isFinite(degree));

    this.radian = this.isValid() ? radian : NaN;
    this.degree = this.isValid() ? degree : NaN;

    this.#cos = undefined;
    this.#sin = undefined;
    this.#tan = undefined;
  }

  //
  // static methods
  //

  /**
   * Create an object from an angle data.
   *
   * @param data - Angle data.
   * @param strict - If true, throw Error a radian and degree not match.
   */
  static of({ radian, degree }: AngleData, strict = false): Angle {
    if (strict && compareFloat(radian * RADIAN_TO_DEGREE, degree) !== 0) {
      throw new Error("radian and degree not match.");
    }

    return new Angle({ radian: degree * DEGREE_TO_RADIAN, degree });
  }

  /**
   * Create an object from a radian value.
   *
   * @param radian - Radian value.
   */
  static fromRadian(radian: number): Angle {
    return new Angle({ radian, degree: radian * RADIAN_TO_DEGREE });
  }

  /**
   * Create an object from a degree value.
   *
   * @param degree - Degree value.
   */
  static fromDegree(degree: number): Angle {
    return new Angle({ radian: degree * DEGREE_TO_RADIAN, degree });
  }

  /**
   * Create an object from an angle from origin to coordinate.
   *
   * @param x - X coordinate.
   * @param y - Y coordinate.
   */
  static fromXY(x: number, y: number): Angle {
    return Angle.fromRadian(Math.atan2(y, x));
  }

  /**
   * Create an object from an angle from origin to point.
   *
   * @param point - Point data.
   */
  static fromPoint(point: PointData): Angle {
    return Angle.fromRadian(Math.atan2(point.y, point.x));
  }

  //
  // overrides
  //

  /** @override */
  compare(other: AngleData): number {
    const angle = new Angle(other);

    return compareAll(
      compareValidatable(this, angle),
      compareFloat(this.radian, angle.radian),
    );
  }

  /** @override */
  valueOf(): AngleData {
    return {
      radian: this.radian,
      degree: this.degree,
    };
  }

  //
  // methods
  //

  /**
   * Create normalized angle object with range: -180 < degree <= 180.
   */
  normalize(): Angle {
    const degree = modulo(this.degree, 360);

    return Angle.fromDegree(degree > 180 ? degree - 360 : degree);
  }

  /**
   * Create normalized angle object with range: 0 <= degree < 360.
   */
  normalizeIn360(): Angle {
    return Angle.fromDegree(modulo(this.degree, 360));
  }

  /**
   * Create a new object with the added radian.
   *
   * @param radian - Radian value.
   */
  addRadian(radian: number): Angle {
    return Angle.fromRadian(this.radian + radian);
  }

  /**
   * Create a new object with the added degree.
   *
   * @param degree - Degree value.
   */
  addDegree(degree: number): Angle {
    return Angle.fromDegree(this.degree + degree);
  }

  /**
   * Create a new object with the added angles.
   *
   * @param angle - Angle data.
   */
  add(angle: AngleData): Angle {
    return Angle.fromDegree(this.degree + angle.degree);
  }

  /**
   * Create a new object by multiplying the angle by a multiplier.
   *
   * @param multiplier - Multiplier.
   */
  multiple(multiplier: number): Angle {
    return Angle.fromDegree(this.degree * multiplier);
  }

  /**
   * Get cos value.
   */
  getCos(): number {
    // eslint-disable-next-line no-return-assign
    return this.#cos ?? (this.#cos = Math.cos(this.radian));
  }

  /**
   * Get sin value.
   */
  getSin(): number {
    // eslint-disable-next-line no-return-assign
    return this.#sin ?? (this.#sin = Math.sin(this.radian));
  }

  /**
   * Get tan value.
   */
  getTan(): number {
    // eslint-disable-next-line no-return-assign
    return this.#tan ?? (this.#tan = Math.tan(this.radian));
  }

  /**
   * Get point delta.
   *
   * @param size - Size.
   */
  getPointDelta(size: number): Point {
    return Point.of({
      x: this.getCos() * size,
      y: this.getSin() * size,
    });
  }
}
