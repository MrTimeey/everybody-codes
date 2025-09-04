export const part1 = (inputLines: string[]): string => {
    const mapping = parse(inputLines);
    return findUniquePath(mapping, longNames)
}

const findUniquePath = (mapping: Mapping, nameConversion: (paths: Set<string>) => string[], start = 'RR', target = '@'): string => {
    const paths = new Set<string>()
    const queue = [start]
    while (queue.length > 0) {
        const current = queue.shift();

        if (!current) continue;
        if (current?.endsWith(target)) paths.add(current);
        const idx = current.lastIndexOf('|');
        const currentMappingChar = current.substring(idx > 0 ? idx + 1 : 0);
        if (!currentMappingChar) continue
        const next = mapping[currentMappingChar];
        if (!next) continue
        next.filter(n => !current.includes(n)).forEach(n => queue.push(`${current}|${n}`))
    }
    const arr = nameConversion(paths);
    const uniquePathLengths = arr.filter(p => arr.filter(s => s.length === p.length).length === 1);
    return uniquePathLengths[0]
}

export const part2 = (inputLines: string[]): string => {
    return findUniquePath(parse(inputLines), shortNames)
}

export const part3 = (inputLines: string[]): string => {
    return findUniquePath(parse(inputLines), shortNames)
}

const longNames = (paths: Set<string>): string[] => [...paths].map(p => p.replaceAll('|', ''));
const shortNames = (paths: Set<string>): string[] => [...paths].map(p => p.split('|').map(s => s[0]).join(''));


type Mapping = Record<string, string[]>

const parse = (inputLines: string[]): Mapping => {
    return inputLines
        .map(line => line.split(':'))
        .reduce((acc,  [key, val]) => ({...acc, [key]: val.split(',')}), {})
}
