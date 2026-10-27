export const getSearchObj = () => {
  // ?a=1&b=2
  const {search} = window.location

  // a=1&b=2
  const searchStr = search.slice(1)

  // ['a=1','b=2']
  const searchArr = searchStr.split('&')

  const searchObj: Record<string, string> = {}

  searchArr.forEach((item) => {
    const [key, value] = item.split('=')
    searchObj[key] = value
  })

  return searchObj
}

export const fetchData = () => {
  return fetch('http://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(res => res)
}
