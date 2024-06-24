/**
 *
 * @param numbers Array of numbers that will be used for summation process
 * @param initalValue Initial value that summation will start off
 * @returns Result number of summation, sum.
 */
function sum(numbers: number[], initalValue: number = 0): number {
  return numbers.reduce((acc, curr) => acc + curr, initalValue);
}

/**
 *
 * @param numbers numbers Array of numbers that will be used for subtraction
 * @param initalValue Initial value that subtraction will start off - e.g. if initalValue is 10, think as statment will be prefixed with "10 -" -
 * @returns Result number of subtraction, diff.
 */
function diff(numbers: number[], initialValue?: number): number {
  if (numbers.length === 0) return initialValue || 0;
  const [first, ...rest] = numbers;
  const start = initialValue !== undefined ? initialValue : first;
  return rest.reduce((acc, curr) => acc - curr, start);
}

/**
 *
 * @param value Number or array of numbers.
 * @returns If number given, will return rounded value of the given number, else if array of numbers passed, will return given array with all it's values rounded.
 */
function round(value: number): number;
function round(value: number[]): number[];
function round(value: number | number[]): number | number[] {
  const { round: _round } = Math;
  if (Array.isArray(value)) return value.map((n) => _round(n));
  return _round(value);
}

/**
 *
 * @param value Number or array of numbers.
 * @returns If number given, will return floored value of the given number, else if array of numbers passed, will return given array with all it's values floored.
 */
function floor(value: number): number;
function floor(value: number[]): number[];
function floor(value: number | number[]): number | number[] {
  const { floor: _floor } = Math;
  if (Array.isArray(value)) return value.map((n) => _floor(n));
  return _floor(value);
}

/**
 *
 * @param value Number or array of numbers.
 * @returns If number given, will return ceiled value of the given number, else if array of numbers passed, will return given array with all it's values ceiled.
 */
function ceil(value: number): number;
function ceil(value: number[]): number[];
function ceil(value: number | number[]): number | number[] {
  const { ceil: _ceil } = Math;
  if (Array.isArray(value)) return value.map((n) => _ceil(n));
  return _ceil(value);
}

/**
 *
 * @param value Number or array of numbers.
 * @returns If number given, will return absolute value of the given number, else if array of numbers passed, will return given array with all it's values absolutized*.
 */
function abs(value: number): number;
function abs(value: number[]): number[];
function abs(value: number | number[]): number | number[] {
  const { abs: _abs } = Math;
  if (Array.isArray(value)) return value.map((n) => _abs(n));
  return _abs(value);
}

/**
 * 
 * @param x Number that represents dividend
 * @param y Number that represents divisor
 * @returns Result of division, quotient.
 */
function divide(x: number, y: number): number {
  if ([x, y].includes(0))
    throw new Error("Invalid operation, got 0 for division!");
  return x / y;
}

/**
 * 
 * @param x Number that represents multiplicand
 * @param y Number that represents multiplier
 * @returns Result of multiplication, product.
 */
function multiply(x: number, y: number): number {
  return x * y;
}

/**
 * 
 * @param min Minimum number value that result integer can be, inclusive.
 * @param max Maximum number value that result integer can be, inclusive.
 * @returns Integer that is equal or greater than min and equal or less than max, result.
 */
function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { sum, diff, abs, round, floor, ceil, divide, multiply, randomInteger };
