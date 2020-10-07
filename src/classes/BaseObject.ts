import { Validatable } from '../modules/compare';

/** Base object. */
export abstract class BaseObject<T> implements Validatable {
  #valid: boolean;

  /**
   * Create an object.
   *
   * @param valid - If it is true, having valid parameters.
   */
  protected constructor(valid: boolean) {
    this.#valid = valid;
  }

  /**
   * Compare with other data.
   *
   * @param other - Other data.
   */
  abstract compare(other: T): number;

  /**
   * Get data of an object.
   */
  abstract valueOf(): T;

  /**
   * Return true if other data has the same parameters.
   *
   * @param other - Other data.
   */
  isEqual(other: T): boolean {
    return this.compare(other) === 0;
  }

  /** @implements */
  isValid(): boolean {
    return this.#valid;
  }
}
