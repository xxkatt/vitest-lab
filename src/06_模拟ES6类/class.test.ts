import {beforeEach, describe, expect, test, vi} from 'vitest'
import {User} from './user'

// vi.mock：替换指定模块的导出；这里的 User 对应 user.ts 中的具名导出
// 这个调用会被提升到 import 之前，所以导入的 User 已经是模拟类
vi.mock('./user', () => {
  return {
    // vi.fn(class {...})：用自定义类模拟构造函数，并记录 new 的调用情况
    // 传入 class 可以正常使用 new，不要用不能作为构造函数的箭头函数代替
    User: vi.fn(class {
      constructor(public name: string) {}

      // 每次 new 都创建独立的模拟方法，便于单独设置返回值和检查调用
      getName = vi.fn(() => '模拟用户')

      // 静态方法也可以使用 vi.fn 模拟，直接通过类调用
      // @ts-ignore
      static getRole = vi.fn(() => '管理员')
    }),
  }
})

describe('模拟 ES6 类', () => {
  beforeEach(() => {
    // clearAllMocks：清空调用记录，避免前一个测试的 new 和方法调用影响断言
    // 它会保留模拟实现，不会恢复为 user.ts 中的真实类
    vi.clearAllMocks()
  })

  test('模拟构造函数并验证参数', () => {
    const user = new User('张三')

    // toHaveBeenCalledTimes：断言模拟构造函数被调用 1 次
    expect(User).toHaveBeenCalledTimes(1)
    // toHaveBeenCalledWith：断言创建实例时传入了指定参数
    expect(User).toHaveBeenCalledWith('张三')
    // toBe：断言模拟类的构造函数已将参数保存为实例属性
    expect(user.name).toBe('张三')
  })

  test('修改实例方法的模拟返回值', () => {
    const user = new User('张三')

    // vi.mocked：提供模拟函数的 TypeScript 类型提示，本身不会创建模拟
    // getName 已在上面的模块工厂中使用 vi.fn 模拟
    // mockReturnValue：将这个实例的 getName 返回值固定为“李四”
    vi.mocked(user.getName).mockReturnValue('李四')

    expect(user.getName()).toBe('李四')
    expect(user.getName).toHaveBeenCalledTimes(1)
  })

  test('模拟静态方法', () => {
    // 无需 new User，直接调用模拟类上的静态方法
    expect(User.getRole()).toBe('管理员')
    expect(User.getRole).toHaveBeenCalledTimes(1)
  })
})
