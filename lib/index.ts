import { promises as fs } from "fs";
import { resolve } from "path";

export async function readLines(
  folder: string,
  callback: Function = (l: string): string => l
): Promise<any[]> {
  const filepath = resolve(folder, "input.txt");
  return (await fs.readFile(filepath, { encoding: "utf8" }))
    .split("\n")
    .slice(0, -1) // Take out the last empty line
    .map((l) => callback(l));
}
