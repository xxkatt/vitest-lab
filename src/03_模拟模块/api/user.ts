import axios from "axios";

export const userApi = {
  getAll() {
    return axios.get('/api/user').then(res => res.data)
  }
}
