import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trelloApp.boardContentHeight,
        display: 'flex',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        padding: '10px 0'
      }}
    >
      <ListColumns />
    </Box>
  )
}

export default BoardContent
