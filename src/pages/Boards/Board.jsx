import Container from '@mui/material/Container'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI
} from '~/apis'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/components/BoardBar/BoardBar'
import BoardContent from '~/components/BoardContent/BoardContent'
import { generatePlaceHolders } from '~/utils/Utils'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardID = '6597d9b2cb6cba3db7d661e4'
    fetchBoardDetailsAPI(boardID).then((board) => {
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolders(column)]
          column.cardOrderIds = [generatePlaceHolders(column)._id]
        }
      })
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (column) => {
    const result = await createNewColumnAPI({ ...column, boardId: board._id })
    result.cards = [generatePlaceHolders(result)]
    result.cardOrderIds = [generatePlaceHolders(result)._id]
    const newBoard = { ...board }
    newBoard.columns.push(result)
    newBoard.columnOrderIds.push(result._id)
    setBoard(newBoard)
  }

  const createNewCard = async (card) => {
    const result = await createNewCardAPI({ ...card, boardId: board._id })
    const newBoard = { ...board }
    const columnUpdate = newBoard.columns.find(
      (column) => column._id === result.columnId
    )
    if (columnUpdate) {
      columnUpdate.cards.push(result)
      columnUpdate.cardOrderIds.push(result._id)
    }
    setBoard(newBoard)
  }

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsStateIds = dndOrderedColumns.map((c) => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsStateIds
    setBoard(newBoard)
    await updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsStateIds
    })
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh' }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  )
}

export default Board
