import fs from "fs";

function getTotalScore(path: string) {
  const entries = readEntriesFromFile(path);

  const sharedItems = entries.map((elfGroup) => findSharedItems(elfGroup));
  const prioritySum = calculatePrioritySum(sharedItems);

  return prioritySum;
}

function readEntriesFromFile(path: string) {
  try {
    const lines = fs
      .readFileSync(path)
      .toString()
      .split("\n")
      .filter((line) => line !== undefined);

    let elfGroups: string[][] = [];
    let currentElfGroup: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      currentElfGroup.push(lines[i]);
      if ((i + 1) % 3 === 0) {
        elfGroups.push(currentElfGroup);
        currentElfGroup = [];
      }
    }
    return elfGroups;
  } catch (err: any) {
    console.log("Cloud not read input file: ", err.toString);
    throw err;
  }
}

function findSharedItems(elfGroup: string[]): string {
  const [first, second, third] = elfGroup;
  let sharedItems = "";
  first.split("").forEach((char) => {
    // console.log("shar:", char);
    // console.log("second: ", second.includes(char))
    // console.log(second.includes(third) &&
    if (
      second.includes(char) &&
      third.includes(char) &&
      !sharedItems.includes(char)
    ) {
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
