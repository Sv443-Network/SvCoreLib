import { Stringifiable } from "../types";

// thanks to Cem Kalyoncu on Stackoverflow for this one (I was just to lazy to code it myself): https://stackoverflow.com/a/1431113/8602926
export function replaceAt(input: string, index: number, replacement: string): string {
  return `${input.substring(0, index)}${replacement}${input.substring(index + 1, input.length - 1)}`;
}

export function byteLength(str: Stringifiable) {
  if(!str || typeof str != "string")
    return -1;

  return Buffer.byteLength(String(str), "utf8");
}

export function insertValues(str: Stringifiable, ...values: Stringifiable[]) {
  if(typeof str != "string")
    throw new TypeError(`Parameter "${str}" is not of type "string" (got "${typeof str}")`);

  if(!str.match(/%[0-9]+/g))
    return str;

  values.forEach((arg, i) => {
    const rex = new RegExp(`%${i + 1}`);

    if(typeof arg !== "string" && typeof arg.toString == "function")
      arg = arg.toString();

    if(String(str).match(rex)) {
      try {
        str = String(str).replace(rex, String(arg));
      }
      catch(err) {
        throw new TypeError(`Value "${arg}" at index ${i} could not be inserted: ${err}`);
      }
    }
  });

  return str;
}
