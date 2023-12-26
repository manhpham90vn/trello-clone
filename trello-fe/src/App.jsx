import { Box, Container } from '@mui/material'
import SelectMode from './SelectMode'

const App = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box
        sx={{
          backgroundColor: 'primary.light',
          width: '100%',
          height: (theme) => theme.trelloApp.appBarHeight,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <SelectMode />
      </Box>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          width: '100%',
          height: (theme) => theme.trelloApp.boardBarHeight,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        Board Bar
      </Box>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          width: '100%',
          height: (theme) =>
            `calc(100vh - ${theme.trelloApp.appBarHeight} - ${theme.trelloApp.boardBarHeight})`,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        Board Content
      </Box>
    </Container>
  )
}

export default App