//#MARKER RNG

import type { UUIDType } from "../types";
import { randomItem } from "../functions/array";

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

export function generateUUID(uuidFormat: string, type: "alphanumerical");
export function generateUUID(uuidFormat: string, type: "binary");
export function generateUUID(uuidFormat: string, type: "custom", charset: string[]);
export function generateUUID(uuidFormat: string, type: "decimal");
export function generateUUID(uuidFormat: string, type: "hexadecimal");
export function generateUUID(uuidFormat: string, type: UUIDType, arg0: string[] | undefined) {
  const injectChars = (str: string, charset: string[]): string => {
    // TODO:
    const matches = /[xy]/gm.exec(str);
    if(matches)
      matches.forEach((match: RegExpExecArray[0]) => str = str[match.index]);
  };

  switch(type) {
  case "custom":
    return injectChars(uuidFormat, arg0 ?? []);
  default:
    return injectChars(uuidFormat, charsets[type]);
  }
}
