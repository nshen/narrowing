import { schema, literal, every, isString, isNumber } from '../src/index';

test('fails when array contains elements of an unassignable type', () => {
  expect(every(isString)([1, 2, 3])).toBe(false);
  expect(every(isNumber)([1, '2', 3])).toBe(false);
});

test('passes when array contains correct type', () => {
  expect(every(isNumber)([1, 2, 3])).toBe(true);
  expect(every(isString)(['1', '2', '3'])).toBe(true);
});

test('passes when array is empty', () => {
  expect(every(isString)([])).toBe(true);
  expect(every(isNumber)([])).toBe(true);
});

interface TestInterface {
  kind: 'test';
  value: {
    nestedString: string;
    nestedNumber: number;
  };
}

const isTestInterface = schema<TestInterface>({
  kind: literal('test'),
  value: schema<TestInterface['value']>({
    nestedString: isString,
    nestedNumber: isNumber
  })
});

test('passes when array contains valid objects', () => {
  expect(
    every<TestInterface>(isTestInterface)([
      {
        kind: 'test',
        value: {
          nestedString: 'string',
          nestedNumber: 1
        }
      }
    ])
  ).toBe(true);
});

test('fails when array contains invalid objects', () => {
  expect(
    every<TestInterface>(isTestInterface)([
      {
        kind: 'test',
        value: {
          nested_string: 'string'
        }
      }
    ])
  ).toBe(false);
});

every<string>(isString);

let arr: unknown[] = [1, 2, 3];
if (every(isNumber)(arr)) {
  let typeCheck: number[] = arr;
}

interface TestInterfaceT {
  id: number;
  name: string;
}

const isTestInterfaceT = schema<TestInterfaceT>({
  id: isNumber,
  name: isString
});

let arr2: unknown[] = [{ id: 1, name: 'aaa' }];

if (every(isTestInterfaceT)(arr2)) {
  let typeCheck: TestInterfaceT[] = arr2;
}
