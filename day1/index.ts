import { readLines } from "../lib/index";

async function getInput(): Promise<number[]> {
  return (await readLines(__dirname, parseInt)).sort((a, b) => a - b);
}

function factors(input: Array<number>, target: number): number[] {
  return input
    .map((i) => target - i)
    .filter((i) => i >= input[0])
    .filter((i) => ~input.indexOf(i));
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
