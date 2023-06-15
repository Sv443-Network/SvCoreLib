
import { IncomingMessage, ServerResponse } from "http";
import { createReadStream, existsSync, statSync } from "fs-extra";
import { resolve } from "path";
import { Readable } from "stream";

import { Errors } from "./Errors";
import { isDom, unused } from "./misc";
import { Stringifiable } from "./types";
import { byteLength } from "./string";
import { isEmpty } from "./typeGuard";

function pipeString(res: ServerResponse, text: Stringifiable, mimeType = "text/plain", statusCode = 200) {
  if(isDom())
    throw new Error("This function is only available in Node.js");

  try {
    statusCode = Number(statusCode);
    if(isNaN(statusCode))
      statusCode = 200;
  }
  catch(err) {
    unused(err);
    statusCode = 200;
  }

  if(!res || !(res instanceof ServerResponse))
    return "Error: parameter \"res\" is empty or not of type http.ServerResponse - make sure you have used \"res\", not \"req\"!";
    
  if(typeof mimeType != "string")
    return "Parameter \"mimeType\" was provided but is not of type string";

  if(!mimeType.match(/\w+\/[-+.\w]+/g))
    throw new Errors.InvalidMimeTypeError("The specified parameter \"mimeType\" doesn't contain a valid MIME type");

  const s = new Readable();
  s._read = () => void 0;
  s.push(text);
  s.push(null);

  if(!res.writableEnded) {
    s.pipe(res);

    if(!res.headersSent) {
      res.writeHead(statusCode, {
        "Content-Type": `${mimeType}; charset=UTF-8`,
        "Content-Length": byteLength(text) // Content-Length needs the byte length, not the char length
      });
    }
    else
      return "Error: headers were already sent back to the client.";
  }
  else
    return "Error: headers were already sent back to the client.";

  return null;
}

function pipeFile(res: ServerResponse, filePath: string, mimeType = "text/plain", statusCode = 200) {
  if(isDom())
    throw new Error("This function is only available in Node.js");

  try {
    statusCode = Number(statusCode);
    if(isNaN(statusCode))
      statusCode = 200;
  }
  catch(err) {
    return "Encountered internal server error while piping file: wrong type for status code.";
  }

  if(!res || !(res instanceof ServerResponse))
    return "Error: parameter \"res\" is empty or not of type http.ServerResponse - make sure you have used \"res\", not \"req\"!";

  if(!mimeType)
    mimeType = "text/plain";
    
  if(typeof mimeType != "string")
    return "Parameter \"mimeType\" was provided but is not of type string";

  if(!mimeType.match(/\w+\/[-+.\w]+/g))
    throw new Errors.InvalidMimeTypeError("The specified parameter \"mimeType\" doesn't contain a valid MIME type");

  filePath = resolve(filePath);

  if(!existsSync(filePath))
    return `File at "${filePath}" not found.`;

  try {
    if(!res.headersSent) {
      res.writeHead(statusCode, {
        "Content-Type": `${mimeType}; charset=UTF-8`,
        "Content-Length": statSync(filePath).size
      });
    }

    const readStream = createReadStream(filePath);
    readStream.pipe(res);

    return null;
  }
  catch(err) {
    return err;
  }
}

function getClientEncoding(req: IncomingMessage) {
  if(isDom())
    throw new Error("This function is only available in Node.js");

  if(!req || !(req instanceof IncomingMessage))
    return "Error: parameter \"req\" is empty or not of type http.IncomingMessage - make sure you have used \"req\", not \"res\"!";

  let selectedEncoding: string | null = null;

  let encodingPriority = [ "br", "gzip", "deflate", "compress", "identity" ];

  encodingPriority = encodingPriority.reverse();

  let acceptedEncodings: string[] = [];
  if(req.headers["accept-encoding"])
    acceptedEncodings = String(req.headers["accept-encoding"] ?? "").split(/\s*[,]\s*/gm);
  acceptedEncodings = acceptedEncodings.reverse();

  encodingPriority.forEach(encPrio => {
    if(acceptedEncodings.includes(encPrio))
      selectedEncoding = encPrio;
  });

  if(selectedEncoding == null)
    selectedEncoding = "identity";

  return selectedEncoding;
}

async function ping(url: string, timeout?: number) {
  if(isDom())
    throw new Error("This function is only available in Node.js");

  const pingTimestamp = Date.now();

  if(typeof url !== "string" || isEmpty(url))
    throw new Error("Wrong or empty argument provided for ping() - (expected: \"string\", got: \"" + typeof url + "\")");

  if(isEmpty(timeout) || typeof timeout != "number")
    timeout = 5000;

  const proto = (url.match(/(http:\/\/)/gm) || url.match(/(https:\/\/)/gm))![0].replace("://", "");


  let host = "", path: string | string[] = "";
  try {
    host = url.split("://")[1].split("/")[0];
    path = url.split("://")[1].split("/");
  }
  catch(err)
  {
    throw new Error("URL is formatted incorrectly");
  }


  if(isEmpty(path[1]))
    path = "/";
  else {
    path.shift();
    path = path.join("/");
  }

  let http: typeof import("http") | typeof import("https");

  if(proto === "https")
    http = await import("https");
  else
    http = await import("http");

  return new Promise<{
    statusCode: number;
    statusMessage: string | undefined;
    responseTime: number;
    contentType: string;
  }>((resolve, reject) => {
    try {
      http.get({
        host: host,
        path: Array.isArray(path) ? path.join("/") : path,
        timeout: timeout
      }, (res) => {
        const measuredTime = (Date.now() - pingTimestamp).toFixed(0);
        res.on("data", () => void 0);
        res.on("end", () => {
          return resolve({
            "statusCode": Number(res.statusCode),
            "statusMessage": res.statusMessage,
            "responseTime": Number(measuredTime),
            "contentType": res.headers["content-type"]!,
          });
        });
      });
    }
    catch(err) {
      return reject(err);
    }
  });
}

export const http = {
  pipeString,
  pipeFile,
  getClientEncoding,
  ping,
};
