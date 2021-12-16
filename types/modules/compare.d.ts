/** Validatable object. */
export declare type Validatable = {
    /**
     * Return true if having valid parameters.
     */
    isValid(): boolean;
};
/** Utility for value comparison. */
export declare const compare: {
    /**
     * Compare data using.
     *
     * @param a - Data.
     * @param b - Another data.
     */
    data<T>(a: T, b: T): number;
    /**
     * Compare numbers.
     *
     * @param a - Number.
     * @param b - Another number.
     */
    number(a: number, b: number): number;
    /**
     * Compare numbers with precision.
     *
     * @param a - Number.
     * @param b - Another number.
     * @param precision - Precision.
     */
    float(a: number, b: number, precision?: number): number;
    /**
     * Compare validatable objects.
     * If invalid both, return NaN.
     *
     * @param a - Validatable object.
     * @param b - Another validatable object.
     */
    validatable(a: Validatable, b: Validatable): number;
    /**
     * Return the first non-zero value of the comparator's results.
     * If the result is NaN, return 0.
     *
     * @param compareResults - Comparator's results.
     */
    groups(...compareResults: number[]): number;
};
