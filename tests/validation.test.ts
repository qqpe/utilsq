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

describe(isNumeric, () => {
  describe("when strict", () => {
    it("can return correct result when integer", () => {
      expect(isNumeric(1)).toBeTruthy();
    });

    it("can return correct result when double", () => {
      expect(isNumeric(1.4)).toBeTruthy();
    });

    it("can return correct result when integer excluded", () => {
      expect(isNumeric(1.4, { excludeIntegers: true })).toBeTruthy();
      expect(isNumeric(1, { excludeIntegers: true })).toBeFalsy();
    });

    it("can return correct result when double excluded", () => {
      expect(isNumeric(1, { excludeDoubles: true })).toBeTruthy();
      expect(isNumeric(1.4, { excludeDoubles: true })).toBeFalsy();
    });

    it("can return correct result and will ignore any symbol command", () => {
      expect(
        isNumeric(1.4, { symbols: { command: "allowOnlyDots" } })
      ).toBeTruthy();
      expect(
        isNumeric(1.4, { symbols: { command: "allowOnlyCommas" } })
      ).toBeTruthy();
      expect(
        isNumeric(1.4, { symbols: { command: "allowBothDotsAndCommas" } })
      ).toBeTruthy();
      expect(
        isNumeric(1.4, { symbols: { command: "allowNone" } })
      ).toBeTruthy();
      expect(
        isNumeric(1, { symbols: { command: "allowOnlyDots" } })
      ).toBeTruthy();
      expect(
        isNumeric(1, { symbols: { command: "allowOnlyCommas" } })
      ).toBeTruthy();
      expect(
        isNumeric(1, { symbols: { command: "allowBothDotsAndCommas" } })
      ).toBeTruthy();
      expect(isNumeric(1, { symbols: { command: "allowNone" } })).toBeTruthy();
    });
  });

  describe("when loose", () => {
    const _isNumeric: typeof isNumeric = (value, options = { loose: true }) =>
      isNumeric(value, { ...options, loose: true });
    it("can return correct result when integer", () => {
      expect(_isNumeric(1)).toBeTruthy();
      expect(_isNumeric("1")).toBeTruthy();
    });

    it("can return correct result when double", () => {
      expect(_isNumeric(1.4)).toBeTruthy();
      expect(_isNumeric("1.4")).toBeTruthy();
    });

    it("can return correct result when integer excluded", () => {
      expect(_isNumeric(1.4, { excludeIntegers: true })).toBeTruthy();
      expect(_isNumeric(1, { excludeIntegers: true })).toBeFalsy();
      expect(_isNumeric("1.4", { excludeIntegers: true })).toBeTruthy();
      expect(_isNumeric("1", { excludeIntegers: true })).toBeFalsy();
    });

    it("can return correct result when double excluded", () => {
      expect(_isNumeric(1, { excludeDoubles: true })).toBeTruthy();
      expect(_isNumeric(1.4, { excludeDoubles: true })).toBeFalsy();
      expect(_isNumeric("1", { excludeDoubles: true })).toBeTruthy();
      expect(_isNumeric("1.4", { excludeDoubles: true })).toBeFalsy();
    });

    describe("when symbol", () => {
      it("can return correct result when command allowOnlyDots provided", () => {
        expect(
          _isNumeric(1, { symbols: { command: "allowOnlyDots" } })
        ).toBeTruthy(); // is not string, ignored
        expect(
          _isNumeric(1.4, { symbols: { command: "allowOnlyDots" } })
        ).toBeTruthy(); // is not string, ignored

        expect(
          _isNumeric("1", { symbols: { command: "allowOnlyDots" } })
        ).toBeTruthy(); // no dot provided, allowed
        expect(
          _isNumeric("1.", { symbols: { command: "allowOnlyDots" } })
        ).toBeTruthy(); // dot provided right after whole number, will be rounded, ignored
        expect(
          _isNumeric("1.4.", { symbols: { command: "allowOnlyDots" } })
        ).toBeTruthy(); // dot provided right after fraction, will be rounded, ignored
        expect(
          _isNumeric("1.4", { symbols: { command: "allowOnlyDots" } })
        ).toBeTruthy(); // dot provided in the middle of the string, allowed
        expect(
          _isNumeric("1,4", { symbols: { command: "allowOnlyDots" } })
        ).toBeFalsy(); // comma provided, restricted
      });

      it("can return correct result when command allowOnlyCommas provided", () => {
        expect(
          _isNumeric(1, { symbols: { command: "allowOnlyCommas" } })
        ).toBeTruthy(); // is not string, ignored
        expect(
          _isNumeric(1.4, { symbols: { command: "allowOnlyCommas" } })
        ).toBeTruthy(); // is not string, ignored

        expect(
          _isNumeric("1", { symbols: { command: "allowOnlyCommas" } })
        ).toBeTruthy(); // no comma provided, allowed
        expect(
          _isNumeric("1,", { symbols: { command: "allowOnlyCommas" } })
        ).toBeFalsy(); // comma provided right after whole number and as last character of string, restricted
        expect(
          _isNumeric("1,4,", { symbols: { command: "allowOnlyCommas" } })
        ).toBeFalsy(); // comma provided right after fraction and as last character of string, restricted
        expect(
          _isNumeric("1,4", { symbols: { command: "allowOnlyCommas" } })
        ).toBeTruthy(); // comma provided in the middle of the string, allowed
        expect(
          _isNumeric("1.4", { symbols: { command: "allowOnlyCommas" } })
        ).toBeFalsy(); // dot provided, restricted
      });

      it("can return correct result when command allowBothDotsAndCommas provided", () => {
        expect(
          _isNumeric(1, { symbols: { command: "allowBothDotsAndCommas" } })
        ).toBeTruthy(); // is not string, ignored
        expect(
          _isNumeric(1.4, { symbols: { command: "allowBothDotsAndCommas" } })
        ).toBeTruthy(); // is not string, ignored

        expect(
          _isNumeric("1", { symbols: { command: "allowBothDotsAndCommas" } })
        ).toBeTruthy(); // no comma or dot provided, allowedc

        expect(
          _isNumeric("1.", { symbols: { command: "allowBothDotsAndCommas" } })
        ).toBeTruthy(); // dot provided right after whole number, will be rounded, ignored
        expect(
          _isNumeric("1,", { symbols: { command: "allowBothDotsAndCommas" } })
        ).toBeFalsy(); // comma provided right after whole number and as last character of string, restricted

        expect(
          _isNumeric("1.4.", { symbols: { command: "allowBothDotsAndCommas" } })
        ).toBeTruthy(); // dot provided right after fraction, will be rounded, ignored
        expect(
          _isNumeric("1,4,", { symbols: { command: "allowBothDotsAndCommas" } })
        ).toBeFalsy(); // comma provided right after fraction and as last character of string, restricted

        expect(
          _isNumeric("1.4", { symbols: { command: "allowBothDotsAndCommas" } })
        ).toBeTruthy(); // dot provided in the middle of the string, allowed
        expect(
          _isNumeric("1,4", { symbols: { command: "allowBothDotsAndCommas" } })
        ).toBeTruthy(); // comma provided, restricted

        expect(
          _isNumeric("1.4", { symbols: { command: "allowOnlyDots" } })
        ).toBeTruthy(); // dot provided in the middle of the string, allowed
        expect(
          _isNumeric("1,4", { symbols: { command: "allowBothDotsAndCommas" } })
        ).toBeTruthy(); // comma provided in the middle of the string, allowed

        expect(
          _isNumeric("1.4,4", {
            symbols: { command: "allowBothDotsAndCommas" },
          })
        ).toBeTruthy(); // dot and comma provided, allowed
      });

      it("can return correct result when command allowNone provided", () => {
        expect(
          _isNumeric(1, { symbols: { command: "allowNone" } })
        ).toBeTruthy(); // is not string, ignored
        expect(
          _isNumeric(1.4, { symbols: { command: "allowNone" } })
        ).toBeTruthy(); // is not string, ignored

        expect(
          _isNumeric("1", { symbols: { command: "allowNone" } })
        ).toBeTruthy(); // no symbol provided, allowed

        expect(
          _isNumeric("1,", { symbols: { command: "allowNone" } })
        ).toBeFalsy(); // symbol provided, restricted
        expect(
          _isNumeric("1,4,", { symbols: { command: "allowNone" } })
        ).toBeFalsy(); // symbol provided, restricted
        expect(
          _isNumeric("1,4", { symbols: { command: "allowNone" } })
        ).toBeFalsy(); // symbol provided, restricted
        expect(
          _isNumeric("1.4", { symbols: { command: "allowNone" } })
        ).toBeFalsy(); // symbol provided, restricted
      });
    });
  });
});
