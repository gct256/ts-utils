export declare const numbers: {
    /**
     * Calculate the remainder like Python.
     *
     * @param a dividend.
     * @param b divisor. If it is 0 the result will always be NaN.
     * @returns result.
     */
    modulo(a: number, b: number): number;
    /**
     * Return adjusted value between min value and max value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    clamp(a: number, min: number, max: number): number;
    /**
     * Wrapper for Math.floor with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    floor(a: number, defaultValue?: number): number;
    /**
     * Wrapper for Math.ceil with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    ceil(a: number, defaultValue?: number): number;
    /**
     * Wrapper for Math.round with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    round(a: number, defaultValue?: number): number;
};
