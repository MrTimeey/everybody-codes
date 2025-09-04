export type Coord = { x: number; y: number }

export const printGrid = (grid: string[][]): void => {
    for (let row = 0; row < grid.length; row++) {
        console.log(grid[row].join(' '))
    }
}

export const straight_directions: Record<string, Coord> = {
    right: {x: 1, y: 0},
    left: {x: -1, y: 0},
    up: {x: 0, y: -1},
    down: {x: 0, y: 1},
}

export const vertical_directions: Record<string, Coord> = {
    up_right: {x: 1, y: -1},
    down_right: {x: 1, y: 1},
    up_left: {x: -1, y: -1},
    down_left: {x: -1, y: 1},
}

export const allDirections: Record<string, Coord> = {
    ...straight_directions,
    ...vertical_directions,
}

export const move = (startingPoint: Coord, direction: Coord): Coord => ({x: startingPoint.x + direction.x, y: startingPoint.y + direction.y})

export const toGrid = (inputLines: string[]): string[][] => inputLines.map(l => l.split(' '))

export const gridEquals = (gridA: string[][], gridB: string[][]): boolean => JSON.stringify(gridA) === JSON.stringify(gridB);

export type GetValueConfig = {
    verticalOverflow: boolean,
    horizontalOverflow: boolean
}

export const getValue = (grid: string[][]) => (coord: Coord): string | null => {
    if (coord.y < 0 || coord.y >= grid.length) return null
    if (coord.x < 0 || coord.x >= grid[0].length) return null
    return grid[coord.y][coord.x]
}

export const getValueWithOverflow = (grid: string[][], config: GetValueConfig = {verticalOverflow: false, horizontalOverflow: false}) => (coord: Coord): {value: string | null, coord: Coord} => {
    if ((coord.y < 0 || coord.y >= grid.length) && !config.verticalOverflow) return {value: null, coord}
    if ((coord.x < 0 || coord.x >= grid[0].length) && !config.horizontalOverflow) return {value: null, coord}
    const y = config.verticalOverflow ? mod(coord.y, grid.length) : coord.y;
    const x = config.horizontalOverflow ? mod(coord.x, grid[0].length) : coord.x;
    return {value: grid[y][x], coord: {x,y}}
}

export function mod(idx: number, length: number): number {
    return ((idx % length) + length) % length;
}
