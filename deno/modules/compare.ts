import { Validatable } from "../types/Validatable.ts";

/**
 * Compare data using.
 *
 * @param a - Data.
 * @param b - Another data.
 */
export function compareData<T>(a: T, b: T): number {
  if (a < b) return -1;

  return a > b ? 1 : 0;
}

/**
 * Compare numbers.
 *
 * @param a - Number.
 * @param b - Another number.
 */
export function compareNumber<T extends number>(a: T, b: T): number {
  if (Number.isNaN(a)) {
    return Number.isNaN(b) ? 0 : -1;
  }

  return Number.isNaN(b) ? 1 : compareData(a, b);
}

/**
 * Compare numbers with precision.
 *
 * @param a - Number.
 * @param b - Another number.
 * @param precision - Precision.
 */
export function compareFloat<T extends number>(
  a: T,
  b: T,
  precision = 8,
): number {
  if (Number.isNaN(a)) {
    return Number.isNaN(b) ? 0 : -1;
  }

  if (Number.isNaN(b)) return 1;

  if (a === b) return 0;

  if (Math.abs(a - b) <= 10 ** -precision) return 0;

  return a < b ? -1 : 1;
}

/**
 * Compare validatable objects.
 * If invalid both, return NaN.
 *
 * @param a - Validatable object.
 * @param b - Another validatable object.
 */
export function compareValidatable(a: Validatable, b: Validatable): number {
  if (!a.isValid()) {
    return b.isValid() ? -1 : NaN;
  }

  return b.isValid() ? 0 : 1;
}

/**
 * Return the first non-zero value of the comparator's results.
 * If the result is NaN, return 0.
 *
 * @param compareResults - Comparator's results.
 */
export function compareAll(...compareResults: number[]): number {
  const result = compareResults.find(
    (x) => Number.isNaN(x) || (Number.isFinite(x) && x !== 0),
  ) ?? 0;

  return Number.isNaN(result) ? 0 : result;
}
