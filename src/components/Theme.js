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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '6px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light
              }
            },
            '& fieldset': {
              borderWidth: '1px !important'
            }
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            '& .MuiSelect-iconOutlined': {
              color: theme.palette.primary.main
            }
          }
        }
      }
    }
  },
  trelloApp: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  }
})

export default theme