import {expect, test, vi} from "vitest";

test("基本演示", () => {
  const mockFn = vi.fn();
  mockFn.mockReturnValue(1)
  expect(mockFn()).toBe(1)
})

test("内置实现", () => {
  const mockFn = vi.fn(x => x + 100);
  expect(mockFn(1)).toBe(101)
})

const arr = [1, 2, 3]
const forEach = (arr: any[], callback: (item: any) => void) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i])
  }
}

test("测试forEach", () => {
  const mockCallback = vi.fn(x => x + 1)
  forEach(arr, mockCallback)
  expect(mockCallback).toHaveBeenCalledTimes(3)
})
