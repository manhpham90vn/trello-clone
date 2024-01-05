import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI
} from '~/apis'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/components/BoardBar/BoardBar'
import BoardContent from '~/components/BoardContent/BoardContent'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardID = '6597bee2e8eeafd194ce29c1'
    fetchBoardDetailsAPI(boardID).then((board) => {
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (column) => {
    const result = await createNewColumnAPI({ ...column, boardId: board._id })
  }

  const createNewCard = async (card) => {
    const result = await createNewCardAPI({ ...card, boardId: board._id })
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
      />
    </Container>
  )
}

export default Board
