import axios from 'axios'
import useAuthStore from '@/store/authStore'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
})

// Attach JWT on every request
client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

client.interceptors.response.use(
  (res) => res.data.data,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    const message = err.response?.data?.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

export default client