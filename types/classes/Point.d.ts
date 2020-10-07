import { PointData } from '../types/PointData';
import { BaseObject } from './BaseObject';
/** Point object. */
export declare class Point extends BaseObject<PointData> implements PointData {
    /** @implements */
    readonly x: number;
    /** @implements */
    readonly y: number;
    private constructor();
    /**
     * Create an object from an point data.
     *
     * @param data - Point data.
     */
    static of(data: PointData): Point;
    /**
     * Create an object from a coordinate.
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    static fromXY(x: number, y: number): Point;
    /** @override */
    compare(other: PointData): number;
    /** @override */
    valueOf(): PointData;
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
    /**
     * Get distance from the origin.
     *
     * @param squared - If true, return squared value.
     */
    getDistanceFromOrigin(squared?: boolean): number;
    /**
     * Get distance from the other point.
     *
     * @param point - Other point.
     * @param squared - If true, return squared value.
     */
    getDistance(point: PointData, squared?: boolean): number;
}
