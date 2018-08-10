import { funcs } from '../src/funcs';

describe('funcs', () => {
  test('noop', () => {
    expect(funcs.noop()).toBe(undefined);
    expect(funcs.noop(1, 2, 3)).toBe(undefined);
  });
});
