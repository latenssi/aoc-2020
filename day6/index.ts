import assert from "assert";
import { readLinesBlank, arraySum, intersection } from "../lib/index";

async function getInput(filename = "input.txt"): Promise<string[][]> {
  const groups = await readLinesBlank(__dirname, filename);
  return groups.map((g) => g.split("\n"));
}

function calculateAnswersForGroupAny(group: string[]): number {
  return new Set(group.join("")).size;
}

function calculateAnswersForGroupAll(group: string[]): number {
  return group
    .filter((l) => l !== "")
    .reduce(
      (acc, cur) => intersection(acc, new Set(cur)) as Set<string>,
      new Set(group[0])
    ).size;
}

async function test1() {
  const groups = await getInput("test.txt");
  const sum = arraySum(groups.map(calculateAnswersForGroupAny));
  assert.strictEqual(sum, 11);
}

async function part1() {
  const groups = await getInput();
  const sum = arraySum(groups.map(calculateAnswersForGroupAny));
  assert.strictEqual(sum, 6590);
  console.log(`Result part 1: ${sum}`);
}

async function test2() {
  const groups = await getInput("test.txt");
  const sum = arraySum(groups.map(calculateAnswersForGroupAll));
  assert.strictEqual(sum, 6);
}

async function part2() {
  const groups = await getInput();
  const sum = arraySum(groups.map(calculateAnswersForGroupAll));
  assert.strictEqual(sum, 3288);
  console.log(`Result part 2: ${sum}`);
}

console.log(__dirname);

test1();
part1();

test2();
part2();
