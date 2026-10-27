import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest'

describe('模拟计时器', () => {
  // beforeEach：每个测试开始前执行
  beforeEach(() => {
    // useFakeTimers：启用模拟计时器，之后可以手动推进时间
    vi.useFakeTimers()
  })

  // afterEach：每个测试结束后执行
  afterEach(() => {
    // clearAllTimers：清除尚未执行的定时任务
    vi.clearAllTimers()
    // useRealTimers：恢复真实计时器，避免影响其他测试
    vi.useRealTimers()
  })

  test('推进指定时间', () => {
    // vi.fn：创建模拟函数，用来记录回调的调用情况
    const callback = vi.fn()
    // setTimeout：延迟 1000 毫秒执行一次回调
    setTimeout(callback, 1000)

    // not.toHaveBeenCalled：断言回调还没有被调用
    expect(callback).not.toHaveBeenCalled()

    // advanceTimersByTime：推进指定毫秒数，执行这段时间内到期的任务
    vi.advanceTimersByTime(999)
    expect(callback).not.toHaveBeenCalled()

    // 再推进 1 毫秒，累计 1000 毫秒，触发回调
    vi.advanceTimersByTime(1)
    // toHaveBeenCalledTimes：断言回调被调用的次数
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('执行所有定时任务', () => {
    const callback = vi.fn()
    setTimeout(callback, 1000)
    setTimeout(callback, 3000)

    // runAllTimers：执行所有定时任务，包括回调中新建的任务
    // 不要用于无限循环的任务，例如未清除的 setInterval
    vi.runAllTimers()

    expect(callback).toHaveBeenCalledTimes(2)
  })

  test('重复执行与停止计时器', () => {
    const callback = vi.fn()
    // setInterval：每隔 1000 毫秒执行一次回调
    const timer = setInterval(callback, 1000)

    // 推进 3000 毫秒，回调会执行 3 次
    vi.advanceTimersByTime(3000)
    expect(callback).toHaveBeenCalledTimes(3)

    // clearInterval：停止指定的重复计时器
    clearInterval(timer)
    // 停止后继续推进时间，调用次数不会增加
    vi.advanceTimersByTime(2000)
    expect(callback).toHaveBeenCalledTimes(3)
  })
})
