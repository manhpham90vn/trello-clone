import { Box } from '@mui/material'
import SelectMode from '../SelectMode/SelectMode'

const AppBar = () => {
  return (
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
  )
}

export default AppBar