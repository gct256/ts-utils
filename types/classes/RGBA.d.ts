import { RGBAData } from '../types/RGBAData';
import { BaseObject } from './BaseObject';
/** RGB-based color object. */
export declare class RGBA extends BaseObject<RGBAData> implements RGBAData {
    /** @implements */
    readonly red: number;
    /** @implements */
    readonly green: number;
    /** @implements */
    readonly blue: number;
    /** @implements */
    readonly alpha: number;
    private static BLACK;
    private constructor();
    /**
     * Create an object from an color data.
     *
     * @param data - Color data.
     */
    static of(data: RGBAData): RGBA;
    /**
     * Create an object from red, green, and blue values.
     *
     * @param red - Red value. 0 <= n <= 255, integer.
     * @param green - Green value. 0 <= n <= 255, integer.
     * @param blue - Blue value. 0 <= n <= 255, integer.
     */
    static fromRGB(red: number, green: number, blue: number): RGBA;
    /**
     * Create an object from floating-point values of red, green, and blue.
     *
     * @param red - Red value. 0 <= n <= 1, float.
     * @param green - Green value. 0 <= n <= 1, float.
     * @param blue - Blue value. 0 <= n <= 1, float.
     */
    static fromRGBByFloat(red: number, green: number, blue: number): RGBA;
    /**
     * Create an object from red, green, blue, and alpha values.
     *
     * @param red - Red value. 0 <= n <= 255, integer.
     * @param green - Green value. 0 <= n <= 255, integer.
     * @param blue - Blue value. 0 <= n <= 255, integer.
     * @param alpha - Alpha value. 0 <= n <= 255, integer.
     */
    static fromRGBA(red: number, green: number, blue: number, alpha: number): RGBA;
    /**
     * Create an object from floating-point values of red, green, blue, and alpha.
     *
     * @param red - Red value. 0 <= n <= 1, float.
     * @param green - Green value. 0 <= n <= 1, float.
     * @param blue - Blue value. 0 <= n <= 1, float.
     * @param alpha - Alpha value. 0 <= n <= 1, float.
     */
    static fromRGBAByFloat(red: number, green: number, blue: number, alpha: number): RGBA;
    /**
     * Create an object from hex string.
     *
     * @param hexString - Hex string.
     * @param strict - If set ture, throw Error with illegal hex stirng format.
     * If set false, return black color with illegal hex stirng format.
     */
    static fromHexString(hexString: string, strict?: boolean): RGBA;
    /** @override */
    compare(other: RGBAData): number;
    /** @override */
    valueOf(): RGBAData;
    /**
     * Return a color string for CSS.
     *
     * @param omitAlpha - If true and alpha is 255, omit alpha parameter.
     */
    toString(omitAlpha?: boolean): string;
    /**
     * Return a hexadecimal color string for CSS.
     *
     * @param omitAlpha - If true and alpha is 255, omit alpha parameter.
     */
    toHexString(omitAlpha?: boolean): string;
}
