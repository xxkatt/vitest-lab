import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // vue：编译 .vue 单文件组件，让测试可以直接导入组件
  plugins: [vue()],
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      // 至少需要一个实例
      instances: [
        { browser: 'chromium' },
      ],
    },
  }
})
