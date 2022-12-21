import fs from "fs";

function countVisibleTrees(input: string) {
  const forrest = parseInput(input);
  console.log(forrest);

  let visibleTrees = 0;
  for (let i = 1; i < forrest.length - 1; i++) {
    let row = "";
    for (let j = 1; j < forrest[i].length - 1; j++) {
      row = `${row}${forrest[i][j]}`;
      const visibleFromRight = isVisibleFromRight(forrest[i], j);
      const visibleFromLeft = isVisibleFromLeft(forrest[i], j);
      const visibleFromUp = isVisibleFromUp(forrest, i, j);
      const visibleFromDown = isVisibleFromDown(forrest, i, j);

      visibleFromRight || visibleFromLeft || visibleFromUp || visibleFromDown
        ? visibleTrees++
        : null;
    }
    console.log(row);
  }
  // add outside trees
  visibleTrees += forrest[0].length * 2;
  visibleTrees += forrest.length * 2;

  console.log(forrest[0].length * 2, forrest.length * 2);
  visibleTrees -= 4;
  console.log(visibleTrees);
}

function parseInput(input: string) {
  const lines = fs.readFileSync(input, "utf-8").split("\n");
  let forrest: number[][] = [];
  lines.forEach((line) => {
    console.log("line: ", line);
    const treeRow = line.split("").map((char) => Number.parseInt(char));
    forrest.push(treeRow);
  });
  return forrest;
}

function isVisibleFromRight(
  currentRow: number[],
  currentColumn: number
): boolean {
  for (let k = currentColumn + 1; k < currentRow.length; k++) {
    if (currentRow[k] >= currentRow[currentColumn]) {
      return false;
    }
  }
  return true;
}

function isVisibleFromLeft(
  currentRow: number[],
  currentColumn: number
): boolean {
  for (let k = 0; k < currentColumn; k++) {
    if (currentRow[k] >= currentRow[currentColumn]) {
      return false;
    }
  }
  return true;
}

function isVisibleFromUp(
  forrest: number[][],
  currentColumn: number,
  currentRow: number
): boolean {
  for (let k = 0; k < currentColumn; k++) {
    if (forrest[k][currentRow] >= forrest[currentColumn][currentRow]) {
      return false;
    }
  }
  return true;
}

function isVisibleFromDown(
  forrest: number[][],
  currentColumn: number,
  currentRow: number
): boolean {
  for (let k = currentColumn + 1; k < forrest[0].length; k++) {
    if (forrest[k][currentRow] >= forrest[currentColumn][currentRow]) {
      return false;
    }
  }
  return true;
}
countVisibleTrees("input_real");
