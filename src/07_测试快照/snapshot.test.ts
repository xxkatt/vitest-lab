import {describe, expect, test} from 'vitest'

describe('测试快照', () => {
  test('将对象保存为外部快照', () => {
    const user = {name: '张三', role: '管理员'}

    // toMatchSnapshot：首次运行时，将结果保存到 __snapshots__/snapshot.test.ts.snap
    // 后续运行会与已保存的快照比较；字段或值发生变化时，测试会失败
    // 首次生成后也要检查快照内容，确认保存的结果符合预期
    // 如果变化符合预期，运行 pnpm test --run src/07_测试快照 -u 更新快照，并检查差异
    expect(user).toMatchSnapshot()
  })

  test('将文本保存为内联快照', () => {
    const greeting = '你好，张三！'

    // toMatchInlineSnapshot：把快照写在当前测试文件的参数中，无需单独的 .snap 文件
    // 首次调用可以不传参数，Vitest 会自动填入结果；后续运行时比较文本是否一致
    expect(greeting).toMatchInlineSnapshot(`"你好，张三！"`)
  })

  test('用属性匹配器处理动态时间', () => {
    const user = {name: '张三', createdAt: new Date()}

    // toMatchSnapshot 的第一个参数可以传入属性匹配器，只替换指定字段的比较方式
    // expect.any(Date)：只要求 createdAt 是 Date 实例，快照中会保存 Any<Date>
    // 每次运行的时间可以不同，其余字段（例如 name）仍然需要与快照完全一致
    expect(user).toMatchSnapshot({createdAt: expect.any(Date)})
  })
})
