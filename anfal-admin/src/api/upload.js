import axios from 'axios'
import useAuthStore from '@/store/authStore'

export async function uploadImage(file, folder = 'general') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const token = useAuthStore.getState().token
  const res   = await axios.post('/api/upload', formData, {
    headers: {
      'Content-Type':  'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  })
  return res.data.data // { path, public_url }
}