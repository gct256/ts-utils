import { Validatable } from '../modules/compare';
/** Base object. */
export declare abstract class BaseObject<T> implements Validatable {
    #private;
    /**
     * Create an object.
     *
     * @param valid - If it is true, having valid parameters.
     */
    protected constructor(valid: boolean);
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
    isEqual(other: T): boolean;
    /** @implements */
    isValid(): boolean;
}
