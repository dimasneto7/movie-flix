import axios from 'axios'

// Base da URL: http://api.themoviedb.org/3/
// url da api: /movie/now_playing?api_key=a2e93a3e4491ce6a2bf76a53c7ffd0dc

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

export default api
