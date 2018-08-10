export declare namespace randoms {
    type RandomGenerator = () => number;
    /**
     * generate random value in range [0, 1)
     *
     * @return value.
     */
    function random(generator?: RandomGenerator): number;
    /**
     * generate interger random value in range [0, max]
     *
     * @return value.
     */
    function randInt(max?: number, generator?: RandomGenerator): number;
    /**
     * generate interger random value in range [min, max]
     *
     * @return value.
     */
    function randIntRange(min: number, max: number, generator?: RandomGenerator): number;
    /**
     * generate float random value in range [0, max]
     *
     * @return value.
     */
    function randFloat(max?: number, generator?: RandomGenerator): number;
    /**
     * generate float random value in range [min, max]
     *
     * @return value.
     */
    function randFloatRange(min: number, max: number, generator?: RandomGenerator): number;
}
