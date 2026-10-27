export const createCountdown = () => {
  let remaining = 0

  return {
    // 剩余秒数为 0 时，页面上的“发送验证码”按钮可用
    get remaining() {
      return remaining
    },
    get canSend() {
      return remaining === 0
    },
    // 发送成功后调用，开始 60 秒倒计时
    start() {
      // 倒计时期间重复调用，不重置时间，也不新建计时器
      if (remaining > 0) return

      remaining = 60
      // setInterval：每隔 1000 毫秒，将剩余秒数减 1
      const timer = setInterval(() => {
        remaining--
        // clearInterval：倒计时结束后停止计时，避免减成负数
        if (remaining === 0) clearInterval(timer)
      }, 1000)
    },
  }
}
