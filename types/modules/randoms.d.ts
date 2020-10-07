declare type RandomGenerator = () => number;
export declare const randoms: {
    /**
     * generate random value in range [0, 1)
     *
     * @return value.
     */
    random(generator?: RandomGenerator): number;
    /**
     * generate interger random value in range [0, max]
     *
     * @return value.
     */
    randInt(max?: number, generator?: RandomGenerator): number;
    /**
     * generate interger random value in range [min, max]
     *
     * @return value.
     */
    randIntRange(min: number, max: number, generator?: RandomGenerator): number;
    /**
     * generate float random value in range [0, max]
     *
     * @return value.
     */
    randFloat(max?: number, generator?: RandomGenerator): number;
    /**
     * generate float random value in range [min, max]
     *
     * @return value.
     */
    randFloatRange(min: number, max: number, generator?: RandomGenerator): number;
    shuffle<T>(array: T[], generator?: RandomGenerator): T[];
};
export {};
