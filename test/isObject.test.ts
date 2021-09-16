import {
  isArray,
  isBoolean,
  isNil,
  isNumber,
  isObject,
  isString,
  isValidObject
} from '../src/index';

test('isObject should works', () => {
  expect(isObject({})).toBe(true);
  expect(isObject({ a: 123 })).toBe(true);
  expect(isObject({ a: 'fjsdklfj' })).toBe(true);
  expect(isObject({ a: true })).toBe(true);
  expect(isObject(new Object())).toBe(true);
  expect(isObject([])).toBe(false);
  expect(isObject(123)).toBe(false);
  expect(isObject('sdsfd')).toBe(false);
  expect(isObject(false)).toBe(false);
});

test('isValidObject should works', () => {
  let emptyObj = {};
  let objA = {
    x: 123,
    str: 'aaa',
    b: true
  };

  const schemaA = {
    x: isNumber,
    str: isString,
    b: isBoolean
  };

  const schemaB = { c: isNil };

  if (isValidObject(emptyObj, schemaA)) {
    // let testobj: {
    //     x: number;
    //     str: string;
    // }
    emptyObj;
  }
  if (isValidObject(objA, schemaB)) {
    // let objA: {
    //   x: number;
    //   str: string;
    //   b: boolean;
    // } & {
    //   c: null;
    // };
    objA;
  } else {
    objA;
  }

  expect(isValidObject(emptyObj, schemaA)).toBe(false);
  expect(isValidObject(emptyObj, schemaB)).toBe(false);

  expect(isValidObject(objA, schemaA)).toBe(true);
  expect(isValidObject(objA, schemaB)).toBe(false);
});

test('custom validator', () => {
  let message: unknown = {
    code: 200,
    msg: 'success',
    records: [
      { id: 1, name: 'aaa' },
      { id: 2, name: 'bbb' },
      { id: 3, name: 'ccc' }
    ]
  };

  const messageSchema = {
    // custom validator
    code: (value: unknown): value is 200 => {
      return value === 200;
    },
    msg: isString,
    records: isArray
  };

  if (isValidObject(message, messageSchema)) {
    //
    message;
  }

  expect(isValidObject(message, messageSchema)).toBe(true);
});
