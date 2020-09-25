export const numbers = {
  /**
   * Calculate the remainder like Python.
   *
   * @param a dividend.
   * @param b divisor. If it is 0 the result will always be NaN.
   * @returns result.
   */
  modulo(a: number, b: number): number {
    if (!Number.isFinite(a) || !Number.isFinite(b)) return NaN;

    if (b === 0) return NaN;

    if (a === 0 || a === b || -a === b) return 0;

    if ((a > 0 && b > 0) || (a < 0 && b < 0)) return a % b;

    return (a % b) + b;
  },

  /**
   * Return adjusted value between min value and max value.
   *
   * @param a target value.
   * @param defaultValue default value.
   */
  clamp(a: number, min: number, max: number): number {
    if (!Number.isFinite(a) || !Number.isFinite(min) || !Number.isFinite(max)) {
      return NaN;
    }

    // eslint-disable-next-line no-nested-ternary
    return a < min ? min : a > max ? max : a;
  },

  /**
   * Wrapper for Math.floor with fallback to default value.
   *
   * @param a target value.
   * @param defaultValue default value.
   */
  floor(a: number, defaultValue = 0): number {
    return Number.isFinite(a) ? Math.floor(a) : defaultValue;
  },

  /**
   * Wrapper for Math.ceil with fallback to default value.
   *
   * @param a target value.
   * @param defaultValue default value.
   */
  ceil(a: number, defaultValue = 0): number {
    return Number.isFinite(+a) ? Math.ceil(a) : defaultValue;
  },

  /**
   * Wrapper for Math.round with fallback to default value.
   *
   * @param a target value.
   * @param defaultValue default value.
   */
  round(a: number, defaultValue = 0): number {
    return Number.isFinite(+a) ? Math.round(a) : defaultValue;
  }
};
