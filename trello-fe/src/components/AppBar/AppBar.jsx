import { Box } from '@mui/material'
import SelectMode from '~/components/SelectMode/SelectMode'

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