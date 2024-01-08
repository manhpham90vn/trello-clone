import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from '~/App.jsx'
import theme from '~/utils/Theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider>
        <CssBaseline />
        <App />
        <ToastContainer
          position='bottom-left'
          theme='colored'
        />
      </ConfirmProvider>
    </CssVarsProvider>
  </React.StrictMode>
)
