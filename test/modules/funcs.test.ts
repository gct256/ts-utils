import { noop } from "../../deno/modules/funcs.ts";
import { assertEquals } from "../test-deps.ts";

Deno.test("noop()", () => {
  assertEquals(typeof noop, "function");
});

Deno.test("noop() - return undefined", () => {
  assertEquals(noop(), undefined);
});

Deno.test("noop() - any arguments", () => {
  assertEquals(noop(1, 2, 3), undefined);
  assertEquals(noop("foo"), undefined);
});
