import { readFileSync } from 'fs'
import {Fraction, part1, part2, part3} from "./src/calculationService";
import pkg from "./package.json";

const readFileLines = (filename: string): string[] =>
    readFileSync(filename).toString('utf-8').trimEnd().split('\n').map((line: string) => line.trimEnd())

const logPart = <T>(label: string, func: (value: string[]) => T, fileName: string, provenResult?: T) => {
    console.log(`\n########### ${label} ###########`)
    const inputLines = readFileLines(`./src/data/${fileName}`);
    console.time('Duration');
    const result = func(inputLines);
    console.timeEnd('Duration');
    let status = 'Open'
    if (provenResult && Array.isArray(provenResult)) {
        console.log(`Result: [${result}]`)
        const res = result as Fraction
        status = res[0] !== provenResult[0] || res[1] !== provenResult[1] ? 'Broken' : 'Solved'
    } else if (provenResult) {
        console.log(`Result: ${result}`)
        status = result !== provenResult ? 'Broken' : 'Solved'
    } else {
        console.log(`Result: ${result}`)
    }
    console.log('Status:', status)
}

console.log(pkg.description)
logPart('Part 1', part1, 'input_part1.txt', [114316,656150])
logPart('Part 2', part2, 'input_part2.txt', 1345)
logPart('Part 3', part3, 'input_part3.txt', 132967)
