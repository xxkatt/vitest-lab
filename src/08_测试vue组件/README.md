# 08_测试vue组件

使用 Vue Test Utils 挂载 Vue 组件，在项目现有的 Chromium 浏览器环境中验证组件行为。`@vitejs/plugin-vue` 负责编译 `.vue` 单文件组件。

先看 `Counter.vue`，了解标题、计数和事件，再阅读 `Counter.test.ts`，依次掌握 3 个例子，方法作用已写在调用处：

1. 使用 `mount` 传入 props，通过 `get` 和 `text` 验证标题。
2. 使用 `await trigger('click')` 点击按钮，等待页面更新后验证计数。
3. 使用 `emitted` 验证组件发出的事件次数和参数。

在项目根目录运行本章：

```sh
pnpm test --run src/08_测试vue组件
```
