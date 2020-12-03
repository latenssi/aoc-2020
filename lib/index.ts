import { promises as fs } from "fs";
import { resolve } from "path";

function readFile(filepath: string): Promise<string> {
  return fs.readFile(filepath, { encoding: "utf8" });
}

export async function readLines(
  folder: string,
  callback?: (value: string, index: number, array: string[]) => any,
  filename: string = "input.txt"
): Promise<any[]> {
  const filepath = resolve(folder, filename);
  const content = await readFile(filepath);
  const lines = content.split("\n").slice(0, -1);

  if (callback) {
    return lines.map(callback);
  }

  return lines;
}

export function arrayProduct(array: number[]): number {
  return array.reduce((acc, cur) => acc * cur, 1);
}
