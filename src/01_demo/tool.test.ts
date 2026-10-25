import {test, expect, describe} from "vitest";
import {div, mul, sub, sum} from "./tool";

describe('测试加减乘除', () => {
  test('测试加法', () => {
    expect(sum(1, 2)).toBe(3)
  })

  test('测试减法', () => {
    expect(sub(1, 2)).toBe(-1)
  })

  test('测试乘法', () => {
    expect(mul(1, 2)).toBe(2)
  })

  test('测试除法', () => {
    expect(div(1, 2)).toBe(0.5)
  })
})
