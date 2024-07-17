import axios from 'axios'
import { apis } from '../constants/apis'

export const fetchUploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axios.post(apis.upload, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
