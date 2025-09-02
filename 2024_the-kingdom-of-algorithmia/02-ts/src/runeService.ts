import {type Coord, getValueWithOverflow, straight_directions, move} from "./gridUtils"

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

    const getGridValue = getValueWithOverflow(grid, {horizontalOverflow: true, verticalOverflow:false})

    const addMatch = (coord: Coord) => {
        matches.add(`${coord.x},${coord.y}`);
    };

    const checkWord = (searchedWord: string, startingPoint: Coord, direction: Coord) => {
        const coords = [startingPoint]
        let word = getGridValue(startingPoint)?.value??''
        let curr = startingPoint
        for (let i = 1; i < searchedWord.length; i++) {
            const newCoord = move(curr, direction);
            const gridValue = getGridValue(newCoord);
            coords.push(gridValue.coord)
            if (gridValue.value === null) return null
            word += gridValue.value
            if (!searchedWord.includes(word)) return null
            curr = newCoord
        }
        return coords
    }

    const matches = new Set<string>()
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const startingChar = getGridValue({x, y}).value;
            if (startingChar === null) break
            const possibleWords = words.filter(w => w.startsWith(startingChar))
            for (const possibleWord of possibleWords) {
                const wordRight = checkWord(possibleWord, {x,y}, straight_directions.right)
                if (wordRight !== null) {
                    wordRight.forEach(c => addMatch(c))
                }
                const wordDown = checkWord(possibleWord, {x,y}, straight_directions.down)
                if (wordDown !== null) {
                    wordDown.forEach(c => addMatch(c))
                }

            }
        }

    }
    return matches.size
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