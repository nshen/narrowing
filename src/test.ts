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
  is
} from './index';

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

b.m(); // Error: Object is possibly 'null' or 'undefined'.ts(2533)

type Fish = { swim: () => {} };
type Bird = { fly: () => {} };

function getPet(): Fish | Bird {
  return {} as any;
}
let pet: Fish | Bird = getPet();

// const isFish = is<Fish>(pet, (pet)=>{
//   return !isNil((pet as Fish).swim);
// })

// if(isFish(pet)){

//   pet

// }

export function has<T>(key: keyof T) {
  return function is(b: unknown): b is T {
    return !isNil((b as any)[key]);
  };
}

const isFish = has('swim');

if (has('swim')) {
}

// const isFish = is<Fish>((p)=>{ return !isNil((p as any).swim)})

// function isFish2(p):p is Fish{
//  return !isNil((p as any).swim)
// }
