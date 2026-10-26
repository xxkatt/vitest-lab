import {expect, test, vi} from 'vitest'
import {userApi} from "./api/user";
import {div, mul, sub, sum} from "./utils/tools";

// 模拟axios模块
vi.mock('axios', () => {
  return {
    default: {
      get: () => Promise.resolve({data: ['sakura', 'jake']})
    }
  }
})

test('测试获取用户数据', async () => {
  await expect(userApi.getAll()).resolves.toEqual(['sakura', 'jake'])
})

vi.mock('./utils/tools', async () => {
  const original = await vi.importActual<typeof import('./utils/tools')>('./utils/tools')
  return {
    ...original,
    sum: vi.fn(() => 10),
    sub: vi.fn(() => 10),
  }
})

test('测试工具函数', () => {
  expect(sum(1, 2)).toBe(10)
  expect(sub(1, 2)).toBe(10)
  expect(mul(1, 2)).toBe(2)
  expect(div(1, 2)).toBe(0.5)
})
