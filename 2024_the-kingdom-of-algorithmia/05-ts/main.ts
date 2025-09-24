import { readFileSync } from 'fs'
import {part1, part2, part3} from "./src/clapService";
import pkg from "./package.json";

const readFileLines = (filename: string): string[] =>
    readFileSync(filename).toString('utf-8').trimEnd().split('\n').map((line: string) => line.trimEnd())

const logPart = <T>(label: string, func: (value: string[]) => T, fileName: string, provenResult?: T) => {
    console.log(`\n########### ${label} ###########`)
    const inputLines = readFileLines(`./src/data/${fileName}`);
    console.time('Duration');
    const result = func(inputLines);
    console.timeEnd('Duration');
    console.log(`Result: ${result}`)
    const status = provenResult ? (result !== provenResult ? 'Broken' : 'Solved') : 'Open'
    console.log('Status:', status)
}

console.log(pkg.description)
logPart('Part 1', part1, 'input_part1.txt', 3322)
logPart('Part 2', part2, 'input_part2.txt', 14391355841685)
logPart('Part 3', part3, 'input_part3.txt')
