import assert from "assert";
import { off } from "process";
import { readLines } from "../lib/index";

type Seat = { row: number; column: number; id: number };

async function getInput(filename = "input.txt"): Promise<Seat[]> {
  return parseSeatPositions(await readLines(__dirname, filename));
}

function parseSeatPositions(input: string[]): Seat[] {
  return input.map((l) => parseSeatPosition(l));
}

function parseSeatPosition(seatCode: string): Seat {
  let rowMin = 0;
  let rowMax = 127;
  let colMin = 0;
  let colMax = 7;
  let row = 0;
  let column = 0;
  [...seatCode].forEach((c) => {
    const rowRange = rowMax - rowMin;
    const colRange = colMax - colMin;
    switch (c) {
      case "F":
        row = rowMin;
        rowMax -= Math.ceil(rowRange / 2);
        break;
      case "B":
        row = rowMax;
        rowMin += Math.ceil(rowRange / 2);
        break;
      case "L":
        column = colMin;
        colMax -= Math.ceil(colRange / 2);
        break;
      case "R":
        column = colMax;
        colMin += Math.ceil(colRange / 2);
        break;
      default:
        break;
    }
  });
  return { row, column, id: row * 8 + column };
}

function parseMaxSeatId(seats: Seat[]): number {
  return seats.reduce((acc, c) => (c.id > acc ? c.id : acc), 0);
}

function findMissingSeat(arr: number[]): number | undefined {
  arr = arr.sort((a, b) => a - b);
  const offset = arr[0];
  const n = arr.find((n, idx) => n - offset !== idx);
  return n ? n - 1 : undefined;
}

async function test1() {
  const seats = await getInput("test.txt");
  assert.strictEqual(seats[0].id, 567);
  assert.strictEqual(seats[1].id, 119);
  assert.strictEqual(seats[2].id, 820);
  assert.strictEqual(seats[3].id, 0);
  assert.strictEqual(seats[4].id, 1023);
  assert.strictEqual(seats[5].id, 357);
  assert.strictEqual(seats[6].id, 338);
  assert.strictEqual(seats[7].id, 685);
  assert.strictEqual(parseMaxSeatId(seats), 1023);
}

async function part1() {
  const seats = await getInput();
  const maxSeatId = parseMaxSeatId(seats);
  assert.strictEqual(maxSeatId, 904);
  console.log(`Result part 1: ${maxSeatId}`);
}

async function part2() {
  const seats = await getInput();
  const IDs = seats.map((s) => s.id);
  const seatId = findMissingSeat(IDs);
  assert.strictEqual(seatId, 669);
  console.log(`Result part 2: ${seatId}`);
}

console.log(__dirname);

test1();
part1();

part2();
