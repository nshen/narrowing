import { kind } from '../src/index';

test('kind ', () => {
  interface Square {
    kind: 'square';
    size: number;
  }
  interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
  }
  interface Circle {
    kind: 'circle';
    radius: number;
  }

  const isSquare = kind<Square>('square');
  const isRectangle = kind<Rectangle>('circle');
  const isCircle = kind<Circle>('circle');

  let s = {} as any;

  if (isSquare(s)) {
    console.log(s.size);
  }

  if (isRectangle(s)) {
    console.log(s.height);
  }

  if (isCircle(s)) {
    console.log(s.radius);
  }

  expect(isSquare(s)).toBe(false);
  expect(isRectangle(s)).toBe(false);
  expect(isCircle(s)).toBe(false);

  let circle = {
    kind: 'circle',
    radius: 100
  };

  if (isCircle(circle)) {
    circle.radius = 200;
  }

  expect(isCircle(circle)).toBe(true);
});
