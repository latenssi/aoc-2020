use std::collections::HashMap;
use std::fs;

fn pairs_sums_to(target: i32, arr: &[i32]) -> Vec<[usize; 2]> {
    let mut hash_map = HashMap::new();
    let mut result = Vec::new();

    for i in 0..arr.len() {
        let k = target - arr[i];
        hash_map.insert(k, i);
    }

    for i in 0..arr.len() {
        let k = arr[i];
        match hash_map.get(&k) {
            Some(j) => {
                if i < *j {
                    result.push([i, *j])
                } // Otherwise the pair already exists in the vector
            }
            None => (),
        }
    }

    return result;
}

fn part1() {
    let input =
        fs::read_to_string("day1/input.txt").expect("Something went wrong reading the file");

    let input_parsed: Vec<i32> = input
        .split_whitespace()
        .map(|s| s.parse().expect("parse error"))
        .collect();

    println!("Input:\n{:?}", input_parsed);

    let pairs = pairs_sums_to(2020, &input_parsed);

    println!("Pairs: {:?}", pairs);

    let result = pairs[0]
        .into_iter()
        .fold(1, |acc, i: usize| acc * input_parsed[i]);

    println!("Result: {:?}", result)
}

fn part2() {
    let input =
        fs::read_to_string("day1/input.txt").expect("Something went wrong reading the file");

    let input_parsed: Vec<i32> = input
        .split_whitespace()
        .map(|s| s.parse().expect("parse error"))
        .collect();

    println!("Input:\n{:?}", input_parsed);

    let mut triplets = Vec::new();

    for i in 0..input_parsed.len() {
        let pairs: Vec<[usize; 2]> = pairs_sums_to(2020 - input_parsed[i], &input_parsed)
            .into_iter()
            .filter(|p| p[0] > i)
            .collect();

        for [j, k] in pairs {
            triplets.push([i, j, k])
        }
    }

    println!("Triplets: {:?}", triplets);

    let result = triplets[0]
        .into_iter()
        .fold(1, |acc, i: usize| acc * input_parsed[i]);

    println!("Result: {:?}", result)
}

pub fn run() {
    part1();
    part2();
}
