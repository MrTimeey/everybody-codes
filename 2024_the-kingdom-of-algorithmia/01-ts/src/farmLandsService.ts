export const part1 = (inputLines: string[]): number => {
    const input = inputLines.join('');
    return [...input].map(c => mapMonsters(c)).reduce(sum, 0)
}

export const part2 = (inputLines: string[]): number => {
    const input = inputLines.join('');
    return splitWithLength(input, 2).map((c: string) => mapMonsters(c)).reduce(sum, 0)
}

export const part3 = (inputLines: string[]): number => {
    const input = inputLines.join('');
    return splitWithLength(input, 3).map((c: string) => mapMonsters(c)).reduce(sum, 0)
}

const potionMapping: Record<string, number> = {
    A: 0,
    B: 1,
    C: 3,
    D: 5,
};

const mapMonsters = (group: string): number => {
    const extra: number = group.length - countEmpty(group) - 1
    return [...group.replaceAll('x', '')]
        .map(m => potionMapping[m] + extra)
        .reduce(sum, 0);
}

const countEmpty = (str: string): number => (str.match(/x/g) ?? []).length;

const splitWithLength = (str: string, length: number = 1): string[] => str.match(new RegExp(`.{1,${length}}`, "g")) ?? [];

const sum = (acc: number, cur: number): number => acc + cur