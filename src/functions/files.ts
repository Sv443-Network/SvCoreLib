import fs from "fs";

export interface LoggerOptions {
  timestamp: boolean;
  append_bottom: boolean;
}

export function logger(path: string, content: string, options?: Partial<LoggerOptions>) {
  if(typeof path != "string" || typeof content != "string")
    throw new Error("path and/or content are empty or of the wrong type");

  const timestamp = new Date().toString();

  if(options?.timestamp)
    content = `[${timestamp}]  ${content}`;

  if(!options?.append_bottom)
    fs.writeFileSync(path, content);
  else
    fs.appendFileSync(path, content + "\n");
}
