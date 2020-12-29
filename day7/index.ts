import assert from "assert";
import { arraySum, readLines } from "../lib/index";

type Rule = {
  container: string;
  content: string;
};

const containerPattern = /(.*) bags contain (.*)./;
const contentPattern = /(\d+) ([a-z]+ [a-z]+)/g;

async function getInput(filename = "input.txt"): Promise<any> {
  return (await readLines(__dirname, filename)).map((l) => parseRule(l));
}

function parseRule(ruleStr: string): Rule {
  const [_, container, content] = containerPattern.exec(ruleStr) || [];
  return { container, content };
}

function validContainersFor(rules: Rule[], target: string): string[] {
  const recurse = validContainersFor.bind(null, rules);
  const containers = rules
    .filter((r) => r.content.indexOf(target) !== -1)
    .map((r) => r.container);
  return Array.from(new Set(containers.concat(containers.flatMap(recurse))));
}

function containerContains(rules: Rule[], target: string): number {
  const recurse = containerContains.bind(null, rules);
  const rule = rules.find((r) => r.container === target);
  const contents = [
    ...(rule?.content.matchAll(contentPattern) || []),
  ].map(([_, count, container]) => ({ count: parseInt(count), container }));
  return 1 + arraySum(contents.flatMap((c) => c.count * recurse(c.container)));
}

async function test1() {
  const rules = await getInput("test.txt");
  const target = "shiny gold";
  const result = validContainersFor(rules, target).length;
  assert.strictEqual(result, 4);
}

async function part1() {
  const rules = await getInput();
  const target = "shiny gold";
  const result = validContainersFor(rules, target).length;
  assert.strictEqual(result, 259);
  console.log(`Result part 1: ${result}`);
}

async function test2() {
  const rules = await getInput("test2.txt");
  const target = "shiny gold";
  const result = containerContains(rules, target) - 1; // Result contains the target container itself
  assert.strictEqual(result, 126);
}

async function part2() {
  const rules = await getInput();
  const target = "shiny gold";
  const result = containerContains(rules, target) - 1; // Result contains the target container itself
  assert.strictEqual(result, 45018);
  console.log(`Result part 2: ${result}`);
}

console.log(__dirname);

test1();
part1();

test2();
part2();
