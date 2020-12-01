import { promises as fs } from "fs";
import { resolve } from "path";

export function readInput(folder: string) {
  const filepath = resolve(folder, "input.txt");
  return fs.readFile(filepath, { encoding: "utf8" });
}
