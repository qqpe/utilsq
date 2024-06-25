import {
  sum,
  diff,
  abs,
  round,
  floor,
  ceil,
  multiply,
  divide,
  randomInteger,
} from "../src/";

describe(sum, () => {
  it("can return sum of 2 integer values", () => {
    const _x = 1;
    const _y = 3;
    const _sum = _x + _y;
    expect(sum([_x, _y])).toBe(_sum);
  });

  it("can return sum of n integer values", () => {
    const _q = [
      1, 3, 4, 1, 2, 5, 76, 89, 231, 23, 4123, 132, 4, 1321, 324, 4324, 1213,
      241, 23, 32, 1, 11, 344,
    ];
    const _sum = _q.reduce((acc, curr) => acc + curr, 0);
    expect(sum([..._q])).toBe(_sum);
  });

  it("can return sum of 2 float values", () => {
    const _x = 1.4;
    const _y = 3.1;
    const _sum = _x + _y;
    expect(sum([_x, _y])).toBe(_sum);
  });

  it("can return sum of n float values", () => {
    const _q = [1.4, 3.1, 4.6, 1.8, 2.9, 5.7, 76.41, 89.5, 231.14, 23.64];
    const _sum = _q.reduce((acc, curr) => acc + curr, 0);
    expect(sum([..._q])).toBe(_sum);
  });

  it("can return sum of integer and float values", () => {
    const _q = [1.4, 3, 4.8, 9, 5.7, 76.41, 89.5, 231.14, 23];
    const _sum = _q.reduce((acc, curr) => acc + curr, 0);
    expect(sum([..._q])).toBe(_sum);
  });
});

describe(diff, () => {
  it("can return diff of 2 integer values", () => {
    const _x = 1;
    const _y = 3;
    const _diff = _x - _y;
    expect(diff([_x, _y])).toBe(_diff);
  });

  it("can return diff of n integer values", () => {
    const _f = 10;
    const _m = 3;
    const _z = 5;
    const _q = [_f, _m, _z];
    const _diff = _f - _m - _z;
    expect(diff([..._q])).toBe(_diff);
  });

  it("can return diff of 2 float values", () => {
    const _x = 1.4;
    const _y = 3.1;
    const _diff = _x - _y;
    expect(diff([_x, _y])).toBe(_diff);
  });

  it("can return diff of n float values", () => {
    const _f = 1.7;
    const _m = 3.1;
    const _z = 5.13;
    const _q = [_f, _m, _z];
    const _diff = _f - _m - _z;
    expect(diff([..._q])).toBe(_diff);
  });

  it("can return diff of integer and float values", () => {
    const _f = 1.7;
    const _m = 3;
    const _z = 5;
    const _k = 4.3;
    const _q = [_f, _m, _z, _k];
    const _diff = _f - _m - _z - _k;
    expect(diff([..._q])).toBe(_diff);
  });
});

describe(abs, () => {
  it("can return abs of a positive integer value", () => {
    const _q = abs(4);
    expect(_q === 4).toBeTruthy();
  });

  it("can return abs of a positive float value", () => {
    const _y = abs(1.4);
    expect(_y === 1.4).toBeTruthy();
  });

  it("can return abs of every positive integer value in array", () => {
    const _q = [1, 3, 9];
    expect(abs(_q)).toEqual([1, 3, 9]);
  });

  it("can return abs of every positive float value in array", () => {
    const _q = [1.3, 3.5, 9.1];
    expect(abs(_q)).toEqual([1.3, 3.5, 9.1]);
  });

  it("can return abs of a negative integer value", () => {
    const _q = abs(-4);
    expect(_q === 4).toBeTruthy();
  });

  it("can return abs of a negative float value", () => {
    const _y = abs(-1.4);
    expect(_y === 1.4).toBeTruthy();
  });

  it("can return abs of every negative integer value in array", () => {
    const _q = [-1, -3, -9];
    expect(abs(_q)).toEqual([1, 3, 9]);
  });

  it("can return abs of every negative float value in array", () => {
    const _q = [-1.3, -3.5, -9.1];
    expect(abs(_q)).toEqual([1.3, 3.5, 9.1]);
  });
});

describe(ceil, () => {
  it("can return ceil of a positive value", () => {
    const _q = ceil(1.4);
    const _y = ceil(1.8);
    expect(_q).toBe(2);
    expect(_y).toBe(2);
  });

  it("can return ceil of an array of positive values", () => {
    const _q = 1.8;
    const _y = 1.4;
    const _z = [ceil(_q), ceil(_y)];
    expect(_z).toEqual([2, 2]);
  });

  it("can return ceil of a negatie value", () => {
    const _q = ceil(-1.4);
    const _y = ceil(-1.8);
    expect(_q).toBe(-1);
    expect(_y).toBe(-1);
  });

  it("can return ceil of an array of negative values", () => {
    const _q = -1.8;
    const _y = -1.4;
    const _z = [ceil(_q), ceil(_y)];
    expect(_z).toEqual([-1, -1]);
  });
});

describe(floor, () => {
  it("can return floor of a positive float value", () => {
    const _q = floor(1.4);
    const _y = floor(1.8);
    expect(_q).toBe(1);
    expect(_y).toBe(1);
  });

  it("can return floor of an array of positive flaot values", () => {
    const _q = 1.4;
    const _y = 1.8;
    const _z = [floor(_q), floor(_y)];
    expect(_z).toEqual([1, 1]);
  });

  it("can return floor of a negative float value", () => {
    const _q = floor(-1.4);
    const _y = floor(-1.8);
    expect(_q).toBe(-2);
    expect(_y).toBe(-2);
  });

  it("can return floor of an array of negative float values", () => {
    const _q = -1.4;
    const _y = -1.8;
    const _z = [floor(_q), floor(_y)];
    expect(_z).toEqual([-2, -2]);
  });
});

describe(round, () => {
  it("can return round of a positive float value", () => {
    const _q = round(1.4);
    const _y = round(1.8);
    expect(_q).toBe(1);
    expect(_y).toBe(2);
  });

  it("can return round of a negatie float value", () => {
    const _q = round(-1.4);
    const _y = round(-1.8);
    const _k = round(-1.5);
    const _z = round(-1.51);
    expect(_q).toBe(-1);
    expect(_y).toBe(-2);
    expect(_k).toBe(-1);
    expect(_z).toBe(-2);
  });
});

describe(multiply, () => {
  it("can return multiplication result of two positive integer values", () => {
    const _q = 1;
    const _y = 2;
    const _res = multiply(_q, _y);
    expect(_res).toBe(2);
  });

  it("can return multiplication result of two positive float values", () => {
    const _q = 1.4;
    const _y = 2.2;
    const _res = multiply(_q, _y);
    expect(_res).toBe(3.08);
  });

  it("can return multiplication result of two negative integer values", () => {
    const _q = -1;
    const _y = -2;
    const _res = multiply(_q, _y);
    expect(_res).toBe(2);
  });

  it("can return multiplication result of two negative float values", () => {
    const _q = -1.4;
    const _y = -2.2;
    const _res = multiply(_q, _y);
    expect(_res).toBe(3.08);
  });

  it("can return multiplication result of one negative integer value and one positive integer value", () => {
    const _q = -1;
    const _y = 2;
    const _res = multiply(_q, _y);
    expect(_res).toBe(-2);
  });

  it("can return multiplication result of one negative float value and one positive float value", () => {
    const _q = -1.4;
    const _y = 2.2;
    const _res = multiply(_q, _y);
    expect(_res).toBe(-3.08);
  });

  it("can return multiplication result of one positive integer value and one positive float value", () => {
    const _q = 2;
    const _y = 2.2;
    const _res = multiply(_q, _y);
    expect(_res).toBe(4.4);
  });

  it("can return multiplication result of one positive integer value and one negative float value", () => {
    const _q = 2;
    const _y = -2.2;
    const _res = multiply(_q, _y);
    expect(_res).toBe(-4.4);
  });

  it("can return multiplication result of one negative integer value and one positive float value", () => {
    const _q = -2;
    const _y = 2.2;
    const _res = multiply(_q, _y);
    expect(_res).toBe(-4.4);
  });
});

describe(divide, () => {
  it("can return division result of two positive integer values", () => {
    const _q = 1;
    const _y = 2;
    const _res = divide(_q, _y);
    expect(_res).toBe(0.5);
  });

  it("can return division result of two positive float values", () => {
    const _q = 1.4;
    const _y = 2.2;
    const _res = divide(_q, _y);
    expect(Number(_res.toFixed(2))).toBe(0.64);
  });

  it("can return division result of two negative integer values", () => {
    const _q = -1;
    const _y = -2;
    const _res = divide(_q, _y);
    expect(_res).toBe(0.5);
  });

  it("can return division result of two negative float values", () => {
    const _q = -1.4;
    const _y = -2.2;
    const _res = divide(_q, _y);
    expect(Number(_res.toFixed(2))).toBe(0.64);
  });

  it("can return division result of one negative integer value and one positive integer value", () => {
    const _q = -1;
    const _y = 2;
    const _res = divide(_q, _y);
    expect(_res).toBe(-0.5);
  });

  it("can return division result of one negative float value and one positive float value", () => {
    const _q = -1.4;
    const _y = 2.2;
    const _res = divide(_q, _y);
    expect(Number(_res.toFixed(2))).toBe(-0.64);
  });

  it("can return division result of one positive integer value and one positive float value", () => {
    const _q = 2;
    const _y = 2.2;
    const _res = divide(_q, _y);
    expect(Number(_res.toFixed(2))).toBe(0.91);
  });

  it("can return division result of one positive integer value and one negative float value", () => {
    const _q = 2;
    const _y = -2.2;
    const _res = divide(_q, _y);
    expect(Number(_res.toFixed(2))).toBe(-0.91);
  });

  it("can return division result of one negative integer value and one positive float value", () => {
    const _q = -2;
    const _y = 2.2;
    const _res = divide(_q, _y);
    expect(Number(_res.toFixed(2))).toBe(-0.91);
  });
});

describe(randomInteger, () => {
  it("can return an integer between given inclusive start and inclusive end integer values", () => {
    let _start: number;
    let _end: number;
    for (let i = 1; i < 100; i++) {
      _start = i;
      _end = _start + 5;
      const _res = randomInteger(_start, _end);
      expect(_res).toBeGreaterThanOrEqual(_start);
      expect(_res).toBeLessThanOrEqual(_end);
    }
  });
});
