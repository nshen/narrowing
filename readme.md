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

## Demo

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
  isNil
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

### has()

```typescript
type Fish = { swim: () => {} };
type Bird = { fly: () => {} };

function getPet(): any {
  return {} as any;
}

//---------------

let pet: Fish | Bird = getPet(); // Fish | Bird

const isBird = has<Bird>('fly');
const isFish = has('swim');

if (isBird(pet)) {
  pet.fly();
}
if (isFish(pet)) {
  pet.swim();
}
```

## Version

- 1.1.0
  - add `has()`
