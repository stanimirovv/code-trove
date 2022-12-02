import * as fs from "fs";

function getMaximumCarriedCalories() {
  const entries: string[] = readEntriesFromFile("./input");

  let maxSum = 0;
  let currentSum = 0;
  let elves: Number[] = [];
  entries.forEach((value) => {
    if (value == "") {
      maxSum = maxSum > currentSum ? maxSum : currentSum;
      elves.push(currentSum);
      currentSum = 0;
      return;
    }

    const parsedInt = Number.parseInt(value);
    if (parsedInt === undefined) {
      console.log("Error parsing integer.");
      return;
    }

    currentSum += parsedInt;
  });

  console.log("BiggestSum: ", maxSum);

  console.log("sorted Elves:", elves.sort().reverse());
}

function readEntriesFromFile(path: string) {
  try {
    return fs.readFileSync(path).toString().split("\n");
  } catch (err: any) {
    console.log("Cloud not read input file: ", err.toString);
    throw err;
  }
}

getMaximumCarriedCalories();
