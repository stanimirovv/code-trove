import fs from "fs";

function getTotalScore(path: string) {
  const entries = readEntriesFromFile(path);

  const sharedItems = entries.map(([firstHalf, secondHalf]) =>
    findSharedItems(firstHalf, secondHalf)
  );

  const prioritySum = calculatePrioritySum(sharedItems);

  return prioritySum;
}

function readEntriesFromFile(path: string) {
  try {
    return fs
      .readFileSync(path)
      .toString()
      .split("\n")
      .filter((line) => line !== undefined)
      .map((line) => {
        const halfIdx = line.length / 2;
        const firstPath = line.substring(0, halfIdx);
        const secondPath = line.substring(halfIdx, line.length);
        return [firstPath, secondPath];
      });
  } catch (err: any) {
    console.log("Cloud not read input file: ", err.toString);
    throw err;
  }
}

function findSharedItems(firstHalf: string, secondHalf: string): string {
  let sharedItems = "";
  firstHalf.split("").forEach((char) => {
    if (secondHalf.includes(char) && !sharedItems.includes(char)) {
      sharedItems += char;
    }
  });

  return sharedItems;
}

function calculatePrioritySum(sharedItems: string[]): number {
  let sum = 0;
  sharedItems.forEach((item) => {
    let chars = item.split("");
    chars.forEach((char) => {
      sum += getItemPriority(item);
    });
  });

  return sum;
}

function getItemPriority(item: string) {
  const itemAsciiValue = item.charCodeAt(0);
  if (itemAsciiValue > 96) {
    return itemAsciiValue - 96;
  } else {
    return itemAsciiValue - 38;
  }
}

console.log(getTotalScore("./input_test"));
console.log(getTotalScore("./input"));
