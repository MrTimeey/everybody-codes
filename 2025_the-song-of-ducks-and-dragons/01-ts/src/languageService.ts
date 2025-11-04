export const part1 = (inputLines: string[]): string => {
    const [names, , directions] = inputLines;
    let nameArray = names.split(',');
    const dirs = directions.replaceAll('R', '').replaceAll('L', '-').split(',').map(Number)
    const idx = dirs.reduce((prev, acc) => {
        acc += prev;
        if (acc < 0) return 0
        if (acc >= nameArray.length) return nameArray.length - 1
        return acc
    }, 0);
    return nameArray[idx]
}

export const part2 = (inputLines: string[]): string => {
    const [names, , directions] = inputLines;
    let nameArray = names.split(',');
    const dirs = directions.replaceAll('R', '').replaceAll('L', '-').split(',').map(Number)
    let pos = 0
    for (const dir of dirs) {
        pos = nextPos(pos, dir, nameArray.length)
    }
    return nameArray[pos]
}

export const part3 = (inputLines: string[]): string => {
    const [names, , directions] = inputLines;
    let nameArray = names.split(',');
    const dirs = directions.replaceAll('R', '').replaceAll('L', '-').split(',').map(Number)
    for (const dir of dirs) {
        const next = nextPos(0, dir, nameArray.length) as number
        [nameArray[0], nameArray[next]] = [nameArray[next], nameArray[0]]
    }
    return nameArray[0]
}

const nextPos = (pos: number, dir: number, maxLength: number): number => {
    return ((pos + dir) % maxLength + maxLength) % maxLength;
}
