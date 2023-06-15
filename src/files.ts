import { resolve } from "path";
import { access as fsAccess, accessSync as fsAccessSync, ensureDir, writeFileSync, appendFileSync, ensureDirSync, pathExists, pathExistsSync, readdir, stat, Stats, readdirSync, statSync } from "fs-extra";
import { allOfType } from "./typeGuard";

export interface LoggerOptions {
  timestamp: boolean;
  append_bottom: boolean;
}

function logger(path: string, content: string, options?: Partial<LoggerOptions>) {
  if(typeof path != "string" || typeof content != "string")
    throw new Error("path and/or content are empty or of the wrong type");

  const timestamp = new Date().toString();

  if(options?.timestamp)
    content = `[${timestamp}]  ${content}`;

  if(!options?.append_bottom)
    writeFileSync(path, content);
  else
    appendFileSync(path, content + "\n");
}

async function ensureDirs(directories: string[]) {
  if(!Array.isArray(directories) || !allOfType(directories, "string"))
    throw new TypeError("Passed directories are not an array of strings");

  directories = directories.map(dir => resolve(dir));

  const promises: Promise<void>[] = [];

  directories.forEach(dir => promises.push(ensureDir(dir)));

  await Promise.all(promises);
}

function ensureDirsSync(directories: string[]) {
  if(!Array.isArray(directories) || !allOfType(directories, "string"))
    throw new TypeError("Passed directories are not an array of strings");

  directories = directories.map(dir => resolve(dir));

  directories.forEach(dir => ensureDirSync(dir));
}

async function exists(path: string) {
  try {
    return await pathExists(resolve(path));
  }
  catch(_e) {
    return false;
  }
}

async function existsSync(path: string) {
  try {
    return pathExistsSync(resolve(path));
  }
  catch(_e) {
    return false;
  }
}

async function access(path: string) {
  try {
    return await fsAccess(resolve(path));
  }
  catch(_e) {
    return false;
  }
}

async function accessSync(path: string) {
  try {
    return fsAccessSync(resolve(path));
  }
  catch(_e) {
    return false;
  }
}

function readdirRecursive(folder: string, callback: (err: unknown, result?: string[]) => void): Promise<string[]> {
  // refactored version of https://stackoverflow.com/a/5827895/8602926
  return new Promise((res, rej) => {
    const walk = (dir: string, done: (err: unknown, result?: string[]) => void) => {
      let results: string[] = [];
      readdir(dir, (err: unknown, list: string[]) => {
        if(err)
          return done(err);
        let pending = list.length;
        if(!pending)
          return done(null, results.reverse());
        list.forEach(file => {
          file = resolve(dir, file);
          stat(file, (err: unknown, stat: Stats) => {
            if(stat && stat.isDirectory()){
              walk(file, (err, res) => {
                if(err || !Array.isArray(res))
                  done(err);
                results = results.concat(res as string[]);
                if(!--pending)
                  done(null, results.reverse());
              });
            }
            else
            {
              results.push(file);
              if(!--pending)
                done(null, results.reverse());
            }
          });
        });
      });
    };
    walk(folder, (err: unknown, result?: string[]) => {
      if(typeof callback == "function")
        callback(err, result);

      if(!err && result)
        return res(result);
      else return rej(err);
    });
  });
}

function readdirRecursiveSync(folder: string) {
  // from https://stackoverflow.com/a/16684530/8602926
  const walk = (dir: string) => {
    let results: string[] = [];
    const list = readdirSync(dir);
    list.forEach(function(file) {
      file = dir + "/" + file;
      const stat = statSync(file);
      if (stat && stat.isDirectory())
        results = results.concat(walk(file));
      else
        results.push(resolve(file));
    });
    return results;
  };
  return walk(folder);
}

export const files = {
  logger,
  ensureDirs,
  ensureDirsSync,
  exists,
  existsSync,
  access,
  accessSync,
  readdirRecursive,
  readdirRecursiveSync,
};
