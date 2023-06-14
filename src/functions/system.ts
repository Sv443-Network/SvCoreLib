import { Stringifiable } from "../types";
import { logger } from "./files";
import { unused } from "./misc";

export function error(cause: string, log_file_path: string, shutdown = false, status: number | undefined, consoleMsg = true) {
  if(typeof cause != "string")
    throw new Error(`Wrong arguments provided in "cause" for scl.error() - (expected: "String", got: "${typeof cause}")`);

  if(typeof log_file_path == "string")
    logger(log_file_path, cause, {timestamp:true,append_bottom:true});
  
  if(consoleMsg === true)
    console.log("\x1b[31m\x1b[1mAn error occurred:\n" + cause + "\x1b[0m\n");

  if(shutdown === true && typeof status === "number")
    process.exit(status);
  else if(shutdown === true)
    process.exit(1);
}

let inspector: typeof import("inspector") | undefined;
try {
  inspector = await import("inspector");
}
catch(e) {
  void e;
}

export async function inDebugger(checkArg: string) {
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
