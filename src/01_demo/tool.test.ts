import {test, expect, describe, beforeEach, afterEach, beforeAll, afterAll} from "vitest";
import {div, mul, sub, sum} from "./tool";

beforeAll(() => {
  console.log('全局beforeAll')
})

afterAll(() => {
  console.log('全局afterAll')
})

beforeEach(() => {
  console.log('全局beforeEach')
})

afterEach(() => {
  console.log('全局afterEach')
})

describe('测试加减乘除', () => {

  beforeEach(() => {
    console.log('局部beforeEach')
  })

  test('测试加法', () => {
    console.log("🚀 ~  ~ 测试加法 ");
    expect(sum(1, 2)).toBe(3)
  })

  test('测试减法', () => {
    console.log("🚀 ~  ~ 测试减法 ");
    expect(sub(1, 2)).toBe(-1)
  })

  test('测试乘法', () => {
    console.log("🚀 ~  ~ 测试乘法 ");
    expect(mul(1, 2)).toBe(2)
  })

  test('测试除法', () => {
    console.log("🚀 ~  ~ 测试除法 ");
    expect(div(1, 2)).toBe(0.5)
  })
})
