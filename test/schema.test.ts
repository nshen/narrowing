import {
  isArray,
  isBoolean,
  isNil,
  isNumber,
  isString,
  literal,
  schema
} from '../src/index';

test('schema should works', () => {
  let emptyObj: unknown = {};
  let objA: unknown = {
    x: 123,
    str: 'aaa',
    b: true
  };

  const isMyObjectA = schema({
    x: isNumber,
    str: isString,
    b: isBoolean
  });

  const isMyObjectB = schema({ c: isNil });

  if (isMyObjectA(emptyObj)) {
    // let testobj: {
    //     x: number;
    //     str: string;
    // }
    emptyObj;
  }
  if (isMyObjectB(objA)) {
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

  expect(isMyObjectA(emptyObj)).toBe(false);
  expect(isMyObjectB(emptyObj)).toBe(false);

  expect(isMyObjectA(objA)).toBe(true);
  expect(isMyObjectB(objA)).toBe(false);
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

  let failMessage: unknown = {
    code: 404,
    msg: 'fail',
    records: []
  };

  const isSuccess = schema({
    code: literal(200),
    msg: isString,
    records: isArray
  });

  if (isSuccess(message)) {
    //
    message;
  }

  expect(isSuccess(message)).toBe(true);
  expect(isSuccess(failMessage)).toBe(false);
});
