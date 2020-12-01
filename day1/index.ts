import { readInput } from "../lib/index";

function factors(input: Array<number>, target: number) {
  return input
    .map((i) => target - i)
    .filter((i) => i >= input[0])
    .filter((i) => ~input.indexOf(i));
}

async function getInput() {
  return (await readInput(__dirname))
    .split("\n")
    .slice(0, -1) // Take out the last empty line
    .map((i) => parseInt(i))
    .sort((a, b) => a - b);
}

async function part1() {
  const input = await getInput();

  const numbers = factors(input, 2020);

  console.log(
    `Result part 1: numbers [${numbers}], product ${numbers[0] * numbers[1]}`
  );
}

async function part2() {
  const input = await getInput();

  // a + b + c = 2020
  // a + b = 2020 - c
  const aPlusB = input
    .map((c) => 2020 - c)
    .filter((i) => i >= input[0] * 2) // has to be atleast the smallest * 2
    .reverse();

  const aPlusBFactors = aPlusB.map((ab) => factors(input, ab));

  const numbers = Array.from(new Set(aPlusBFactors.flat()));

  console.log(
    `Result part 2: numbers [${numbers}], product ${
      numbers[0] * numbers[1] * numbers[2]
    }`
  );
}

part1();
part2();
