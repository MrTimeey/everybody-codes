import { expect, test } from 'vitest'
import {part1, part2, part3} from './treeService'

test('Test input part 1', () => {
  const input = [
    'RR:A,B,C',
    'A:D,E',
    'B:F,@',
    'C:G,H',
    'D:@',
    'E:@',
    'F:@',
    'G:@',
    'H:@',
  ]
  expect(part1(input)).toBe('RRB@')
})

test('Test input part 2', () => {
  const input = [
    '',
  ]
  expect(part2(input)).toBe(0)
})

test('Test input part 3', () => {
  const input = [
    '',
  ]
  expect(part3(input)).toBe(0)
})
