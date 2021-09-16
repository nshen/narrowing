# 🤖 Narrowing

[![npm](https://img.shields.io/npm/v/narrowing.svg)](https://www.npmjs.com/package/narrowing)

TypeScript tiny [narrowing ](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) helpers you better use.

## Install

```bash
npm i narrowing  # yarn add narrowing
```

## Usage

```typescript
let a: unknown;
if (isXXX(a)) {
  // TypeScritp know your type here!
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

- [has](#has)
- [kind](#kind)
- [isValidObject](#isvalidobject)

```typescript
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
} from 'narrowing';

let a: unknown;

if (isString(a)) a.toLocaleLowerCase();
if (isNumber(a)) a.toFixed();
if (isBigInt(a)) a.toString();
if (isBoolean(a)) a.valueOf();
if (isSymbol(a)) a.description;
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
```

## `has()`

check if a type has a property

[TypeScript Handbook / Using type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

```typescript
type Bird = { fly: () => {} };
type Cat = { run: () => {}; meow: () => {} };
type Dog = { run: () => {} };

let pet = {} as any;

// type predicates
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

## `kind()`

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

## `isValidObject()`

Basic schema validation

```ts
let testObj: any = {};

const schema = {
  x: isNumber,
  str: isString
};

if (isValidObject(testObj, schema)) {
  /*
    now typescript know your testObj type is
    let testObj: { x: number; str: string; }
   */
}
```

custom validator

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

const messageSchema = {
  // custom validator
  code: (value: unknown): value is 200 => {
    return value === 200;
  },
  msg: isString,
  records: isArray
};

if (isValidObject(message, messageSchema)) {
  /*
        let message: {
            code: 200;
            msg: string;
            records: unknown[];
        }
  */
  message;
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
