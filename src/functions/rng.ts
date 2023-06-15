//#MARKER RNG

import type { UUIDType } from "../types";
import { isEmpty } from "./typeGuard";

export function randRange(max: number): number;
export function randRange(min: number, max: number): number;
export function randRange(...args: number[]): number {
  let min: number, max: number;

  if(typeof args[0] === "number" && typeof args[1] === "number")
  {
    // using randRange(min, max)
    [ min, max ] = args;
  }
  else if(typeof args[0] === "number" && typeof args[1] !== "number")
  {
    // using randRange(max)
    min = 0;
    max = args[0];
  }
  else
    throw new TypeError(`Wrong parameter provided in scl.randRange() - (expected: "number" and "number|undefined", got: "${typeof args[0]}" and "${typeof args[1]}")`);

  min = Number(min);
  max = Number(max);

  if(isNaN(min) || isNaN(max))
    throw new TypeError("Invalid parameters provided in scl.randRange() - \"min\" and \"max\" can't be NaN");

  if(min > max)
    throw new TypeError("Invalid parameters provided in scl.randRange() - make sure \"min\" is not bigger than \"max\"");

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//#MARKER UUID

const numbers = "0123456789";

const charsets: Record<Exclude<UUIDType, "custom">, string[]> = {
  alphanumerical: `${numbers}abcdefghijklmnopqrstuvwxyz`.split(""),
  binary:         "01".split(""),
  decimal:        numbers.split(""),
  hexadecimal:    `${numbers}abcdef`.split(""),
};

// TODO:
export function generateUUID(uuidFormat: string, type: "alphanumerical");
export function generateUUID(uuidFormat: string, type: "binary");
export function generateUUID(uuidFormat: string, type: "custom", charset: string[]);
export function generateUUID(uuidFormat: string, type: "decimal");
export function generateUUID(uuidFormat: string, type: "hexadecimal");
export function generateUUID(uuidFormat: string, type: UUIDType, arg0: string[] | undefined) {
  const injectChars = (str: string, charset: string[]): string => {
    const matches = /[xy]/gm.exec(str);
    if(matches)
      matches.forEach((match: RegExpExecArray[0]) => str = str[match.index]);
    return str;
  };

  switch(type) {
  case "custom":
    return injectChars(uuidFormat, arg0 ?? []);
  default:
    return injectChars(uuidFormat, charsets[type]);
  }
}

//#MARKER seeded RNG

export function generateRandomSeed(digitCount = 10) {
  let seed = "";

  for(let i = 0; i < digitCount; i++)
    seed += Math.floor(randRange(0, 9)).toString();

  if(seed.startsWith("0")) {
    seed = seed.substring(1); // make sure the first item is not 0, so we can parse it as an int without losing the first digit
    seed = randRange(1, 9).toString() + seed.toString();
  }

  return parseInt(seed);
}

export function validateSeed(seed: any): seed is number | string {
  if(!["string", "number"].includes(typeof seed))
    throw new TypeError(`validateSeed(): expected parameter of type string or number but got '${typeof seed}'`);

  seed = String(seed);

  if(seed.startsWith("0"))
    return false;

  const digitCount = seed.length;

  const regex = new RegExp(`^[0-9]{${digitCount}}`, "gm");

  if(!seed.match(regex) || seed.match(/\n/gm))
    return false;

  return true;
}

// thanks to olsn for this code snippet: http://indiegamr.com/generate-repeatable-random-numbers-in-js/
export function generateSeededNumbers(count = 16, seed: number | string | undefined) {
  const result: number[] = [];

  if(isEmpty(seed))
    seed = generateRandomSeed();

  if(!validateSeed(seed))
    throw new Error("Error while validating seed in generateSeededNumbers() - Seeds cannot start with 0 and can only contain numerical digits between 0 and 9");

  const initialSeed = seed = Number(seed);

  const seededRandom = (min: number, max: number) => {
    max = max || 1;
    min = min || 0;
    
    seed = ((seed as number) * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    
    return Math.floor(min + rnd * (max - min));
  };

  for(let i = 0; i < count; i++)
    result.push(seededRandom(0, 9));

  return {
    numbers: result,
    stringified: result.join(""),
    integer: parseInt(result.join("")),
    seed: initialSeed,
  };
}
