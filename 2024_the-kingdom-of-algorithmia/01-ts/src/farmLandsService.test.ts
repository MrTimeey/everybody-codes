import { expect, test } from 'vitest'
import {part1, part2, part3} from './farmLandsService'

test('Test input part 1', () => {
  const input = [
    'ABBAC',
  ]
  expect(part1(input)).toBe(5)
})

test('Test input part 2', () => {
  const input = [
    'AxBCDDCAxD',
  ]
  expect(part2(input)).toBe(28)
})

test('Test input part 3', () => {
  const input = [
    'xBxAAABCDxCC',
  ]
  expect(part3(input)).toBe(30)
})
