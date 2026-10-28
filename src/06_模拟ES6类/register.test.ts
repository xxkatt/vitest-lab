import {expect, test, vi} from 'vitest'
import {Mailer} from './mailer'
import {register} from './register'

// 替换 register 依赖的 Mailer 类，register 自身仍执行真实代码
// vi.mock 会被提升，因此 register 内部 new Mailer 时拿到的也是模拟类
vi.mock('./mailer', () => {
  return {
    Mailer: vi.fn(class {
      // mockResolvedValue：返回成功兑现的 Promise，模拟异步发送成功
      // undefined 表示发送成功后没有返回数据；这里不会执行真实的 fetch
      send = vi.fn().mockResolvedValue(undefined)
    }),
  }
})

test('注册时创建邮件客户端，并向用户发送欢迎邮件', async () => {
  // resolves.toBe：等待 register 返回的 Promise 成功，再验证注册结果
  await expect(register('user@example.com')).resolves.toBe('注册成功')

  // 验证业务代码只创建了一个客户端，并传入正确的接口地址
  expect(Mailer).toHaveBeenCalledTimes(1)
  expect(Mailer).toHaveBeenCalledWith('/api/send-email')

  // vi.mocked：提供模拟构造函数的类型提示
  // mock.instances：记录通过 new 创建的实例，[0] 就是 register 内部创建的客户端
  const mailer = vi.mocked(Mailer).mock.instances[0]
  // 验证业务代码向正确的收件人发送了正确的内容，而且只发送一次
  expect(mailer.send).toHaveBeenCalledWith('user@example.com', '欢迎注册')
  expect(mailer.send).toHaveBeenCalledTimes(1)
})
