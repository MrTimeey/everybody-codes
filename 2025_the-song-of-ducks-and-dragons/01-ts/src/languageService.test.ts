import { expect, test } from 'vitest'
import {part1, part2, part3} from './languageService'

test('Test input part 1', () => {
  const input = [
    'Vyrdax,Drakzyph,Fyrryn,Elarzris',
    '',
    'R3,L2,R3,L1',
  ]
  expect(part1(input)).toBe('Fyrryn')
})

test('Test input part 2', () => {
  const input = [
    'Vyrdax,Drakzyph,Fyrryn,Elarzris',
    '',
    'R3,L2,R3,L1',
  ]
  expect(part2(input)).toBe('Elarzris')
})

test('Test input part 3', () => {
  const input = [
    'Vyrdax,Drakzyph,Fyrryn,Elarzris',
    '',
    'R3,L2,R3,L3',
  ]
  expect(part3(input)).toBe('Drakzyph')
})
