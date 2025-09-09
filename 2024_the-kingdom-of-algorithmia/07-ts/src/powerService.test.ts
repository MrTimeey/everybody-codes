import { expect, test } from 'vitest'
import {part1, part2, part3} from './powerService'

test('Test input part 1', () => {
  const input = [
    'A:+,-,=,=',
    'B:+,=,-,+',
    'C:=,-,+,+',
    'D:=,=,=,+',
  ]
  expect(part1(input)).toBe('BDCA')
})

test('Test input part 2', () => {
  const input = [
    '',
  ]
  expect(part2(input)).toBe('')
})

test('Test input part 3', () => {
  const input = [
    '',
  ]
  expect(part3(input)).toBe('')
})
