import { readFileSync } from 'fs'
import {part1, part2, part3} from "./src/farmLandsService";
import pkg from "./package.json";

const readFileLines = (filename: string): string[] =>
    readFileSync(filename).toString('utf-8').trimEnd().split('\n').map((line: string) => line.trimEnd())

const logPart = (label: string, func: (value: string[]) => number, fileName: string, provenResult?: number) => {
    console.log(`\n########### ${label} ###########`)
    const start = Date.now()
    const inputLines = readFileLines(`./src/data/${fileName}`);
    const result = func(inputLines);
    console.log(`${label}: ${result} - Duration: ${Date.now() - start}`)
    const status = provenResult ? (result !== provenResult ? 'Broken' : 'Solved') : 'Open'
    console.log('Status:', status)
}

console.log(pkg.description)
logPart('Part 1', part1, 'input_part1.txt', 1281)
logPart('Part 2', part2, 'input_part2.txt', 5419)
logPart('Part 3', part3, 'input_part3.txt', 27659)