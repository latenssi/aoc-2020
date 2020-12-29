import { promises as fs } from "fs";
import { resolve } from "path";

function readFile(directory: string, filename: string): Promise<string> {
  const filepath = resolve(directory, filename);
  return fs.readFile(filepath, { encoding: "utf8" });
}

export async function readLines(
  directory: string,
  filename: string
): Promise<string[]> {
  const content = await readFile(directory, filename);
  const lines = content.split("\n").slice(0, -1);
  return lines;
}

export async function readLinesBlank(
  directory: string,
  filename: string
): Promise<string[]> {
  const content = await readFile(directory, filename);
  const lines = content.split("\n\n");
  return lines;
}

export function arrayProduct(array: number[]): number {
  return array.reduce((acc, cur) => acc * cur, 1);
}

export function arraySum(array: number[]): number {
  return array.reduce((acc, cur) => acc + cur, 0);
}

export function intersection(setA: Set<string>, setB: Set<string>) {
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

export function symmetricDifference(setA: Set<string>, setB: Set<string>) {
  const _difference = new Set(setA);
  for (let elem of setB) {
    if (_difference.has(elem)) {
      _difference.delete(elem);
    } else {
      _difference.add(elem);
    }
  }
  return _difference;
}
