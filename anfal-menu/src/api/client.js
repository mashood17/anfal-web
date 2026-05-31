import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Response interceptor — centralised error handling
client.interceptors.response.use(
  (res) => res.data.data,
  (err) => {
    const message = err.response?.data?.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

export default client