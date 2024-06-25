import { isString, isNumeric } from "../dist/utils/validation";

describe(isString, () => {
  it("can return correct result based on the given type", () => {
    expect(isString("")).toBeTruthy();
    expect(isString("test")).toBeTruthy();
    expect(isString({})).toBeFalsy();
    expect(isString({ test: "one" })).toBeFalsy();
    expect(isString([])).toBeFalsy();
    expect(isString(["test"])).toBeFalsy();
    expect(isString(0)).toBeFalsy();
    expect(isString(1)).toBeFalsy();
    expect(isString(Symbol())).toBeFalsy();
    expect(isString(() => 0)).toBeFalsy();
    expect(isString(() => 1)).toBeFalsy();
  });
});

// describe(isNumber, () => {
    
// })
