export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isNil(value: unknown): value is null | undefined {
  return value == null;
}

export function isFunction<T>(value: unknown): value is T {
  return typeof value === 'function';
}

export type ClassType<T, ARGS extends any[] = any[]> = new (...args: ARGS) => T;

export function isInstance<T>(value: unknown, C: ClassType<T>): value is T {
  return value instanceof C;
}

/**
 *  This will not check element types.
 */
export function isArray<ItemType>(value: unknown): value is Array<ItemType> {
  return Array.isArray(value);
}

// https://www.npmjs.com/package/isobject
export function isObject(value: unknown): value is { [key: string]: unknown } {
  return (
    value != null && typeof value === 'object' && Array.isArray(value) === false
  );
}

type Predicate<T> = (value: unknown) => value is T;

export function has<T>(...args: Array<keyof T>): Predicate<T> {
  return function (value: unknown): value is T {
    return args.every((k) => !isNil((value as any)[k]));
  };
}

// Discriminated unions
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
export function kind<T>(uid: string, uniProp: string = 'kind'): Predicate<T> {
  return function (value: unknown): value is T {
    return isString((value as any)[uniProp]) && (value as any)[uniProp] === uid;
  };
}

export function literal<T extends boolean | number | string | symbol>(
  literal: T
): Predicate<T> {
  return function (value: unknown): value is T {
    return value === literal;
  };
}

type SchemaType<T = {}> = { [K in keyof T]: Predicate<T[K]> };

export function schema<T>(schema: SchemaType<T>): Predicate<T> {
  return function (value: unknown): value is T {
    if (isObject(value)) {
      for (let k in schema) {
        if (!value.hasOwnProperty(k)) return false;
        if (!schema[k](value[k])) return false;
      }
      return true;
    }
    return false;
  };
}

export function every<T>(predicate: Predicate<T>): Predicate<T[]> {
  return function (value: unknown): value is T[] {
    if (Array.isArray(value)) {
      return value.every(predicate);
    }
    return false;
  };
}
