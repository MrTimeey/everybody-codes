export const part1 = (inputLines: string[]): number => {
    const numbers = inputLines.map(Number)
    return calc(numbers, Math.min(...numbers))
}

export const part2 = (inputLines: string[]): number => {
    return part1(inputLines)
}

export const part3 = (inputLines: string[]): number => {
    const numbers = inputLines.map(Number)
    const sortedNumbers = [...numbers].sort((a, b) => a - b).splice(0, numbers.length)

    let minNumber = Number.MAX_SAFE_INTEGER
    for (const target of sortedNumbers) {
        let temp = calc(numbers, target);
        minNumber = temp < minNumber ? temp : minNumber;
    }

    return minNumber
}

const calc = (numbers: number[], target: number) => numbers.reduce((acc, cur) => acc + Math.abs(cur - target), 0)
