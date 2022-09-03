import { add, mul } from "./mathFunction";

describe("Math function test", () => {
  it("Add function test", () => {
    expect(add(4, 4)).toBe(8);
  });

  it("Mul function test", () => {
    expect(mul(2, 4)).toBe(8);
  });
});
