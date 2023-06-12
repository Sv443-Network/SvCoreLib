import { AnyClass } from "../types";
import { randRange } from "./rng";
import { isEmpty, isClass } from "./typeGuard";

//#MARKER type guards

export function allEqual<T>(array: T[], loose = false): boolean {
  if(!Array.isArray(array))
    throw new Error(`Wrong argument provided for scl.allEqual() - (expected: "Object", got: "${typeof array}")`);

  return array.every(v => loose === true ? v == array[0] : v === array[0]);
}

export function allInstanceOf<T>(arr: unknown[], Class: AnyClass<T>): arr is AnyClass<T>[] {
  if(!Array.isArray(arr) || !isClass(Class))
    throw new TypeError("Parameters in allInstanceOf() are invalid. Expected array of any and class reference.");

  if(arr.length === 0)
    return false;

  return arr.reduce<number>((a, c) => a + (c instanceof Class ? 0 : 1), 0) === 0;
}

//#MARKER random

export function randomizeArray<T>(array: T[]) {
  const retArray = new Array(...array); // has to be done so array and retArray don't point to the same memory address

  if(!Array.isArray(array))
    throw new Error("Parameter in \"scl.randomizeArray()\" needs to be an array.");

  if(array.length === 0)
    return [];

  // shamelessly stolen from https://javascript.info/task/shuffle
  for(let i = retArray.length - 1; i > 0; i--) {
    const j = Math.floor((randRange(0, 10000) / 10000) * (i + 1));
    [retArray[i], retArray[j]] = [retArray[j], retArray[i]];
  }

  return retArray;
}

export function takeRandomItem<T>(arr: T[]) {
  if(!Array.isArray(arr))
    throw new Error("Parameter is not an array");

  if(arr.length === 0)
    return undefined;

  const [itm, idx] = randomItemIndex(arr);

  if(!itm || !idx)
    return undefined;

  arr.splice(idx, 1);
  return itm;
}

export function randomItemIndex<T>(array: T[]): [T, number] | [undefined, undefined] {
  if(!Array.isArray(array))
    throw new Error("Parameter is not an array");
  
  if(array.length === 0)
    return [undefined, undefined];

  const idx = randRange(0, array.length - 1);

  return [array.at(idx)!, idx];
}

export function randomItem<T>(array: T[]): T {
  return randomItemIndex(array)[0]!;
}

//#MARKER stringify

export function readableArray(array, separators, lastSeparator) {
  if(isEmpty(array) || typeof array != "object" || (!isEmpty(separators) && typeof separators != "string" && typeof separators != "boolean") || (!isEmpty(lastSeparator) && typeof lastSeparator != "string" && typeof lastSeparator != "boolean"))
    throw new Error("Wrong or missing parameters in \"scl.readableArray()\"");
  if(isEmptyWithoutString(lastSeparator) || lastSeparator === false)
    lastSeparator = " and ";
  if(isEmptyWithoutString(separators))
    separators = ", ";

  if(array.length == null || array.length <= 0)
    return array;
  else if(array.length == 1)
    return array[0].toString();
  else if(array.length == 2)
    return array.join(lastSeparator);
  else {
    const ae = lastSeparator + array[array.length - 1];
    array.pop();
    return array.join(separators) + ae;
  }
}

function isEmptyWithoutString(variable: any) {
  return variable === null || variable === undefined || (Array.isArray(variable) && variable.length === 0) || Object.keys(variable)?.length === 0;
}

//#MARKER split

export function halves<T>(array: T[]) {
  if(!Array.isArray(array))
    throw new TypeError("Invalid argument 'array' provided in halves()");

  return splitIntoParts(array, 2, true);
}

export function splitIntoParts<T>(array: T[], partsAmt: number, balanced = false) {
  if(!Array.isArray(array))
    throw new TypeError("Invalid argument 'array' provided in splitIntoParts()");

  if(typeof partsAmt !== "number" || isNaN(partsAmt))
    throw new TypeError("Invalid argument 'partsAmt' provided in splitIntoParts()");

  // credits to https://stackoverflow.com/a/8189268/8602926 lol
  if(partsAmt < 2)
    return [array];

  const len = array.length,
    out: T[][] = [];
  let size: number,
    i = 0;

  if(len % partsAmt === 0) {
    size = Math.floor(len / partsAmt);
    while(i < len)
      out.push(array.slice(i, i += size));
  }
  else if(balanced === true) {
    while(i < len)
    {
      size = Math.ceil((len - i) / partsAmt--);
      out.push(array.slice(i, i += size));
    }
  }
  else {
    partsAmt--;
    size = Math.floor(len / partsAmt);
    if(len % size === 0)
      size--;
    while(i < size * partsAmt)
      out.push(array.slice(i, i += size));
    out.push(array.slice(size * partsAmt));
  }

  return out;
}

export function splitIntoPartsOfLength<T>(array: T[], maxLength: number) {
  if(typeof maxLength !== "number" || isNaN(maxLength) || maxLength < 1)
    throw new TypeError("Invalid argument 'maxLength' provided in splitIntoPartsOfLength()");
  if(!Array.isArray(array))
    throw new TypeError("Invalid argument 'array' provided in splitIntoPartsOfLength()");

  if(array.length === 0)
    return [];

  const arr = [...array];
  const result: T[][] = [];

  while(arr.length > 0)
    result.push(arr.splice(0, maxLength));

  return result;
}

//#MARKER misc

export function removeDuplicates<T>(array: T[]) {
  return array.filter((a, b) => array.indexOf(a) === b);
}
