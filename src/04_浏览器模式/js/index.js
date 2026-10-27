import storage from './storage.js';
const input = document.getElementById('input');
const saveBtn = document.getElementById('saveBtn');
const getBtn = document.getElementById('getBtn');
const value = document.getElementById('value');
saveBtn.addEventListener('click', () => {
    storage.save('value', input.value);
    input.value = '';
    window.alert('存储成功!');
});
getBtn.addEventListener('click', () => {
    value.innerText = storage.get('value');
    window.alert('获取成功!');
});
