#[derive(Clone)]
enum Command {
    NOP,
    JMP,
    ACC,
}

#[derive(Clone)]
struct Instruction {
    command: Command,
    argument: Option<String>,
    exec_count: usize,
}

struct Machine {
    pointer: usize,
    accumulator: isize,
    instructions: Vec<Instruction>,
}

impl Instruction {
    fn from_string(s: &str) -> Instruction {
        let parts: Vec<&str> = s.split_whitespace().collect();

        let (command, argument) = match parts[0] {
            "jmp" => (Command::JMP, Some(String::from(parts[1]))),
            "acc" => (Command::ACC, Some(String::from(parts[1]))),
            _ => (Command::NOP, None),
        };

        Instruction {
            command,
            argument,
            exec_count: 0,
        }
    }

    fn arg<T: std::str::FromStr>(&self) -> Result<T, T::Err> {
        self.argument.as_ref().unwrap_or(&String::from("0")).parse()
    }
}

impl Machine {
    fn step(&mut self) -> u8 {
        let inst = &mut self.instructions[self.pointer];

        inst.exec_count += 1;

        if inst.exec_count > 1 {
            return 2;
        }

        match inst.command {
            Command::ACC => {
                let arg: isize = inst.arg().unwrap();
                self.accumulator += arg;
                self.pointer += 1;
            }
            Command::JMP => {
                let arg: isize = inst.arg().unwrap();
                let abs = arg.unsigned_abs();
                if arg < 0 {
                    self.pointer -= abs
                } else {
                    self.pointer += abs
                }
            }
            Command::NOP => self.pointer += 1,
        }

        if self.pointer >= self.instructions.len() {
            return 1;
        }

        0
    }
}

fn part1() {
    let input =
        std::fs::read_to_string("day8/input.txt").expect("Something went wrong reading the file");

    let instructions: Vec<Instruction> = input.lines().map(Instruction::from_string).collect();

    let mut m = Machine {
        pointer: 0,
        accumulator: 0,
        instructions: instructions.clone(),
    };

    while m.step() == 0 {}

    println!("{:?}", m.accumulator)
}

fn part2() {
    let input =
        std::fs::read_to_string("day8/input.txt").expect("Something went wrong reading the file");

    let instructions: Vec<Instruction> = input.lines().map(Instruction::from_string).collect();

    for i in 0..instructions.len() {
        let mut m_instructions = instructions.clone();

        match m_instructions[i].command {
            Command::JMP => m_instructions[i].command = Command::NOP,
            Command::NOP => m_instructions[i].command = Command::JMP,
            _ => continue,
        }

        let mut m = Machine {
            pointer: 0,
            accumulator: 0,
            instructions: m_instructions,
        };

        let exit_code = loop {
            let step_code = m.step();
            if step_code > 0 {
                break step_code - 1;
            }
        };

        match exit_code {
            0 => {
                println!("{:?}", m.accumulator);
                break;
            }
            1 => continue,
            _ => break,
        }
    }
}
pub fn run() {
    part1();
    part2();
}
