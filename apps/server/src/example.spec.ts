import assert from "assert";
import { describe, it } from "node:test";

function addTwoNumbers(a: number, b: number) {
  return a + b;
}

describe("addTwoNumbers", () => {
  it("adds two numbers correctly", () => {
    assert.strictEqual(addTwoNumbers(1, 2), 3);
    assert.strictEqual(addTwoNumbers(-1, 1), 0);
    assert.strictEqual(addTwoNumbers(0, 0), 0);
  });

  it("adds 2 large numbers correctly", () => {
    assert.strictEqual(addTwoNumbers(1e10, 1e10), 2e10);
  });
});
