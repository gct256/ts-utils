import { AngleData } from '../types/AngleData';
import { PointData } from '../types/PointData';
import { BaseObject } from './BaseObject';
import { Point } from './Point';
/** Angle object. */
export declare class Angle extends BaseObject<AngleData> implements AngleData {
    #private;
    /** @implements */
    readonly radian: number;
    /** @implements */
    readonly degree: number;
    private constructor();
    /**
     * Create an object from an angle data.
     *
     * @param data - Angle data.
     * @param strict - If true, throw Error a radian and degree not match.
     */
    static of({ radian, degree }: AngleData, strict?: boolean): Angle;
    /**
     * Create an object from a radian value.
     *
     * @param radian - Radian value.
     */
    static fromRadian(radian: number): Angle;
    /**
     * Create an object from a degree value.
     *
     * @param degree - Degree value.
     */
    static fromDegree(degree: number): Angle;
    /**
     * Create an object from an angle from origin to coordinate.
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    static fromXY(x: number, y: number): Angle;
    /**
     * Create an object from an angle from origin to point.
     *
     * @param point - Point data.
     */
    static fromPoint(point: PointData): Angle;
    /** @override */
    compare(other: AngleData): number;
    /** @override */
    valueOf(): AngleData;
    /**
     * Create normalized angle object with range: -180 < degree <= 180.
     */
    normalize(): Angle;
    /**
     * Create normalized angle object with range: 0 <= degree < 360.
     */
    normalizeIn360(): Angle;
    /**
     * Create a new object with the added radian.
     *
     * @param radian - Radian value.
     */
    addRadian(radian: number): Angle;
    /**
     * Create a new object with the added degree.
     *
     * @param degree - Degree value.
     */
    addDegree(degree: number): Angle;
    /**
     * Create a new object with the added angles.
     *
     * @param angle - Angle data.
     */
    add(angle: AngleData): Angle;
    /**
     * Create a new object by multiplying the angle by a multiplier.
     *
     * @param multiplier - Multiplier.
     */
    multiple(multiplier: number): Angle;
    /**
     * Get cos value.
     */
    getCos(): number;
    /**
     * Get sin value.
     */
    getSin(): number;
    /**
     * Get tan value.
     */
    getTan(): number;
    /**
     * Get point delta.
     *
     * @param size - Size.
     */
    getPointDelta(size: number): Point;
}
