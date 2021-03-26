import {
  isString,
  isNumber,
  isBigInt,
  isBoolean,
  isSymbol,
  isUndefined,
  isNull,
  isFunction,
  isInstance,
  isArray,
  isNil,
  has,
  kind
} from '../src/index';

let a: unknown;

if (isString(a)) a.toLocaleLowerCase();
if (isNumber(a)) a.toFixed();
if (isBigInt(a)) a.toString();
if (isBoolean(a)) a.valueOf();
if (isSymbol(a)) a.toString();
if (isUndefined(a)) {
  a; // undefined
}
if (isNull(a)) {
  a; // null
}

if (isNil(a)) {
  a; // null | undefined
}

function test(a: string, b: number): boolean {
  return true;
}

if (isFunction<typeof test>(a)) {
  a('11', 1);
}

if (isInstance(a, Date)) {
  a.getFullYear();
}

isInstance(a, DelayNode);

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

/*
 *  has()
 */

type Bird = { fly: () => {} };
type Cat = { run: () => {}; meow: () => {} };
type Dog = { run: () => {} };

let pet = {} as any;

const isBird = has<Bird>('fly');
const isDogOrCat = has<Dog | Cat>('run');
const isCat = has<Cat>('run', 'meow');

if (isBird(pet)) {
  pet.fly();
}

if (isDogOrCat(pet)) {
  pet.run();
}

if (isCat(pet)) {
  pet.meow();
}
// ------------

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
