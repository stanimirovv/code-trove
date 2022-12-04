import fs from "fs";

function getTotalScore(path: string) {
  const cleaningSectionPairs: CleaningSection[][] = readEntriesFromFile(path);
  const overLappingElvesCount = cleaningSectionPairs.filter(
    ([sectionA, sectionB]) => doSectionsOverlap(sectionA, sectionB)
  ).length;
  return overLappingElvesCount;
}

type CleaningSection = {
  start: number;
  end: number;
};

function readEntriesFromFile(path: string) {
  try {
    return fs
      .readFileSync(path)
      .toString()
      .split("\n")
      .filter((line) => line !== undefined)
      .map((line) => {
        const [elfA, elfB] = line.split(",");
        const [startA, endA] = elfA.split("-");
        const [startB, endB] = elfB.split("-");
        const cleaningSectionsA: CleaningSection = {
          start: Number.parseInt(startA),
          end: Number.parseInt(endA),
        };
        const cleaningSectionsB: CleaningSection = {
          start: Number.parseInt(startB),
          end: Number.parseInt(endB),
        };
        return [cleaningSectionsA, cleaningSectionsB];
      });
  } catch (err: any) {
    console.log("Cloud not read input file: ", err.toString);
    throw err;
  }
}

function doSectionsOverlap(
  sectionA: CleaningSection,
  sectionB: CleaningSection
): boolean {
  const aOverlapsB =
    // (sectionA.start <= sectionB.start && sectionA.end >= sectionB.end) ||
    sectionB.start <= sectionA.end && sectionB.end >= sectionA.start;

  return aOverlapsB;
}

console.log(getTotalScore("./input_test"));
console.log(getTotalScore("./input"));
