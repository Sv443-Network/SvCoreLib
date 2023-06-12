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
