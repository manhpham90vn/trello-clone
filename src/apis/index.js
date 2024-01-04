import axios from 'axios'
import { BASE_URL } from '~/utils/Constants'

export const fetchBoardDetailsAPI = async (boardID) => {
  const request = await axios.get(`${BASE_URL}/boards/${boardID}`)
  return request.data
}
