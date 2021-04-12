import { API, ArticleResponse } from './apiTypes'
import axios from 'axios'

const api: API = {
  search: async query => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/v1/person/search/${query}`)
    return response.data
  },
  fetchProfileCount: async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/v1/person/count`)
    return response.data
  },
  fetchDetail: async id => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/v1/person/detail/${id}`)
    return response.data
  },
  fetchNews: async (fullName, party, searchQuery) => {
    const response = await axios.get<ArticleResponse>(
      `${process.env.REACT_APP_BASE_API_URL}/api/v1/news/media?name=${fullName}&party=${party}&search_query=${searchQuery}&with_text=false`,
    )
    return response.data
  },
  fetchDemagog: async (id, wikiId) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/v1/demagog/`, { osobaId: id, wikiId })
    return response.data
  },
  sendEmail: async (subject: string, text: string) => {
    axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/v1/mail`, { subject, text })
  },
}

export default api
