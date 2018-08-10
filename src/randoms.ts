export namespace randoms {
  type RandomGenerator = () => number;

  function defaultRandomGenerator(): number {
    // tslint:disable-next-line:insecure-random
    return Math.floor(Math.random() * 0x100000000);
    // return [0, 0xffffffff]
  }

  /**
   * generate random value in range [0, 1)
   *
   * @return value.
   */
  export function random(
    generator: RandomGenerator = defaultRandomGenerator
  ): number {
    return generator() / 0x100000000;
  }

  /**
   * generate interger random value in range [0, max]
   *
   * @return value.
   */
  export function randInt(
    max: number = 0xffffffff,
    generator: RandomGenerator = defaultRandomGenerator
  ): number {
    const value: number = (generator() / 0xffffffff) * max;

    return value > 0 ? Math.floor(value) : Math.ceil(value);
  }

  /**
   * generate interger random value in range [min, max]
   *
   * @return value.
   */
  export function randIntRange(
    min: number,
    max: number,
    generator: RandomGenerator = defaultRandomGenerator
  ): number {
    const m0: number = min < max ? min : max;
    const m1: number = min < max ? max : min;
    const diff: number = m1 - m0;

    return Math.floor((generator() / 0xffffffff) * diff) + m0;
  }

  /**
   * generate float random value in range [0, max]
   *
   * @return value.
   */
  export function randFloat(
    max: number = 1,
    generator: RandomGenerator = defaultRandomGenerator
  ): number {
    return (generator() / 0xffffffff) * max;
  }

  /**
   * generate float random value in range [min, max]
   *
   * @return value.
   */
  export function randFloatRange(
    min: number,
    max: number,
    generator: RandomGenerator = defaultRandomGenerator
  ): number {
    const m0: number = min < max ? min : max;
    const m1: number = min < max ? max : min;
    const diff: number = m1 - m0;

    return (generator() / 0xffffffff) * diff + m0;
  }

  export function shuffle<T>(
    array: T[],
    generator: RandomGenerator = defaultRandomGenerator
  ): T[] {
    const result: T[] = [...array];
    let { length } = result;
    if (length < 2) return result;

    while (length > 0) {
      length -= 1;
      const i: number = Math.floor(randIntRange(0, length, generator));
      const tmp: T = result[length];
      result[length] = result[i];
      result[i] = tmp;
    }

    return result;
  }
}
