export declare namespace numbers {
    /**
     * Calculate the remainder like Python.
     *
     * @param a dividend.
     * @param b divisor. If it is 0 the result will always be NaN.
     * @returns result.
     */
    function modulo(a: any, b: any): number;
    /**
     * Wrapper for Math.floor with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    function clamp(a: any, min: number, max: number): number;
    /**
     * Wrapper for Math.floor with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    function floor(a: any, defaultValue?: number): number;
    /**
     * Wrapper for Math.ceil with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    function ceil(a: any, defaultValue?: number): number;
    /**
     * Wrapper for Math.round with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    function round(a: any, defaultValue?: number): number;
}
