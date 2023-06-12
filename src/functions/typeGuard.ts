import { AnyClass, JSPrimitiveTypeName } from "../types";

export function isClass<T>(val: any): val is AnyClass<T> {
  try {
    if(typeof val === "function") {
      const proto = Object.getOwnPropertyDescriptor(val, "prototype");
      return typeof proto !== "undefined" && !proto.writable;
    }
    return false;
  }
  catch(err) {
    return false;
  }
}

export function isEmpty<T>(input: T) {
  return (
    (input === undefined || input === null || input === "") // other
    || (typeof input === "object" && Array.isArray(input) && input.length === 0) // arrays
    || (typeof input === "object" && !Array.isArray(input) && Object.keys(input) && Object.keys(input).length == 0) // objects
  ) ? true : false;
}

export function isArrayEmpty<T>(array: T[], returnEmptiness: true): number;
export function isArrayEmpty<T>(array: T[], returnEmptiness: false): boolean;
/**
 * @version 2.0.0 Breaking change: added param returnEmptiness and it now defaults to false
 */
export function isArrayEmpty<T>(array: T[], returnEmptiness = false): boolean | number {
  if(typeof array != "object" || !Array.isArray(array))
    throw new Error(`Wrong or empty arguments provided for scl.isArrayEmpty() - (expected: "object", got: "${typeof array}")`);

  const emptiness = array.reduce((a, c) => isEmpty(c) ? a + 1 : a, 0);

  if(returnEmptiness)
    return array.length - emptiness;

  if(emptiness === array.length)
    return true;

  return false;
}

export function allOfType<T>(array: T[], type: JSPrimitiveTypeName) {
  const possibleTypes: JSPrimitiveTypeName[] = [ "bigint", "boolean", "function", "number", "object", "string", "symbol", "undefined" ];

  if(!Array.isArray(array))
    throw new TypeError("Parameter \"array\" needs to be an array");

  if(!possibleTypes.includes(type))
    throw new TypeError("Parameter \"type\" needs to be a string that contains a primitive JavaScript variable type");

  return array.every(val => typeof val === type);
}
