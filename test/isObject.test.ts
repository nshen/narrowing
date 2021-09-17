import { isObject } from '../src/index';

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
  expect(isObject(() => {})).toBe(false);
  expect(isObject(function () {})).toBe(false);
});
