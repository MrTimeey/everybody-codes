import {toGrid} from "./gridUtils";

export const part1 = (inputLines: string[]): number => {
    let grid = toGrid(inputLines);
    for (let i = 1; i <= 10; i++) {
        grid = iterate(grid, i - 1);
    }
    return Number(getFirstLine(grid));
}

export const part2 = (inputLines: string[]): number => {
    let grid = toGrid(inputLines);

    let round = 0;
    let value = null;
    const numbers = new Map<number, number>();
    while (true) {
        grid = iterate(grid, round)
        const gridValue = Number(getFirstLine(grid));
        const newAmount = (numbers.get(gridValue)?? 0) + 1;
        numbers.set(gridValue, newAmount)
        round++
        if (newAmount === 2024) {
            value = gridValue;
            break;
        }
    }
    return value * round
}

export const part3 = (inputLines: string[]): bigint => {
    let grid = toGrid(inputLines);

    let round = 0;
    let maxValue = 0n;
    for (let i = 0; i < 100000; i++) {
        const gridValue = BigInt(getFirstLine(grid));
        if (gridValue > maxValue) maxValue = gridValue;
        grid = iterate(grid, round)
        round++
    }
    return maxValue
}

const iterate = (grid: string[][], i: number): string[][] => {

    const width = grid[0].length;
    const srcCol = i % width;
    const resultGrid = cloneGrid(grid);
    let elem = grid[0][srcCol];
    for (let row = 0; row < grid.length - 1; row++) {
        resultGrid[row][srcCol] = grid[row+1][srcCol];
    }
    resultGrid[grid.length - 1][srcCol] = ' ';

    const targetCol = (srcCol + 1) % width;
    const getCol = (col: number) => resultGrid.map(row => row[col]).filter(e => e !== ' ')
    let column = getCol(targetCol);
    const targetRow = calcIdx(column.length, Number(elem));

    column.splice(targetRow, 0, elem);
    while (resultGrid.length < column.length) {
        resultGrid.push(Array(width).fill(' '));
    }

    for (let row = 0; row < column.length; row++) {
        resultGrid[row][targetCol] = column[row];
    }

    for (let row = column.length; row < resultGrid.length; row++) {
        resultGrid[row][targetCol] = ' ';
    }
    return resultGrid;
}

export const calcIdx = (len: number, n: number): number => {
    const perimeter = 2 * len;
    const p = (n - 1) % perimeter;

    if (p < len) {
        return p;
    } else {
        const i = (2 * len - 1) - p;
        return i + 1;
    }
};

function cloneGrid<T>(grid: T[][]): T[][] {
    return grid.map(row => row.slice());
}

const getFirstLine = (grid: string[][]): string => grid[0].join('')
