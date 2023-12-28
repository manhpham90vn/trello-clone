import { Box } from '@mui/material'

const BoardContent = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) =>
          `calc(100vh - ${theme.trelloApp.appBarHeight} - ${theme.trelloApp.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
      }}
    >
      Board Content
    </Box>
  )
}

export default BoardContent
