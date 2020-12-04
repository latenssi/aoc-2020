import assert from "assert";
import { readLinesBlank } from "../lib/index";
import { testStrictValidation, validatePassport } from "./lib";
import { Passport } from "./types";

async function getInput(filename: string = "input.txt"): Promise<Passport[]> {
  return parsePassports(await readLinesBlank(__dirname, filename));
}

function parsePassports(input: string[]): Passport[] {
  return input
    .map((l) => l.split("\n").join(" ").trim())
    .map((l) => {
      const entries = l.split(" ").map((d) => d.split(":"));
      return Object.fromEntries(entries);
    });
}

async function test1() {
  const passports = await getInput("test.txt");
  assert.strictEqual(passports.length, 4);
  const validated = passports.filter((p) => validatePassport(p));
  assert.strictEqual(validated.length, 2);
}

async function part1() {
  const passports = await getInput();
  const validated = passports.filter((p) => validatePassport(p));
  const result = validated.length;
  assert.strictEqual(result, 196);
  console.log(`Result part 1: ${result}`);
}

async function test2() {
  testStrictValidation();

  const passports = await getInput("test.txt");
  const validated = passports.filter((p) => validatePassport(p, true));
  assert.strictEqual(validated.length, 2);

  const validPassports = await getInput("valid.txt");
  const validatedValid = validPassports.filter((p) =>
    validatePassport(p, true)
  );
  assert.strictEqual(validatedValid.length, validPassports.length);

  const invalidPassports = await getInput("invalid.txt");
  const validatedInvalid = invalidPassports.filter((p) =>
    validatePassport(p, true)
  );
  assert.strictEqual(validatedInvalid.length, 0);
}

async function part2() {
  const passports = await getInput();
  const validated = passports.filter((p) => validatePassport(p, true));
  const result = validated.length;
  assert.strictEqual(result, 114);
  console.log(`Result part 2: ${result}`);
}

console.log(__dirname);

test1();
part1();

test2();
part2();
