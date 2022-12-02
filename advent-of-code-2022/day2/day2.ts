import * as fs from "fs";

const opponentPlayMapping: Record<string, string> = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const playerPlayMapping: Record<string, string> = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};
const actualMapping: Record<string, string> = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const turnToPointsMapping: Record<string, number> = {
  rock: 1,
  scissors: 3,
  paper: 2,
};

const outComeToPointsMapping: Record<string, number> = {
  win: 6,
  draw: 3,
  loss: 0,
};

const winMapping: Record<string, string> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function getTotalScore() {
  const rounds: string[] = readEntriesFromFile("./input");
  let total = 0;
  rounds.forEach((round) => {
    const [opponentPlay, playerPlay] = parseRound(round);

    console.log("asd", opponentPlay, playerPlay, "", total);
    total += turnToPointsMapping[playerPlay];

    if (opponentPlay == playerPlay) {
      total += outComeToPointsMapping.draw;
    }

    if (winMapping[playerPlay] === opponentPlay) {
      total += outComeToPointsMapping.win;
    }

    console.log("total", total);
    return total;
  });
}

function parseRound(round: string) {
  const [opponentPlay, playerPlay] = round.split(" ");
  return [opponentPlayMapping[opponentPlay], playerPlayMapping[playerPlay]];
}

function readEntriesFromFile(path: string) {
  try {
    return fs.readFileSync(path).toString().split("\n");
  } catch (err: any) {
    console.log("Cloud not read input file: ", err.toString);
    throw err;
  }
}

console.log(getTotalScore());
