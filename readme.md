# 🤖 Narrowing

[![npm](https://img.shields.io/npm/v/narrowing.svg)](https://www.npmjs.com/package/narrowing)
[![npm](https://img.shields.io/npm/dt/narrowing)](https://www.npmjs.com/package/narrowing)

TypeScript tiny [narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) helpers you better use.

## Install

```bash
npm i narrowing  # yarn add narrowing
```

## Usage

```typescript
let a: unknown;

if (isXXX(a)) {
  // TypeScript know your type here!
}
```

## Functions

Basic:

- isString
- isNumber
- isBigInt
- isBoolean
- isSymbol
- isUndefined
- isNull
- isNil
- isFunction
- isInstance
- isArray
- isObject

Advanced:

These functions help you make advanced type guards.

- [has](#has)
- [kind](#kind)
- [literal](#literal)
- [schema](#schema) (💪 `cool`)

### basic examples

```typescript
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
} from 'narrowing';

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

function testFunc(a: string, b: number): boolean {
  return true;
}

if (isFunction<typeof testFunc>(a)) {
  a('11', 1); // no error
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
```

### `has()`

Check if a type has a property

[TypeScript Handbook / Using type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

```typescript
type Bird = { fly: () => {} };
type Cat = { run: () => {}; meow: () => {} };
type Dog = { run: () => {} };

let pet = {} as any;

// save these type guards somewhere and reuse them
const isBird = has<Bird>('fly');
const isDogOrCat = has<Dog | Cat>('run');
const isCat = has<Cat>('run', 'meow');

if (isBird(pet)) {
  pet.fly(); // Bird
}

if (isDogOrCat(pet)) {
  pet.run(); // Dog | Cat
}

if (isCat(pet)) {
  pet.meow(); // Cat
}
```

### `kind()`

[TypeScript handbook / Discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)

```typescript
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
```

### `literal()`

```ts
const is404 = literal(404);
let code = 200;
if (is404(code)) {
  // code's type should be 404 , not number
  // let code: 404
  code;
}
```

this is useful when you see `schema()`

### `schema()`

Basic schema validation

```ts
let message: unknown = {
  code: 200,
  msg: 'success',
  records: [
    { id: 1, name: 'aaa' },
    { id: 2, name: 'bbb' },
    { id: 3, name: 'ccc' }
  ]
};

const isSuccess = schema({
  code: literal(200),
  msg: isString,
  records: isArray
});

if (isSuccess(message)) {
  // let message: {
  //     code: 200;
  //     msg: string;
  //     records: unknown[];
  // }
  message;
}
```

schema supports a type argument for associating a schema with an existing type

```ts
interface TestInterface {
  id: number;
  name: string;
}

const isTestInterface = schema<TestInterface>({
  id: isNumber,
  name: isString
});

if (isTestInterface(message)) {
  // let message: TestInterface
  message;
}
```

### `every()`

Runtime array type validation. Checks each element of an array.

```ts
let arr: unknown[] = [1, 2, 3];
if (every(isNumber)(arr)) {
  let typeCheck: number[] = arr;
}
```

Works with any narrowing validator, including schemas.

```ts
interface TestInterface {
  id: number;
  name: string;
}

const isTestInterface = schema<TestInterface>({
  id: isNumber,
  name: isString
});

let arr: unknown[] = [{ id: 1, name: 'aaa' }];

if (every(isTestInterface)(arr)) {
  let typeCheck: TestInterface[] = arr;
}
```

## Version

- 1.1.0
  - add `has()`
- 1.1.1
  - `has()` accept multiple params
- 1.2.1
  - add `kind()`
- 1.3.0
  - add `isObject()`, `isValidObject()`
- 1.4.0
  - replace ~~`isValidObject()`~~ with `schema()`
  - add `literal()`
- 1.5.0
  - add `every()`
