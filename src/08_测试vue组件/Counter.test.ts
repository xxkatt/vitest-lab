import {afterEach, describe, expect, test} from 'vitest'
import {enableAutoUnmount, mount} from '@vue/test-utils'
import Counter from './Counter.vue'

// enableAutoUnmount：把自动卸载注册到 afterEach，每个测试结束后卸载 mount 创建的组件
// 卸载会清理组件实例和相关监听，避免组件在后续测试中继续运行
enableAutoUnmount(afterEach)

describe('测试 Vue 组件', () => {
  test('渲染传入的标题', () => {
    // mount：挂载组件并返回 wrapper，通过它查找元素、触发交互和读取事件
    // props：模拟父组件传入属性，title 对应组件声明的标题
    const wrapper = mount(Counter, {props: {title: '计数器'}})

    // get：按 CSS 选择器查找元素，不存在时直接报错，适合查找必须渲染的内容
    // text：读取元素的文本；toBe：断言文本与预期完全相同
    expect(wrapper.get('h2').text()).toBe('计数器')
  })

  test('点击按钮后更新计数', async () => {
    const wrapper = mount(Counter, {props: {title: '计数器'}})
    expect(wrapper.get('p').text()).toBe('当前计数：0')

    // trigger：在选中的元素上触发事件，'click' 表示点击
    // Vue 会异步更新 DOM，await trigger 等待本轮更新后再读取页面内容
    await wrapper.get('button').trigger('click')

    expect(wrapper.get('p').text()).toBe('当前计数：1')
  })

  test('点击按钮后发出携带计数的事件', async () => {
    const wrapper = mount(Counter, {props: {title: '计数器'}})

    await wrapper.get('button').trigger('click')

    // emitted：读取组件发出的指定事件，返回每次调用的参数数组
    // [[1]] 表示 change 只触发了一次，这次调用只有一个参数，值为 1
    // toEqual：按数组内容比较，验证事件次数和参数都符合预期
    expect(wrapper.emitted('change')).toEqual([[1]])
  })
})
