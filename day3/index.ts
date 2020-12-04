import assert from "assert";
import { arrayProduct, readLines } from "../lib/index";

type Grid = {
  width: number;
  height: number;
  data: string;
};

type GridObject = "." | "#";

type Vec2d = {
  x: number;
  y: number;
};

async function getInput(filename: string = "input.txt"): Promise<Grid> {
  return parseGrid(await readLines(__dirname, filename));
}

function parseGrid(input: string[]): Grid {
  const width = input[0].length;
  const height = input.length;
  const data = input.join("");
  return { width, height, data };
}

function getGridObjectAtCoord(grid: Grid, coord: Vec2d): GridObject {
  const x = coord.x % grid.width;
  const y = coord.y;
  assert(x >= 0 && y >= 0, "Illegal coordinates (<0)");
  assert(y < grid.height, "Illegal y coordinate (>=grid.height)");
  const index = y * grid.width + x;
  return grid.data[index] as GridObject;
}

function getPath(grid: Grid, slope: Vec2d): GridObject[] {
  let x = 0;
  let y = 0;
  let result: GridObject[] = [];
  while (y < grid.height) {
    result.push(getGridObjectAtCoord(grid, { x, y }));
    x += slope.x;
    y += slope.y;
  }
  return result;
}

function countGridObjectInPath(object: GridObject, path: GridObject[]): number {
  return path.reduce((acc, cur) => (cur === object ? acc + 1 : acc), 0);
}

async function test1() {
  const grid = await getInput("test.txt");
  assert(getGridObjectAtCoord(grid, { x: 11, y: 1 }) === "#");
  assert(getGridObjectAtCoord(grid, { x: 23, y: 2 }) === "#");
  const slope: Vec2d = { x: 3, y: 1 };
  const path = getPath(grid, slope);
  assert.deepStrictEqual(
    path,
    [".", ".", "#", ".", "#", "#", ".", "#", "#", "#", "#"],
    "Path parsed incorrectly"
  );
  const count = countGridObjectInPath("#", path);
  assert(count === 7, "Number of #'s is incorrect");
}

async function part1() {
  const grid = await getInput();

  const slope: Vec2d = { x: 3, y: 1 };
  const path = getPath(grid, slope);
  const count = countGridObjectInPath("#", path);

  assert(count === 191);

  console.log(`Result part 1: ${count}`);
}

async function test2() {
  const grid = await getInput("test.txt");
  const slopes: Vec2d[] = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];
  const paths = slopes.map((slope) => getPath(grid, slope));
  const counts = paths.map((path) => countGridObjectInPath("#", path));
  const product = arrayProduct(counts);
  assert(product === 336, "Incorrect product in test2");
}

async function part2() {
  const grid = await getInput();

  const slopes: Vec2d[] = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];
  const paths = slopes.map((slope) => getPath(grid, slope));
  const counts = paths.map((path) => countGridObjectInPath("#", path));
  const product = arrayProduct(counts);

  assert(product === 1478615040);

  console.log(`Result part 2: ${product}`);
}

console.log(__dirname);

test1();
part1();

test2();
part2();
