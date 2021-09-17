import { literal } from '../src/index';

test('should literal works', () => {
  const isHello = literal('Hello');

  let anything: unknown = '';
  let hello = 'Hello';

  if (isHello(anything)) {
    anything;
  }

  expect(isHello(hello)).toBe(true);
  expect(isHello(anything)).toBe(false);

  // ------------

  const is404 = literal(404);
  let code = 200;
  if (is404(code)) {
    // code should be :
    // let code: 404
    code;
  }

  expect(is404(code)).toBe(false);
});
