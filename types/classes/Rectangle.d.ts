import { PointData } from '../types/PointData';
import { RectangleData } from '../types/RectangleData';
import { SizeData } from '../types/SizeData';
import { BaseObject } from './BaseObject';
/** Rectangle constructor's parameter. */
declare type RectangleParameter = Pick<RectangleData, 'left' | 'right' | 'top' | 'bottom'>;
/** Rectangle object. */
export declare class Rectangle extends BaseObject<RectangleData> implements RectangleData {
    #private;
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
    private constructor();
    /**
     * Create an object from a rectangle data.
     *
     * @param data - Rectangle data.
     */
    static of({ left, right, top, bottom }: RectangleParameter | RectangleData): Rectangle;
    /**
     * Create an object from top-left point and size.
     *
     * @param x - X coordinate of top-left point.
     * @param y - Y coordinate of top-left point.
     * @param width - Width.
     * @param height - Height.
     */
    static fromXYWH(x: number, y: number, width: number, height: number): Rectangle;
    /**
     * Create an object from diagonal point pair.
     *
     * @param p0 - Point.
     * @param p1 - Another point.
     */
    static fromPointPair(p0: PointData, p1: PointData): Rectangle;
    /**
     * Create a rectangle that contains all the rectangles.
     *
     * @param rects - Rectangle data.
     */
    static union(...rects: RectangleData[]): Rectangle;
    /**
     * Create a rectangle at the intersection of all rectangles.
     * If there is no intersection, it returns an invalid rectangle.
     *
     * @param rects - Rectangle data.
     */
    static intersection(...rects: RectangleData[]): Rectangle;
    /** Invalid rectangle object. */
    private static readonly INVALID;
    /** @override */
    compare(other: RectangleData): number;
    /** @override */
    valueOf(): RectangleData;
    /**
     * Return the point data of origin.
     */
    get origin(): PointData;
    /**
     * Return the point data of top-left.
     */
    get topLeft(): PointData;
    /**
     * Return the point data of top-right.
     */
    get topRight(): PointData;
    /**
     * Return the point data of bottom-left.
     */
    get bottomLeft(): PointData;
    /**
     * Return the point data of bottom-right.
     */
    get bottomRight(): PointData;
    /**
     * Return the size data of the rectangle.
     */
    get size(): SizeData;
    /**
     * Return true if empty.
     */
    isEmpty(): boolean;
    /**
     * Return true if point in rectangle.
     *
     * @param point - Point data.
     * @param excludeEdge - If true, exclude point in edge case.
     */
    isPointContains(point: PointData, excludeEdge?: boolean): boolean;
    /**
     * Return true if another rectangle in rectangle.
     *
     * @param rect - Another rectangle data.
     * @param excludeEdge - If true, exclude point in edge case.
     */
    isContains(rect: RectangleData, excludeEdge?: boolean): boolean;
    /**
     * Return true if another rectangle has intersection with rectangle.
     *
     * @param rect - Another rectangle data.
     * @param excludeEdge - If true, exclude point in edge case.
     */
    isIntersects(rect: RectangleData, excludeEdge?: boolean): boolean;
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
    private getPartForPoint;
}
export {};
