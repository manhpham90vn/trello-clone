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
    appBarHeight: '48px',
    boardBarHeight: '58px'
  }
})

export default theme