import {afterEach, beforeEach, expect, test, vi} from 'vitest'
import {createCountdown} from './countdown'

beforeEach(() => {
  // useFakeTimers：接管计时器，让测试不用真的等待 60 秒
  vi.useFakeTimers()
})

afterEach(() => {
  // clearAllTimers：清除剩余任务，避免测试结束后还在倒计时
  vi.clearAllTimers()
  // useRealTimers：恢复真实计时器，避免影响其他测试
  vi.useRealTimers()
})

test('验证码发送后倒计时 60 秒，结束后才能重发', () => {
  const countdown = createCountdown()
  // toBe：断言实际值等于预期值；初始允许发送
  expect(countdown.canSend).toBe(true)

  // start：模拟验证码发送成功，开始倒计时
  countdown.start()
  expect(countdown.remaining).toBe(60)
  expect(countdown.canSend).toBe(false)

  // advanceTimersByTime：模拟经过指定毫秒数，并执行到期的回调
  vi.advanceTimersByTime(1000)
  expect(countdown.remaining).toBe(59)

  // 倒计时期间重复点击，不应重新开始 60 秒倒计时
  countdown.start()
  expect(countdown.remaining).toBe(59)

  // 累计经过 59999 毫秒，还差 1 毫秒才满 60 秒
  vi.advanceTimersByTime(58999)
  expect(countdown.remaining).toBe(1)
  expect(countdown.canSend).toBe(false)

  vi.advanceTimersByTime(1)
  expect(countdown.remaining).toBe(0)
  expect(countdown.canSend).toBe(true)
  // getTimerCount：获取剩余定时任务数量，验证结束后已停止计时
  expect(vi.getTimerCount()).toBe(0)

  // 再次发送成功后，可以开始新一轮倒计时
  countdown.start()
  expect(countdown.remaining).toBe(60)
  expect(countdown.canSend).toBe(false)
})
