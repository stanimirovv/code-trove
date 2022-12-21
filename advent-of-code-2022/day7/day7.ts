import fs from "fs";

function getSizeOfDirectories(input: string, sizeThreshold: number): number {
  const lines = fs.readFileSync(input, "utf-8").split("\n");

  // parse commands output
  let currentPath: string[] = [];
  let pathToSize: Record<string, number> = {};
  let currentDirSize = 0;
  lines.forEach((line) => {
    if (isCommand(line)) {
      const [_, command, parameter] = line.split(" ");
      if (command == "cd") {
        const path = currentPath.length > 0 ? currentPath.join("") : "/";

        if (pathToSize[path] === undefined) {
          pathToSize[path] = currentDirSize;
        }
        currentDirSize = 0;
        currentPath = applyCDCommand(currentPath, parameter);
        console.log("after apply command", currentPath);
      }
    } else {
      // file or directory
      if (isDir(line)) {
        // Adding file size to parent directory is hard
        console.log("Dir:", line);
      } else {
        const [size, name] = parseLine(line);
        console.log("beggining to parse name:", name, "size:", size);

        currentDirSize += size;
        // If a path contains another path fully, add to it
        Object.keys(pathToSize).forEach((path) => {
          const currentPathConcatenated = currentPath.join("");
          if (currentPathConcatenated.indexOf(path) !== -1) {
            pathToSize[path] += size;
          }
        });
        console.log(`ending name: ${name}, size: ${size}`);
      }
    }
  });

  const paths = Object.keys(pathToSize);
  paths.forEach((path) => {
    paths.forEach((secondPath) => {
      if (secondPath.indexOf(path) !== -1 && secondPath !== path) {
        pathToSize[path] += pathToSize[secondPath];
      }
    });
  });
  console.log(pathToSize);
  const sum = Object.values(pathToSize)
    .filter((size) => size <= sizeThreshold)
    .reduce((sum, size) => sum + size, 0);

  return sum;
}

function applyCDCommand(
  currentPath: string[],
  parameter: string | undefined
): string[] {
  if (parameter === "..") {
    return currentPath.slice(0, currentPath.length - 1);
  } else if (parameter !== undefined) {
    return [...currentPath, parameter];
  } else {
    return currentPath;
  }
}

function parseLine(line: string): any[] {
  const [size, name] = line.split(" ");
  return [Number.parseInt(size), name];
}

function isCommand(line: string): boolean {
  return line.indexOf("$") === 0;
}

function isDir(line: string): boolean {
  return line.indexOf("dir") === 0;
}

console.log("1111", getSizeOfDirectories("input", 100000));
// console.log(getSizeOfDirectories("test_input", 100000) === 95437);
