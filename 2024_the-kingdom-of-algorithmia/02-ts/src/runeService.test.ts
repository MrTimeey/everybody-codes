import { expect, test } from 'vitest'
import {part1, part2, part3} from './runeService'

test('Test input part 1 - 1', () => {
  const input = [
    'WORDS:THE,OWE,MES,ROD,HER',
    '',
    'AWAKEN THE POWER ADORNED WITH THE FLAMES BRIGHT IRE',
  ]
  expect(part1(input)).toBe(4)
})

test('Test input part 1 - 2', () => {
  const input = [
    'WORDS:THE,OWE,MES,ROD,HER',
    '',
    'THE FLAME SHIELDED THE HEART OF THE KINGS',
  ]
  expect(part1(input)).toBe(3)
})

test('Test input part 1 - 3', () => {
  const input = [
    'WORDS:THE,OWE,MES,ROD,HER',
    '',
    'THERE IS THE END',
  ]
  expect(part1(input)).toBe(3)
})

test('Test input part 2', () => {
  const input = [
    'WORDS:THE,OWE,MES,ROD,HER,QAQ',
    '',
    'AWAKEN THE POWE ADORNED WITH THE FLAMES BRIGHT IRE',
    'THE FLAME SHIELDED THE HEART OF THE KINGS',
    'POWE PO WER P OWE R,',
    'THERE IS THE END',
    'QAQAQ',
  ]
  expect(part2(input)).toBe(42)
})

test('Test input part 2 - 1', () => {
  const input = [
    'WORDS:THE,OWE,MES,ROD,HER,QAQ',
    '',
    'QAQAQ',
  ]
  expect(part2(input)).toBe(5)
})

test('Test input part 3', () => {
  const input = [
    'WORDS:THE,OWE,MES,ROD,RODEO',
    '',
    'HELWORLT',
    'ENIGWDXL',
    'TRODEOAL',
  ]
  expect(part3(input)).toBe(10)
})

test('Test input part 3 - 1', () => {
  const input = [
    'WORDS:THE,OWE,MES,ROD,RODEO',
    '',
    'HELT',
  ]
  expect(part3(input)).toBe(3)
})

test('Test input part 3 - 2', () => {
    const input = [
        'WORDS:OWE',
        '',
        'OR',
        'WD',
        'EO',
    ]
    expect(part3(input)).toBe(3)
})

test('Test input part 3 - 3', () => {
    const input = [
        'WORDS:ROD,RODEO',
        '',
        'TRODEOAL',
    ]
    expect(part3(input)).toBe(5)
})
