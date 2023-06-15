import { allOfType } from "./typeGuard";

//#MARKER misc

export function mapRange(value: number, range_1_min: number, range_1_max: number, range_2_min: number, range_2_max: number) {
  [value, range_1_min, range_1_max, range_2_min, range_2_max].forEach(arg => {
    if(isNaN(Number(arg)) || typeof arg !== "number")
      throw new Error("Wrong argument(s) provided for mapRange() - (expected: \"Number\", got: \"" + typeof arg + "\")");
  });

  if(range_1_max === 0.0 || range_2_max === 0.0)
    throw new Error("Division by zero error in mapRange() - make sure the \"range_1_max\" and \"range_2_max\" arguments are not 0");

  if(range_1_min === 0.0 && range_2_min === 0.0)
    return value * (range_2_max / range_1_max);

  return ((value - range_1_min) * ((range_2_max - range_2_min) / (range_1_max - range_1_min)) + range_2_min);
}

export function clamp(num: number, min: number, max: number): number {
  const params = [num, min, max];

  if(!allOfType(params, "number"))
    throw new TypeError("Parameters for clamp() need to be of type number");
  if(params.map(p => isNaN(p)).includes(true))
    throw new TypeError("Parameters for clamp() can't be NaN");
  if(min > max)
    throw new TypeError("Parameter min can't be higher than max in clamp()");

  return Math.max(min, Math.min(num, max));
}

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

//#MARKER duration

export function formatMs(millis: number, format: string, leadingZeroes = true) {
  millis = Number(millis);
  if(typeof millis !== "number" || isNaN(millis) || millis < 0)
    throw new TypeError("Parameter \"millis\" has to be a number that's 0 or higher");

  if(typeof format !== "string")
    throw new TypeError("Parameter \"format\" has to be a string");

  const pad = (num: number, padAmt: number) => {
    if(leadingZeroes === false)
      return String(num);

    const getZeroes = (amt: number) => {
      let ret = "";
      for(let i = 0; i < amt; i++)
        ret += "0";
      return ret;
    };

    let z = "";

    if(num < 10)
      z = getZeroes(padAmt);
    else if(padAmt === 2 && num < 100)
      z = getZeroes(1);

    return `${z}${num}`;
  };

  const { ms, secs, mins, hrs, days } = parseDuration(millis);

  // return `${days}d, ${hrs}:${min}:${sec}.${ms}`;

  let retVal = String(format);

  [
    { a: "%ms", b: ms,  c: 2 },
    { a: "%s",  b: secs, c: 1 },
    { a: "%m",  b: mins, c: 1 },
    { a: "%h",  b: hrs, c: 1 },
    { a: "%d",  b: days },
  ]
    .forEach(({ a, b, c }) => {
      retVal = retVal.replace(new RegExp(a, "gm"), c ? pad(b, c) : String(b));
    });

  return retVal;
}

export function parseDuration(millis: number) {
  millis = Number(millis);
  if(typeof millis !== "number" || isNaN(millis) || millis < 0)
    throw new TypeError("Parameter \"millis\" has to be a number that's 0 or higher");

  let ms = Number(millis);
  let secs = Math.floor(ms / 1000);
  ms -= secs * 1000;
  let hrs = Math.floor(secs / 3600);
  secs -= hrs * 3600;
  const days = Math.floor(hrs / 24);
  hrs -= days * 24;
  const mins = Math.floor(secs / 60);
  secs -= mins * 60;

  return { days, hrs, mins, secs, ms };
}
