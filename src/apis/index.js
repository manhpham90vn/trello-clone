import axios from 'axios'
import { BASE_URL } from '~/utils/Constants'

export const fetchBoardDetailsAPI = async (boardID) => {
  const request = await axios.get(`${BASE_URL}/boards/${boardID}`)
  return request.data
}

export const createNewColumnAPI = async (column) => {
  const request = await axios.post(`${BASE_URL}/columns`, column)
  return request.data
}

export const createNewCardAPI = async (card) => {
  const request = await axios.post(`${BASE_URL}/cards`, card)
  return request.data
}
