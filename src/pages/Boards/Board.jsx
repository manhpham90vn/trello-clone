import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/components/BoardBar/BoardBar'
import BoardContent from '~/components/BoardContent/BoardContent'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardID = '6596687a94600c41bdf1dec8'
    fetchBoardDetailsAPI(boardID).then((board) => {
      setBoard(board)
    })
  }, [])

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh' }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
