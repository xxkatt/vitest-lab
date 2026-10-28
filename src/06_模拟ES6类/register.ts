import {Mailer} from './mailer'

export const register = async (email: string) => {
  // 简化的注册流程：这里只演示发送欢迎邮件这一步
  // Mailer 是依赖的类；测试 register 时，可以替换它来控制邮件发送行为
  const mailer = new Mailer('/api/send-email')
  await mailer.send(email, '欢迎注册')
  return '注册成功'
}
