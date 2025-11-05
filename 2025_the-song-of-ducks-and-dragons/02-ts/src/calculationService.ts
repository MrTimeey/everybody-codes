import {print} from "./printUtils";

export const part1 = (inputLines: string[]): Fraction => {
    const [,a,b] = inputLines[0].match(/\[(-?\d+),(-?\d+)]/)!
    let result: Fraction = [0,0]
    for (let i = 1; i <= 3; i++) {
        result = multiply(result, result);
        result = divide(result, [10,10]);
        result = add(result, [+a, +b])
    }
    return result
}

function getResult(grid: Fraction[][]) {
    let count = 0
    const result = []
    for (const row of grid) {
        let line = "";
        for (const cell of row) {
            if (shouldBeEngraved(cell)) {
                count++
                line += "#";
            } else {
                line += ".";
            }
        }
        result.push(line)
    }
    print(result)
    return count;
}

export const part2 = (inputLines: string[]): number => {
    const [,a,b] = inputLines[0].match(/\[(-?\d+),(-?\d+)]/)!
    const startingPoint: Fraction = [+a, +b]
    const grid = generateGrid(startingPoint, 101)
    return getResult(grid);
}

const shouldBeEngraved = (cell: Fraction): boolean => {
    const maxValue = 1000000
    let result: Fraction = [0,0]
    for (let i = 0; i < 100; i++) {
        result = multiply(result, result)
        result = divide(result, [100000,100000])
        result = add(result, cell)
        if (result[0] > maxValue || result[0] < -maxValue || result[1] > maxValue || result[1] < -maxValue ) {
            return false
        }
    }
    return true
}

const generateGrid = (startingPoint: Fraction, gridSize: number): Fraction[][] => {
    const grid: Fraction[][] = []
    const delta = 1000 / (gridSize - 1)
    for (let i = 0; i < gridSize; i++) {
        const row: Fraction[] = [];
        const y = startingPoint[1] + i * delta;
        for (let j = 0; j < gridSize; j++) {
            const x = startingPoint[0] + j * delta;
            row.push([x, y])
        }
        grid.push(row)
    }
    return grid;
}

export const part3 = (inputLines: string[]): number => {
    const [,a,b] = inputLines[0].match(/\[(-?\d+),(-?\d+)]/)!
    const startingPoint: Fraction = [+a, +b]
    const grid = generateGrid(startingPoint, 1001)
    return getResult(grid);
}

export type Fraction = [number, number]

export const add = (a: Fraction, b: Fraction): Fraction => [a[0] + b[0], a[1] + b[1]]
export const multiply = (a: Fraction, b: Fraction): Fraction => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]
export const divide = (a: Fraction, b: Fraction, trunc = true): Fraction => [trunc ? Math.trunc(a[0] / b[0]) : a[0] / b[0], trunc ? Math.trunc(a[1] / b[1]) : a[1] / b[1]]
