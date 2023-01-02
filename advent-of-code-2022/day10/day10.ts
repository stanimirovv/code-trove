import fs from "fs";

function parseInput(input: string) {
  const lines = fs.readFileSync(input).toString().split("\n");
  return lines.map((line) => {
    const [command, value] = line.split(" ");
    if (value !== undefined) {
      const intValue = Number.parseInt(value);
      return [command, intValue];
    }
    return [command, 0];
  });
}

function generateSequence(instructions: any[][]) {
  const sequence: number[] = [];
  let currentValue = 1;
  instructions.forEach((instruction) => {
    const [command, value] = instruction;
    if (command === "noop") {
      sequence.push(currentValue);
    } else if (command === "addx") {
      sequence.push(currentValue);
      sequence.push(currentValue);
      currentValue += value;
    }
  });
  return sequence;
}

function generateSteps(sequenceLength: number) {
  const steps: number[] = [];
  for (let i = 20; i < sequenceLength; i += 40) {
    steps.push(i);
  }
  return steps;
}

function runProgram(input: string) {
  const instructions = parseInput(input);
  const sequence = generateSequence(instructions);
  const stepps = generateSteps(sequence.length);
  console.log("instructions: ", instructions);
  console.log("sequence: ", sequence);
  console.log("stepps: ", stepps, "sequence.length: ", sequence.length);
  console.log(JSON.stringify(sequence));
  let sum = stepps.reduce((acc, step) => {
    acc += sequence[step - 1] * step;
    console.log(
      "acc: ",
      acc,
      "step: ",
      step,
      sequence[step],
      sequence[step] * step
    );
    return acc;
  }, 0);
  console.log("sum: ", sum);
}

// runProgram("input");
// runProgram("input");
runProgram("input_real");
