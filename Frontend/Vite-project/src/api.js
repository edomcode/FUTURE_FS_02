/**
 * api.js — Central axios instance
 * All API calls go through here so the token is always attached automatically.
 */
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
})

// Before every request, read the token from localStorage and attach it
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fitflow_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// If the server returns 401 (token expired / invalid), log the user out
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('fitflow_token')
      localStorage.removeItem('fitflow_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
