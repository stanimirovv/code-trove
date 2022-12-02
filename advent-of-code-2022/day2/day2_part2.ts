import * as fs from "fs";

const opponentPlayMapping: Record<string, string> = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const inputToOutcome: Record<string, string> = {
  X: "loss",
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

const moveToOutcomeMapping: any = {
  rock: { win: "paper", loss: "scissors", draw: "rock" },
  scissors: { win: "rock", loss: "paper", draw: "scissors" },
  paper: { win: "scissors", loss: "rock", draw: "paper" },
};

function getTotalScore() {
  const rounds: string[] = readEntriesFromFile("./input");
  let total = 0;
  rounds.forEach((round) => {
    const [opponentPlay, expectedOutcome] = parseRound(round);
    total += outComeToPointsMapping[expectedOutcome];

    const playerChoice = moveToOutcomeMapping[opponentPlay][expectedOutcome];
    total += turnToPointsMapping[playerChoice];

    console.log("total", total);
    return total;
  });
}

function parseRound(round: string) {
  const [opponentPlay, playerPlay] = round.split(" ");
  return [opponentPlayMapping[opponentPlay], inputToOutcome[playerPlay]];
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
