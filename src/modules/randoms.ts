type RandomGenerator = () => number;

const defaultRandomGenerator = (): number =>
  Math.floor(Math.random() * 0x100000000);

export const randoms = {
  /**
   * generate random value in range [0, 1)
   *
   * @return value.
   */
  random(generator: RandomGenerator = defaultRandomGenerator): number {
    return generator() / 0x100000000;
  },

  /**
   * generate integer random value in range [0, max]
   *
   * @return value.
   */
  randInt(
    max = 0xffffffff,
    generator: RandomGenerator = defaultRandomGenerator
  ): number {
    const value: number = (generator() / 0xffffffff) * max;

    return value > 0 ? Math.floor(value) : Math.ceil(value);
  },

  /**
   * generate integer random value in range [min, max]
   *
   * @return value.
   */
  randIntRange(
    min: number,
    max: number,
    generator: RandomGenerator = defaultRandomGenerator
  ): number {
    const m0: number = min < max ? min : max;
    const m1: number = min < max ? max : min;
    const diff: number = m1 - m0;

    return Math.floor((generator() / 0xffffffff) * diff) + m0;
  },

  /**
   * generate float random value in range [0, max]
   *
   * @return value.
   */
  randFloat(
    max = 1,
    generator: RandomGenerator = defaultRandomGenerator
  ): number {
    return (generator() / 0xffffffff) * max;
  },

  /**
   * generate float random value in range [min, max]
   *
   * @return value.
   */
  randFloatRange(
    min: number,
    max: number,
    generator: RandomGenerator = defaultRandomGenerator
  ): number {
    const m0: number = min < max ? min : max;
    const m1: number = min < max ? max : min;
    const diff: number = m1 - m0;

    return (generator() / 0xffffffff) * diff + m0;
  },

  shuffle<T>(
    array: T[],
    generator: RandomGenerator = defaultRandomGenerator
  ): T[] {
    const result: T[] = [...array];

    let { length } = result;

    if (length < 2) return result;

    while (length > 0) {
      length -= 1;

      const i: number = Math.floor(randoms.randIntRange(0, length, generator));
      const tmp: T = result[length];

      result[length] = result[i];
      result[i] = tmp;
    }

    return result;
  }
};
