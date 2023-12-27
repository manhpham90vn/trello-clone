import { experimental_extendTheme as extendTheme } from '@mui/material'

const theme = extendTheme({
  colorSchemes: {
    light: {
      text: {
        primary: '#fff'
      }
    },
    dark: {
      text: {
        primary: '#000'
      }
    }
  },
  trelloApp: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  }
})

export default theme