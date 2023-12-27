import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/components/BoardBar/BoardBar'
import BoardContent from '~/components/BoardContent/BoardContent'

const Board = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh' }}
    >
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
