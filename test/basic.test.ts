import {
  isArray,
  isBigInt,
  isBoolean,
  isFunction,
  isInstance,
  isNil,
  isNull,
  isNumber,
  isObject,
  isString,
  isSymbol,
  isUndefined
} from '../src/index';

let a: unknown;

if (isString(a)) a.toLocaleLowerCase();
if (isNumber(a)) a.toFixed();
if (isBigInt(a)) a.toString();
if (isBoolean(a)) a.valueOf();
if (isSymbol(a)) a.toString();
if (isUndefined(a)) {
}
if (isNull(a)) {
}
if (isNil(a)) {
  a; // null | undefined
}

function testAAA(a: string, b: number): boolean {
  return true;
}

if (isFunction<typeof testAAA>(a)) {
  a('11', 1);
}

if (isInstance(a, Date)) {
  a.getFullYear();
}

class TestClass {
  m() {}
}

if (isInstance(a, TestClass)) {
  a.m();
}

if (isArray<string>(a)) {
  a[0].trim();
}

let b: TestClass | undefined | null;
// b.m(); // Error: Object is possibly 'null' or 'undefined'.ts(2533)
if (!isNil(b)) {
  b.m(); // no Error any more
}
if (isObject(a)) {
  //   let a: {
  //     [key: string]: unknown;
  //   };
  a;
}

// TODO: basic test
test('test', () => {
  expect(isUndefined(a)).toBe(true);
});
