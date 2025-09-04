import { expect, test } from 'vitest'
import {calcIdx, part1, part2, part3} from './clapService'

test('Test input part 1', () => {
  const input = [
    '2 3 4 5',
    '3 4 5 2',
    '4 5 2 3',
    '5 2 3 4',
  ]
  expect(part1(input)).toBe(2323)
})

test('Test calc Idx', () => {
    expect(calcIdx(3, 1)).toBe(0)
    expect(calcIdx(3, 2)).toBe(1)
    expect(calcIdx(3, 3)).toBe(2)
    expect(calcIdx(3, 4)).toBe(3)
    expect(calcIdx(3, 5)).toBe(2)
    expect(calcIdx(3, 6)).toBe(1)
    expect(calcIdx(3, 7)).toBe(0)
    expect(calcIdx(3, 8)).toBe(1)
    expect(calcIdx(3, 9)).toBe(2)
})

test('Test input part 2', () => {
  const input = [
    '2 3 4 5',
    '6 7 8 9',
  ]
  expect(part2(input)).toBe(50877075)
})

test('Test input part 3', () => {
  const input = [
    '2 3 4 5',
    '6 7 8 9',
  ]
  expect(part3(input)).toBe(6584n)
})
