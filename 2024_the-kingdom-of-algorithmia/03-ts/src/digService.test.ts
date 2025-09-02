import { expect, test } from 'vitest'
import {part1, part2, part3} from './digService'

test('Test input part 1', () => {
  const input = [
    '..........',
    '..###.##..',
    '...####...',
    '..######..',
    '..######..',
    '...####...',
    '..........',
  ]
  expect(part1(input)).toBe(35)
})

test('Test input part 2', () => {
  const input = [
    '',
  ]
  expect(part2(input)).toBe(0)
})

test('Test input part 3', () => {
  const input = [
    '..........',
    '..###.##..',
    '...####...',
    '..######..',
    '..######..',
    '...####...',
    '..........',
  ]
  expect(part3(input)).toBe(29)
})
