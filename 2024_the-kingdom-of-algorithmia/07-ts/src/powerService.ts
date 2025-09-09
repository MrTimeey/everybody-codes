export const part1 = (inputLines: string[]): string => {
    const input = parse(inputLines);
    const startingValue = 10
    const gameLength = 10
    return Object.entries(input)
        .map(([key, val]) => {
            const values = buildSequence(startingValue, expandSequence(val, gameLength))
            return {key: key, value: values.reduce((acc, cur) => acc + cur)}
        })
        .sort(({value: v1}, {value: v2}) => v2 - v1)
        .map(({key}) => key)
        .join('');

}

const expandSequence = (sequence: string[], length: number): string[] => {
    const result = []
    for (let i = 0; i < length; i++) {
        result.push(sequence[i % sequence.length]);
    }
    return result;
}

const buildSequence = (start: number, sequence: string[]): number[] => {
    return sequence
        .map(convert)
        .reduce((acc, delta, i) => {
            const prev = i === 0 ? start : acc[i - 1]
            acc.push(prev + delta)
            return acc
        }, [] as number[])
}

const convert = (symbol: string): number => {
    switch (symbol) {
        case '+':
            return 1
        case '-':
            return -1
        case '=':
        default:
            return 0
    }
}

export const part2 = (inputLines: string[]): string => {
    return ''
}

export const part3 = (inputLines: string[]): string => {
    return ''
}

const parse = (inputLines: string[]): Record<string, string[]> => inputLines
    .map(row => row.split(':'))
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val.split(',')}), {});