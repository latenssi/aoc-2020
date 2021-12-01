use std::fs;

fn validate(line: &str) -> bool {
    let parts: Vec<&str> = line.split_whitespace().collect();

    let r_parts: Vec<usize> = parts[0]
        .split("-")
        .map(|s| s.parse().expect("parse error"))
        .collect();

    let c_parts: Vec<char> = parts[1].chars().collect();
    let count = parts[2].matches(c_parts[0]).count();

    return count >= r_parts[0] && count <= r_parts[1];
}

pub fn run() {
    let input =
        fs::read_to_string("day2/input.txt").expect("Something went wrong reading the file");

    let valid = input.lines().into_iter().filter(|l| validate(l));

    println!("Result: {:?}", valid.count())
}
