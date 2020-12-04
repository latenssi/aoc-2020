import assert from "assert";
import { symmetricDifference } from "../lib/index";
import { Passport } from "./types";

function validateYear(
  min: number,
  max: number,
  value: string | undefined
): boolean {
  if (!!value && /\d{4}/.test(value) && value.length === 4) {
    const y = parseInt(value);
    return y >= min && y <= max;
  }
  return false;
}

function validateHeight(value: string | undefined): boolean {
  const reg = /(\d+)(cm|in)/;
  if (!!value && reg.test(value)) {
    const m = value.match(reg);
    const h = m ? parseInt(m[1]) : null;
    const t = m ? m[2] : null;
    if (h && t) {
      if (t === "cm") {
        return h >= 150 && h <= 193;
      } else if (t === "in") {
        return h >= 59 && h <= 76;
      }
    }
  }
  return false;
}

function validateHexColor(value: string | undefined): boolean {
  return !!value && /#[a-fA-f0-9]{6}/.test(value) && value.length === 7;
}

function validateEyeColor(value: string | undefined): boolean {
  return (
    !!value && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value)
  );
}

function validatePassportId(value: string | undefined): boolean {
  return !!value && /\d{9}/.test(value) && value.length === 9;
}

const REQUIRED_FIELDS = {
  byr: validateYear.bind(null, 1920, 2002),
  iyr: validateYear.bind(null, 2010, 2020),
  eyr: validateYear.bind(null, 2020, 2030),
  hgt: validateHeight,
  hcl: validateHexColor,
  ecl: validateEyeColor,
  pid: validatePassportId,
};

const OPTIONAL_FIELDS = {
  cid: (value: string | undefined) => !!value,
};

function validateField(key: string, value: string | undefined): boolean {
  switch (key) {
    case "byr":
    case "iyr":
    case "eyr":
    case "hgt":
    case "hcl":
    case "ecl":
    case "pid":
      return REQUIRED_FIELDS[key](value);
    case "cid":
      return OPTIONAL_FIELDS[key](value);
    default:
      return false;
  }
}

export function validatePassport(
  passport: Passport,
  strict: boolean = false
): boolean {
  const requiredKeys = new Set(Object.keys(REQUIRED_FIELDS));
  const optionalKeys = new Set(Object.keys(OPTIONAL_FIELDS));
  const passportKeys = new Set(Object.keys(passport));
  for (let k of optionalKeys) {
    passportKeys.delete(k);
  }

  const requiredFieldsPresent =
    symmetricDifference(passportKeys, requiredKeys).size === 0;

  const fieldValuesValid = Object.entries(passport).every(([key, value]) =>
    validateField(key, value)
  );

  return requiredFieldsPresent && (!strict || fieldValuesValid);
}

export function testStrictValidation() {
  assert.strictEqual(true, REQUIRED_FIELDS["byr"]("2002"));
  assert.strictEqual(true, REQUIRED_FIELDS["byr"]("1920"));
  assert.strictEqual(false, REQUIRED_FIELDS["byr"]("1919"));
  assert.strictEqual(false, REQUIRED_FIELDS["byr"]("2003"));

  assert.strictEqual(true, REQUIRED_FIELDS["iyr"]("2010"));
  assert.strictEqual(true, REQUIRED_FIELDS["iyr"]("2020"));
  assert.strictEqual(false, REQUIRED_FIELDS["iyr"]("2009"));
  assert.strictEqual(false, REQUIRED_FIELDS["iyr"]("2021"));

  assert.strictEqual(true, REQUIRED_FIELDS["eyr"]("2020"));
  assert.strictEqual(true, REQUIRED_FIELDS["eyr"]("2030"));
  assert.strictEqual(false, REQUIRED_FIELDS["eyr"]("2019"));
  assert.strictEqual(false, REQUIRED_FIELDS["eyr"]("2031"));

  assert.strictEqual(true, REQUIRED_FIELDS["hgt"]("60in"));
  assert.strictEqual(true, REQUIRED_FIELDS["hgt"]("190cm"));
  assert.strictEqual(false, REQUIRED_FIELDS["hgt"]("190in"));
  assert.strictEqual(false, REQUIRED_FIELDS["hgt"]("190"));

  assert.strictEqual(true, REQUIRED_FIELDS["hcl"]("#123abc"));
  assert.strictEqual(false, REQUIRED_FIELDS["hcl"]("#123abz"));
  assert.strictEqual(false, REQUIRED_FIELDS["hcl"]("123abc"));
  assert.strictEqual(false, REQUIRED_FIELDS["hcl"]("#123abcc"));

  assert.strictEqual(true, REQUIRED_FIELDS["ecl"]("brn"));
  assert.strictEqual(false, REQUIRED_FIELDS["ecl"]("wat"));

  assert.strictEqual(true, REQUIRED_FIELDS["pid"]("000000001"));
  assert.strictEqual(false, REQUIRED_FIELDS["pid"]("0123456789"));
}
