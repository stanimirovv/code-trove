import fs from "fs";

type Shuffle = {
  move: number;
  from: number;
  to: number;
};

function getTopStacksAfterShuffling(
  inputStacksPath: string,
  inputShufflesPath: string
) {
  const stacks = fs.readFileSync(inputStacksPath, "utf8").split("\n");
  const parsedStacks = stacks.map((stack) => stack.split(",").reverse());

  const shuffles = fs.readFileSync(inputShufflesPath, "utf8").split("\n");
  const parsedShuffles: Shuffle[] = shuffles.map((shuffle) =>
    parseShuffle(shuffle)
  );
  console.log(parsedStacks);
  console.log(parsedShuffles);
  const shuffledStacks = applyShuffles(parsedStacks, parsedShuffles);
  const topStacks = shuffledStacks.map((stack) => stack[stack.length - 1]);
  const concatenatedTopStacks = topStacks.join("");
  console.log("Top stacks:", concatenatedTopStacks);
}

function parseShuffle(shuffle: string) {
  let [placeholder1, move, placeholder2, from, placeholder3, to] =
    shuffle.split(" ");
  return {
    move: Number.parseInt(move),
    from: Number.parseInt(from) - 1,
    to: Number.parseInt(to) - 1,
  };
}

function applyShuffles(stacks: string[][], shuffles: Shuffle[]): string[][] {
  shuffles.forEach((shuffle) => {
    let { move, from, to } = shuffle;
    console.log("move:  ", move, "from:", from, "to:", to);
    console.log("stacks before:", stacks);
    while (move > 0) {
      console.log("ping");
      const topCard = stacks[from].pop();
      if (topCard !== undefined) {
        stacks[to].push(topCard);
      }
      move--;
    }
    console.log("stacks after:", stacks);
  });

  return stacks;
}

getTopStacksAfterShuffling("input_stacks", "input_moves");
