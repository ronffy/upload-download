import axios from 'axios'
import { apis } from '../constants/apis'

export const fetchDownloadList = async () => {
  const response = await axios.get(apis.downloadList)
  return response.data
}
