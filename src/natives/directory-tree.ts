import { basename, extname, join } from "path";

import fs from "fs";

const constants = {
  DIRECTORY: "directory",
  FILE: "file",
};

function safeReadDirSync(path: string) {
  let dirData = {};
  try {
    dirData = fs.readdirSync(path);
  } catch (ex) {
    if (ex.code == "EACCES" || ex.code == "EPERM") {
      //User does not have permissions, ignore directory
      return null;
    } else throw ex;
  }
  return dirData;
}

function normalizePath(path: string) {
  return path.replace(/\\/g, "/");
}

function isRegExp(regExp: RegExp) {
  return typeof regExp === "object" && regExp.constructor == RegExp;
}

function directoryTree(
  path: string,
  options: any,
  onEachFile: (item: any, path: any, stats: any) => any,
  onEachDirectory: (item: any, path: any, stats: any) => any,
  currentDepth: number = 0
) {
  options = options || {};

  if (
    options.depth !== undefined &&
    options.attributes.indexOf("size") !== -1
  ) {
    throw new Error("usage of size attribute with depth option is prohibited");
  }

  const name = basename(path);
  path = options.normalizePath ? normalizePath(path) : path;
  let item: any = { path, name };
  let stats: any;
  let lstat: any;

  try {
    stats = fs.statSync(path);
    lstat = fs.lstatSync(path);
  } catch (e) {
    return null;
  }

  // Skip if it matches the exclude regex
  if (options.exclude) {
    const excludes = isRegExp(options.exclude)
      ? [options.exclude]
      : options.exclude;
    if (excludes.some((exclusion: RegExp) => exclusion.test(path))) {
      return null;
    }
  }

  if (lstat.isSymbolicLink()) {
    item.isSymbolicLink = true;
    // Skip if symbolic links should not be followed
    if (options.followSymlinks === false) return null;
    // Initialize the symbolic links array to avoid infinite loops
    if (!options.symlinks) options = { ...options, symlinks: [] };
    // Skip if a cyclic symbolic link has been found
    if (options.symlinks.find((ino: any) => ino === lstat.ino)) {
      return null;
    } else {
      options.symlinks.push(lstat.ino);
    }
  }

  if (stats.isFile()) {
    const ext = extname(path).toLowerCase();

    // Skip if it does not match the extension regex
    if (options.extensions && !options.extensions.test(ext)) return null;

    if (options.attributes) {
      options.attributes.forEach((attribute: string | number) => {
        switch (attribute) {
          case "extension":
            item.extension = ext;
            break;
          case "type":
            item.type = constants.FILE;
            break;
          default:
            item[attribute] = stats[attribute];
            break;
        }
      });
    }

    if (onEachFile) {
      item = onEachFile(item, path, stats);
    }
  } else if (stats.isDirectory()) {
    let dirData: any = safeReadDirSync(path);
    if (dirData === null) return null;

    if (options.depth === undefined || options.depth > currentDepth) {
      item.children = dirData
        .map((child: string) =>
          directoryTree(
            join(path, child),
            options,
            onEachFile,
            onEachDirectory,
            currentDepth + 1
          )
        )
        .filter((e: any) => !!e);
    }

    if (options.attributes) {
      options.attributes.forEach((attribute: string | number) => {
        switch (attribute) {
          case "size":
            item.size = item.children.reduce(
              (prev: any, cur: any) => prev + cur.size,
              0
            );
            break;
          case "type":
            item.type = constants.DIRECTORY;
            break;
          case "extension":
            break;
          default:
            item[attribute] = stats[attribute];
            break;
        }
      });
    }

    if (onEachDirectory) {
      item = onEachDirectory(item, path, stats);
    }
  } else {
    return null; // Or set item.size = 0 for devices, FIFO and sockets ?
  }
  return item;
}

export default directoryTree;
