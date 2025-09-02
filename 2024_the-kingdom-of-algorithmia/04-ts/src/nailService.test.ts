import { expect, test } from 'vitest'
import {part1, part2, part3} from './nailService'

test('Test input part 1', () => {
  const input = [
    '3',
    '4',
    '7',
    '8',
  ]
  expect(part1(input)).toBe(10)
})

test('Test input part 2', () => {
    const input = [
        '3',
        '4',
        '7',
        '8',
    ]
  expect(part2(input)).toBe(0)
})

test('Test input part 3', () => {
  const input = [
    '2',
    '4',
    '5',
    '6',
    '8',
  ]
  expect(part3(input)).toBe(8)
})
