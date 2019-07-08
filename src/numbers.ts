// tslint:disable: no-unsafe-any

export namespace numbers {
  /**
   * Calculate the remainder like Python.
   *
   * @param a dividend.
   * @param b divisor. If it is 0 the result will always be NaN.
   * @returns result.
   */
  export function modulo(a: any, b: any): number {
    if (!Number.isFinite(+a) || !Number.isFinite(+b)) return NaN;
    const c: number = +a;
    const d: number = +b;
    if (d === 0) return NaN;
    if (c === 0 || c === d || -c === d) return 0;
    if ((c > 0 && d > 0) || (c < 0 && d < 0)) return c % d;

    return (c % d) + d;
  }

  /**
   * Return adjusted value between min value and max value.
   *
   * @param a target value.
   * @param defaultValue default value.
   */
  export function clamp(a: any, min: number, max: number): number {
    if (
      !Number.isFinite(+a) ||
      !Number.isFinite(+min) ||
      !Number.isFinite(+max)
    ) {
      return NaN;
    }

    const b: number = +a;
    const mi: number = +min;
    const ma: number = +max;

    return b < mi ? mi : b > ma ? ma : b;
  }

  /**
   * Wrapper for Math.floor with fallback to default value.
   *
   * @param a target value.
   * @param defaultValue default value.
   */
  export function floor(a: any, defaultValue: number = 0): number {
    return Number.isFinite(+a) ? Math.floor(a) : defaultValue;
  }

  /**
   * Wrapper for Math.ceil with fallback to default value.
   *
   * @param a target value.
   * @param defaultValue default value.
   */
  export function ceil(a: any, defaultValue: number = 0): number {
    return Number.isFinite(+a) ? Math.ceil(a) : defaultValue;
  }

  /**
   * Wrapper for Math.round with fallback to default value.
   *
   * @param a target value.
   * @param defaultValue default value.
   */
  export function round(a: any, defaultValue: number = 0): number {
    return Number.isFinite(+a) ? Math.round(a) : defaultValue;
  }
}
