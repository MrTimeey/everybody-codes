export const part1 = (inputLines: string[]): number => {
    const inputData = parse(inputLines);
    return  inputData.words
        .map(w => count(inputData.sentence[0], w))
        .reduce(sum)
}

const count = (str: string, word: string): number => (str.match(new RegExp(`${word}`, "gi")) || []).length
const sum = (a: number, b: number) => a + b

export const part2 = (inputLines: string[]): number => {
    const inputData = parse(inputLines);
    const words = [...inputData.words, ...inputData.words.map(w => w.split('').reverse().join(''))]

    return inputData.sentence.map(sentence => {
        let runes = 0;
        for (const part of sentence.split(' ')) {
            const covered = new Set<number>
            for (const pattern of words) {
                for (let i = 0; i + pattern.length <= part.length; i++) {
                    if (part.slice(i, i + pattern.length) === pattern) {
                        for (let j = 0; j < pattern.length; j++) {
                            covered.add(i + j);
                        }
                    }
                }
            }
            runes += covered.size
        }
        return runes;
    })
        .reduce(sum)
}

export const part3 = (inputLines: string[]): number => {
    const inputData = parse(inputLines);
    const words = [...inputData.words, ...inputData.words.map(w => w.split('').reverse().join(''))]
    const grid: string[][] = inputData.sentence.map(s => s.split(''))
    
    let result = 0
    for (let row = 0; row < grid.length; row++) {
        result += countCovered(grid[row].join(''), words)

    }

    
    
    return grid.map(sentence => countCovered(sentence, words))
        .reduce(sum)
}

const countCovered = (sentence: string, words: string[]): number => {
    let runes = 0;
    const covered = new Set<number>
    for (const pattern of words) {
        const patternLength = pattern.length

        const extendedSentence = sentence.repeat(2);

        for (let i = 0; i < sentence.length + pattern.length; i++) {
            if (extendedSentence.slice(i, i + patternLength) === pattern) {
                for (let j = 0; j < patternLength; j++) {
                    covered.add((i + j) % sentence.length);
                }
            }
        }
    }
    runes += covered.size
    return covered;
}

const parse = (inputLines: string[]): inputData => {
    const wordsLine = inputLines[0]
    return {
        words: wordsLine.replace('WORDS:', '').split(','),
        sentence: inputLines.slice(2)
    }
}

type inputData = {
    words: string[],
    sentence: string[],
}