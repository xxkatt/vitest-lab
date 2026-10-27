const KEY = 'my-app-'

function save(key: string, value: string) {
  localStorage.setItem(KEY + key, value)
}

function get(key: string) {
  return localStorage.getItem(KEY + key) as string
}

export default { save, get }
