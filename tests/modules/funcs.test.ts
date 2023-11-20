import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";

import { funcs } from "../../src/modules/funcs.ts";

Deno.test("funcs.noop", () => {
  assertEquals(funcs.noop(), undefined);
  assertEquals(funcs.noop(1, 2, 3), undefined);
});
