//#MARKER RNG

import type { UUIDType } from "./types";
import { randomItem } from "./array";
import { replaceAt } from "./string";
import { isEmpty } from "./typeGuard";
import { randRange } from "./math";

//#MARKER UUID

const numbers = "0123456789";

const charsets: Record<Exclude<UUIDType, "custom">, string[]> = {
  alphanumerical: `${numbers}abcdefghijklmnopqrstuvwxyz`.split(""),
  binary:         "01".split(""),
  decimal:        numbers.split(""),
  hexadecimal:    `${numbers}abcdef`.split(""),
};

// TODO:
export function generateUUID(uuidFormat: string, type: "alphanumerical"): string;
export function generateUUID(uuidFormat: string, type: "binary"): string;
export function generateUUID(uuidFormat: string, type: "custom", charset: string[]): string;
export function generateUUID(uuidFormat: string, type: "decimal"): string;
export function generateUUID(uuidFormat: string, type: "hexadecimal"): string;
export function generateUUID(uuidFormat: string, type: UUIDType, arg0?: string[]): string {
  const injectChars = (str: string, charset: string[]): string => {
    const matches = str.matchAll(/[xy]/gm);
    if(matches)
      for(const match of matches)
        str = replaceAt(str, match.index!, randomItem(charset));
    return str;
  };

  if(type === "custom")
    return injectChars(uuidFormat, arg0 ?? []);

  return injectChars(uuidFormat, charsets[type]);
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

  if(!seed.match(new RegExp(`^[0-9]{${digitCount}}$`)) || seed.match(/\n/m))
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
