import storage from './storage.js'

const input = document.getElementById('input') as HTMLInputElement
const saveBtn = document.getElementById('saveBtn') as HTMLButtonElement
const getBtn = document.getElementById('getBtn') as HTMLButtonElement
const value = document.getElementById('value') as HTMLSpanElement

saveBtn.addEventListener('click', () => {
  storage.save('value', input.value)
  input.value = ''
  window.alert('存储成功!')
})

getBtn.addEventListener('click', () => {
  value.innerText = storage.get('value')
  window.alert('获取成功!')
})
