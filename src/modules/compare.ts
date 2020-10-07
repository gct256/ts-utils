/** Validatable object. */
export type Validatable = {
  /**
   * Return true if having valid parameters.
   */
  isValid(): boolean;
};

/** Utility for value comparison. */
export const compare = {
  /**
   * Compare data using.
   *
   * @param a - Data.
   * @param b - Another data.
   */
  data<T>(a: T, b: T): number {
    if (a < b) return -1;

    return a > b ? 1 : 0;
  },

  /**
   * Compare numbers.
   *
   * @param a - Number.
   * @param b - Another number.
   */
  number(a: number, b: number): number {
    if (Number.isNaN(a)) {
      return Number.isNaN(b) ? 0 : -1;
    }

    return Number.isNaN(b) ? 1 : compare.data(a, b);
  },

  /**
   * Compare numbers with precision.
   *
   * @param a - Number.
   * @param b - Another number.
   * @param precision - Precision.
   */
  float(a: number, b: number, precision = 8): number {
    if (Number.isNaN(a)) {
      return Number.isNaN(b) ? 0 : -1;
    }

    if (Number.isNaN(b)) return 1;

    if (a === b) return 0;

    if (Math.abs(a - b) <= 10 ** -precision) return 0;

    return a < b ? -1 : 1;
  },

  /**
   * Compare validatable objects.
   * If invalid both, return NaN.
   *
   * @param a - Validatable object.
   * @param b - Another validatable object.
   */
  validatable(a: Validatable, b: Validatable): number {
    if (!a.isValid()) {
      return b.isValid() ? -1 : NaN;
    }

    return b.isValid() ? 0 : 1;
  },

  /**
   * Return the first non-zero value of the comparator's results.
   * If the result is NaN, return 0.
   *
   * @param compareResults - Comparator's results.
   */
  groups(...compareResults: number[]): number {
    const result =
      compareResults.find(
        (x) => Number.isNaN(x) || (Number.isFinite(x) && x !== 0)
      ) ?? 0;

    return Number.isNaN(result) ? 0 : result;
  }
};
