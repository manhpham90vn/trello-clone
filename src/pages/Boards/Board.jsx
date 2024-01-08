import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI,
  moveCardInDifferentColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/components/BoardBar/BoardBar'
import BoardContent from '~/components/BoardContent/BoardContent'
import { generatePlaceHolders, mapOrder } from '~/utils/Utils'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardID = '659ba0ae20f948b14752a135'
    fetchBoardDetailsAPI(boardID).then((board) => {
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolders(column)]
          column.cardOrderIds = [generatePlaceHolders(column)._id]
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
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
      if (columnUpdate.cards.some((c) => c.fe_place_holder)) {
        columnUpdate.cards = [result]
        columnUpdate.cards = [result._id]
      } else {
        columnUpdate.cards.push(result)
        columnUpdate.cardOrderIds.push(result._id)
      }
    }
    setBoard(newBoard)
  }

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsStateIds = dndOrderedColumns.map((c) => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsStateIds
    setBoard(newBoard)
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsStateIds
    })
  }

  const moveCardInSameColumn = (
    dndOrderedCardState,
    dndOrderedCardIds,
    columnId
  ) => {
    const newBoard = { ...board }
    const columnUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    )
    if (columnUpdate) {
      columnUpdate.cards = dndOrderedCardState
      columnUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardIds
    })
  }

  const moveCardInDifferentColumn = (
    currentCardId,
    prevColumneId,
    nextColumneId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnsStateIds = dndOrderedColumns.map((c) => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsStateIds
    setBoard(newBoard)

    let prevCardOrderIds =
      dndOrderedColumns.find((c) => c._id === prevColumneId)?.cardOrderIds || []

    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }
    moveCardInDifferentColumnAPI({
      currentCardId,
      prevColumneId,
      prevCardOrderIds,
      nextColumneId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumneId)
        ?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
          gap: 2
        }}
      >
        <CircularProgress />
      </Box>
    )
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
        moveCardInSameColumn={moveCardInSameColumn}
        moveCardInDifferentColumn={moveCardInDifferentColumn}
      />
    </Container>
  )
}

export default Board
