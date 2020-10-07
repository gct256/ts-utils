import { PointData } from '../types/PointData';
import { SizeData } from '../types/SizeData';
import { BaseObject } from './BaseObject';
/** Size object. */
export declare class Size extends BaseObject<SizeData> implements SizeData {
    /** @implements */
    readonly width: number;
    /** @implements */
    readonly height: number;
    private constructor();
    /**
     * Create an object from an size data.
     *
     * @param data - Size data.
     */
    static of(data: SizeData): Size;
    /**
     * Create an object from a width and height.
     *
     * @param width - Width.
     * @param height - Height.
     */
    static fromWH(width: number, height: number): Size;
    /** @overrides */
    compare(other: SizeData): number;
    /** @overrides */
    valueOf(): SizeData;
    /**
     * Return true if empty.
     */
    isEmpty(): boolean;
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
}
