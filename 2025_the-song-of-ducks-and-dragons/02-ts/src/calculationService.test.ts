import {describe, expect, test} from 'vitest'
import {add, divide, multiply, part1, part2, part3} from './calculationService'

describe('Calculations', () => {
    test('add', () => {
        expect(add([1,1], [2,2])).toStrictEqual([3,3])
        expect(add([2,5], [3,7])).toStrictEqual([5,12])
        expect(add([-2,5], [10,-1])).toStrictEqual([8,4])
        expect(add([-1,-2], [-3,-4])).toStrictEqual([-4,-6])
    })

    test('multiply', () => {
        expect(multiply([1,1], [2,2])).toStrictEqual([0,4])
        expect(multiply([2,5], [3,7])).toStrictEqual([-29,29])
        expect(multiply([-2,5], [10,-1])).toStrictEqual([-15,52])
        expect(multiply([-1,-2], [-3,-4])).toStrictEqual([-5,10])
    })

    test('divide', () => {
        expect(divide([10,12], [2,2])).toStrictEqual([5,6])
        expect(divide([11,12], [3,5])).toStrictEqual([3,2])
        expect(divide([-10,-12], [2,2])).toStrictEqual([-5,-6])
        expect(divide([-11,-12], [3,5])).toStrictEqual([-3,-2])
    })
})


test('Test input part 1', () => {
  const input = [
    'A=[25,9]',
  ]
  expect(part1(input)).toStrictEqual([357,862])
})

test('Test input part 2', () => {
  const input = [
    'A=[35300,-64910]',
  ]
  expect(part2(input)).toBe(4076)
})

test('Test input part 3', () => {
  const input = [
    'A=[35300,-64910]',
  ]
  expect(part3(input)).toBe(406954)
})
