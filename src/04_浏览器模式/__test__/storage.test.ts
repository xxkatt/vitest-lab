import storage from "../ts/storage";
import {describe, expect, it} from "vitest";

describe('测试storage存储', () => {
  it('测试存储', () => {
    storage.save('value', 'Hello')
    expect(localStorage.getItem('my-app-value')).toBe('Hello')
  })

  it('测试获取', () => {
    localStorage.setItem('my-app-value', 'World')
    expect(storage.get('value')).toBe('World')
  })
})
