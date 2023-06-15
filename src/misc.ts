import type { JSONCompatible } from "./types";

export function reserialize<O extends JSONCompatible, I extends boolean>(obj: O, immutable?: I): I extends true ? Readonly<O> : O {
  if(typeof obj != "object")
    return obj;

  try {
    const reserialized = JSON.parse(JSON.stringify(obj));
    return immutable === true ? Object.freeze(reserialized) : reserialized;
  }
  catch(err) {
    return obj;
  }
}

export function unused(...variables: any[]): void {
  void variables;
  return;
}

export function isDom() {
  try {
    // @ts-ignore
    if(window)
      return true;
    return false;
  }
  catch {
    return false;
  }
}
