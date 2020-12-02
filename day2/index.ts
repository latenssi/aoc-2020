import { assert } from "console";
import { readLines } from "../lib/index";

type Policy = {
  min: number;
  max: number;
  char: string;
};

type Parsed = {
  policy: Policy;
  password: string;
};

async function getInput() {
  return await readLines(__dirname, parsePolicy);
}

const pattern = /(\d+)-(\d+) (\w): (\w+)/;

function parsePolicy(line: string): Parsed {
  const [_, min, max, char, password] = pattern.exec(line) || [];
  return { policy: { min: parseInt(min), max: parseInt(max), char }, password };
}

function checkPassword1(policy: Policy, password: string): boolean {
  const count = password.match(new RegExp(policy.char, "g") || [])?.length;
  return !!count && count >= policy.min && count <= policy.max;
}

function checkPassword2(policy: Policy, password: string): boolean {
  const first = password[policy.min - 1] === policy.char;
  const second = password[policy.max - 1] === policy.char;
  return (first && !second) || (!first && second);
}

async function part1() {
  const input = await getInput();
  const valid = input.filter(({ policy, password }) =>
    checkPassword1(policy, password)
  );

  console.log(`Result part 1: ${valid.length}`);
}

async function part2() {
  const input = await getInput();
  const valid = input.filter(({ policy, password }) =>
    checkPassword2(policy, password)
  );

  console.log(`Result part 2: ${valid.length}`);
}

function test2() {
  const input = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"].map(
    parsePolicy
  );
  const valid = input.filter(({ policy, password }) =>
    checkPassword2(policy, password)
  );
  assert(valid.length === 1, "Error in checkpassword2");
}

part1();
part2();
test2();
