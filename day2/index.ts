import assert from "assert";
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

async function getInput(filename = "input.txt"): Promise<Parsed[]> {
  return parsePolicies(await readLines(__dirname, filename));
}

const pattern = /(\d+)-(\d+) (\w): (\w+)/;

function parsePolicies(input: string[]): Parsed[] {
  return input.map((line) => {
    const [_, min, max, char, password] = pattern.exec(line) || [];
    return {
      policy: { min: parseInt(min), max: parseInt(max), char },
      password,
    };
  });
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

  assert(valid.length === 546);

  console.log(`Result part 1: ${valid.length}`);
}

async function test2() {
  const input = await getInput("test.txt");
  const valid = input.filter(({ policy, password }) =>
    checkPassword2(policy, password)
  );
  assert(valid.length === 1, "Error in checkpassword2");
}

async function part2() {
  const input = await getInput();
  const valid = input.filter(({ policy, password }) =>
    checkPassword2(policy, password)
  );

  assert(valid.length === 275);

  console.log(`Result part 2: ${valid.length}`);
}

console.log(__dirname);

part1();

test2();
part2();
