const KEY = 'my-app-';
function save(key, value) {
    localStorage.setItem(KEY + key, value);
}
function get(key) {
    return localStorage.getItem(KEY + key);
}
export default { save, get };
