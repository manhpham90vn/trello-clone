import axios from 'axios'
import { BASE_URL } from '~/utils/Constants'

export const fetchBoardDetailsAPI = async (boardID) => {
  const request = await axios.get(`${BASE_URL}/boards/${boardID}`)
  return request.data
}

export const updateBoardDetailsAPI = async (boardID, updateData) => {
  const request = await axios.put(`${BASE_URL}/boards/${boardID}`, updateData)
  return request.data
}

export const moveCardInDifferentColumnAPI = async (updateData) => {
  const request = await axios.put(
    `${BASE_URL}/boards/supports/movingCard`,
    updateData
  )
  return request.data
}

export const createNewColumnAPI = async (column) => {
  const request = await axios.post(`${BASE_URL}/columns`, column)
  return request.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const request = await axios.put(`${BASE_URL}/columns/${columnId}`, updateData)
  return request.data
}

export const createNewCardAPI = async (card) => {
  const request = await axios.post(`${BASE_URL}/cards`, card)
  return request.data
}
