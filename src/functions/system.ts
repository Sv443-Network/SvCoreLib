import { logger } from "./files";
import { mapRange } from "./math";
import { isDom, unused } from "./misc";
import type { Stringifiable } from "../types";
import { Errors } from "./Errors";

// Node-only conditional imports
let inspector: typeof import("inspector") | undefined;
let v8: typeof import("v8") | undefined;
try {
  inspector = await import("inspector");
  v8 = await import("v8");
}
catch(e) {
  void e;
}

export function error(cause: string, logfilePath: string, shutdown = false, status: number | undefined, consoleMsg = true) {
  if(isDom())
    throw new Error("This function is only available in Node.js");

  if(typeof cause != "string")
    throw new Error(`Wrong arguments provided in "cause" for scl.error() - (expected: "String", got: "${typeof cause}")`);

  if(typeof logfilePath == "string")
    logger(logfilePath, cause, { timestamp: true, append_bottom: true });
  
  if(consoleMsg === true)
    console.log("\x1b[31m\x1b[1mAn error occurred:\n" + cause + "\x1b[0m\n");

  if(shutdown === true && typeof status === "number")
    setImmediate(() => process.exit(status));
  else if(shutdown === true)
    setImmediate(() => process.exit(1));
}

export function inDebugger(checkArg: string) {
  if(isDom() || !inspector)
    throw new Error("This function is only available in Node.js");

  try {
    if(typeof checkArg === "string" && checkArg.length > 0)
      return process.argv.join(" ").includes(checkArg);
  }
  catch(err) {
    unused(err);
  }

  return (
    // @ts-ignore
    typeof v8debug === "object"
      || /--debug|--inspect/.test(process.execArgv.join(" "))
      || (inspector && inspector.url && typeof inspector.url() === "string")
  );
}

export function setWindowTitle(title: Stringifiable) {
  if(isDom())
    throw new Error("This function is only available in Node.js");

  if(typeof title !== "string") {
    if(typeof title.toString == "function")
      title = title.toString();
    else
      throw new TypeError(`Parameter "title" is not of type string (got "${typeof title}")`);
  }

  if(process.platform !== "win32")
    process.stdout.write(`\x1b]2;${title}\x1b\x5c`); // *nix doesn't have a "nice" way to set the window title but this escape sequence should be able to do it (for reference search "OSC control sequences" on this page: https://man7.org/linux/man-pages/man4/console_codes.4.html)
  else
    process.title = String(title); // This should work only on Windows
}

let shutdownDisabled = false;

const noop = () => void 0;

export function noShutdown() {
  if(isDom())
    throw new Error("This function is only available in Node.js");

  if(shutdownDisabled)
    return;
  shutdownDisabled = true;
  process.on("SIGINT", noop);
}

export function yesShutdown() {
  if(isDom())
    throw new Error("This function is only available in Node.js");

  if(!shutdownDisabled)
    return;
  shutdownDisabled = false;
  process.removeListener("SIGINT", noop);
}

let softShutdownListener: (() => any) | Promise<any> | undefined = undefined;
let softShutdownCode = 0;

async function beforeShutdown() {
  if(shutdownDisabled)
    return;

  if(softShutdownListener instanceof Promise) {
    softShutdownListener
      .catch((e) => unused(e))
      .finally(() => {
        setImmediate(() => process.exit(softShutdownCode));
      });
  }
  else if(typeof softShutdownListener === "function") {
    const ret = softShutdownListener() as unknown;
    if(ret instanceof Promise)
      await ret;
    setImmediate(() => process.exit(softShutdownCode));
  }
}

export function softShutdown(funct: (() => void | Promise<void>), code?: number) {
  if(isDom())
    throw new Error("This function is only available in Node.js");

  if(softShutdownListener)
    return;

  code = Number(code);

  if(isNaN(code) || code < 0)
    code = 0;

  softShutdownListener = funct;
  softShutdownCode = code;

  process.on("SIGINT", beforeShutdown);
  process.on("SIGTERM", beforeShutdown);
}

export function removeSoftShutdown() {
  if(isDom())
    throw new Error("This function is only available in Node.js");

  if(!softShutdownListener)
    return;

  process.removeListener("SIGINT", beforeShutdown);
  process.removeListener("SIGTERM", beforeShutdown);
}

export function usedHeap() {
  if(isDom() || !v8)
    throw new Error("This function is only available in Node.js");

  const heapStat = v8.getHeapStatistics();

  const max = heapStat.heap_size_limit;
  const val = heapStat.used_heap_size;

  return mapRange(val, 0, max, 0, 100);
}

export function pause(text: Stringifiable) {
  if(isDom())
    throw new Error("This function is only available in Node.js");

  if(!process.stdin.isTTY)
    throw new Errors.NoStdinError("Only use this function if the terminal has a TTY stdin channel.");

  if(!text || !text.toString)
    text = "Press any key to continue...";

  if(!process.stdin.isRaw)
    process.stdin.setRawMode(true);

  return new Promise((resolve, reject) => {
    process.stdout.write(`${text} `);
    process.stdin.resume();

    const onData = (chunk: string) => {
      if(/\u0003/gu.test(chunk)) // eslint-disable-line no-control-regex
        process.exit(0);

      process.stdout.write("\n");
      process.stdin.pause();

      process.stdin.removeListener("data", onData);
      process.stdin.removeListener("error", onError);

      return resolve(chunk.toString());
    };

    const onError = (err: unknown) => {
      process.stdin.removeListener("data", onData);
      process.stdin.removeListener("error", onError);

      return reject(err);
    };

    process.stdin.on("data", onData);
    process.stdin.on("error", onError);
  });
}
