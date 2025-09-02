import { allDirections, Coord, getValue, gridEquals, move, straight_directions, toGrid } from "./gridUtils";

export const part1 = (inputLines: string[]): number => {
    return calculate(inputLines, straight_directions)
}

export const part2 = (inputLines: string[]): number => {
    return calculate(inputLines, straight_directions)
}

export const part3 = (inputLines: string[]): number => {
    return calculate(inputLines, allDirections)
}

const calculate = (inputLines: string[], directions: Record<string, Coord>): number => {
    const startingGrid = toGrid(inputLines)
    let result = count(startingGrid, '#')
    let currentGrid = startingGrid
    while (true) {
        const newGrid = transform(currentGrid, directions)
        if (gridEquals(newGrid, currentGrid)) break
        result += count(newGrid, '#')
        currentGrid = newGrid
    }
    return result
}

const transform = (grid: string[][], directions: Record<string, Coord>): string[][] => {
    let transformedGrid: string[][] = emptyGrid(grid)
    const getGridValue = getValue(grid)
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const char = getGridValue({y,x})
            if (!char || char !== '#') continue
            const sameNeighbours = () => {
                for (const dir of Object.values(directions)) {
                    const neighbour = getGridValue(move({x,y}, dir))
                    if (char !== neighbour) return false
                }
                return true
            }
            if (sameNeighbours()) transformedGrid[y][x] = char
        }
    }
    return transformedGrid
}

const emptyGrid = (grid: string[][]): string[][] => grid.map(row => row.map(() => "."));

const count = (grid: string[][], char: string): number => {
    const plainString = grid.map(r => r.join('')).join('')
    return plainString.match(new RegExp(`${char}`, "g"))?.length ?? 0
}